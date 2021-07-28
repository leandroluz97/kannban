import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import InputSubTask from "../InputSubTask";
import Subtask from "../Subtask";
import InputComment from "../InputComment";
import Comment from "../Comment";
import DueDate from "../DueDate";
import InputCartTitle from "../InputCartTitle";

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
      <section>
        <div>
          <InputCartTitle />
        </div>
        <div className={styles.newTaskModal}>
          <div className={styles.newTaskModal__left}>
            <DueDate />
            <InputComment />
          </div>
          <div className={styles.newTaskModal__right}>
            <InputSubTask />
            <Subtask key="32" />
            <Subtask key="44w" />

            <InputComment />
            <Comment />
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default NewTaskModal;
