import React from "react";

import styled from "@emotion/styled";

import "./modal.css";

const Modal = styled.div`
  display: ${({ showModal }) => (showModal ? "block" : "none")};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  margin: 20% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  border-radius: 5px;
`;

const EditTaskModal = ({
  showModal,
  handleCloseModal,
  editedTask,
  setEditedTask,
  onEditTask,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditTask(editedTask);
    handleCloseModal();
  };

  return (
    <Modal showModal={showModal} className="Overlay">
      <ModalContent className="ModalContent">
        <div style={{ textAlign: "right" }}>
          <button onClick={handleCloseModal} className="CloseBtn">
            &times;
          </button>
        </div>
        <h2>Edit Task</h2>
        <form onSubmit={handleEditSubmit}>
          <div>
            <label>Task:</label>
            <input
              type="text"
              name="Task"
              value={editedTask.Task}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Due Date:</label>
            <input
              type="date"
              name="Due_Date"
              value={editedTask.Due_Date}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
