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
      <div className={styles.newTaskModal}>
        <div className={styles.newTaskModal__left}></div>
        <div className={styles.newTaskModal__right}>
          <InputSubTask />
          <Subtask key="32" />
          <Subtask key="44w" />
        </div>
      </div>
    </Modal>
  );
};

export default NewTaskModal;
