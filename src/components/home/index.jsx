import React, { useState } from "react";
import TaskCard from "./card";
import { columnsFromBackend } from "./data";

import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import "./HomePage.css";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 0px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
  justify-content: center;
  gap: 40px;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Kanban = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const onDeleteTask = (taskId) => {
    // Implement delete logic here
    console.log("Deleting task with id:", taskId);
    // Update the state to remove the task from the columns
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach((key) => {
      updatedColumns[key].items = updatedColumns[key].items.filter(
        (item) => item.id !== taskId
      );
    });
    setColumns(updatedColumns);
  };

  const onEditTask = (editedTask) => {
    // Implement edit logic here
    console.log("Editing task:", editedTask);
    // Update the state to reflect the edited task
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach((key) => {
      updatedColumns[key].items = updatedColumns[key].items.map((item) =>
        item.id === editedTask.id ? editedTask : item
      );
    });
    setColumns(updatedColumns);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div>
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Container>
          <TaskColumnStyles>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Title>{column.title}</Title>
                      {column.items.map((item, index) => (
                        <TaskCard
                          key={item.id}
                          item={item}
                          index={index}
                          onDeleteTask={onDeleteTask}
                          onEditTask={onEditTask}
                        />
                      ))}
                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              );
            })}
          </TaskColumnStyles>
        </Container>
      </DragDropContext>
    </>
  );
};

export default Kanban;
