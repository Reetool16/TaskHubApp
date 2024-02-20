import React, { useState } from "react";
import EditTaskModal from "./modal";

import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";

import "./HomePage.css";

const TaskInformation = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important ;
  align-items: flex-start;
  min-height: 122px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;
  padding: 20px 20px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
`;

const TaskCard = ({ item, index, onDeleteTask, onEditTask }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState(item);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleEditClick = () => {
    setEditedTask(item);
    setShowModal(true);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      onDeleteTask(item.id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <p>{item.Task}</p>
              <div className="secondary-details">
                <p>
                  <span>
                    {new Date(item.Due_Date).toLocaleDateString("en-us", {
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                </p>
              </div>
            </div>

            {showButtons && (
              <div>
                <button className="EditButton" onClick={handleEditClick}>
                  Edit
                </button>
                <button className="DeleteButton" onClick={handleDeleteClick}>
                  Delete
                </button>
              </div>
            )}
          </TaskInformation>
          <EditTaskModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            editedTask={editedTask}
            setEditedTask={setEditedTask}
            onEditTask={onEditTask}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
