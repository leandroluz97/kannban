import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import InputSubTask from "../InputSubTask";
import Subtask from "../Subtask";

const NewTaskModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  function closeModal() {}

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="global__modal"
      overlayClassName="global__overlay"
      contentLabel="New task Modal"
    >
      <InputSubTask />
      <Subtask />
    </Modal>
  );
};

export default NewTaskModal;
