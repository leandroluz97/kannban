import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import InputSubTask from "../InputSubTask";
import Subtask from "../Subtask";
import InputComment from "../InputComment";
import Comment from "../Comment";
import DueDate from "../DueDate";
import InputCartTitle from "../InputCartTitle";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useUI } from "../../hooks/useUi";
import Input from "../Input";

const NewTaskModal = () => {
  const [inputValue, setInputValue] = useState("");
  const { groupModalOpen, setGroupModalOpen } = useUI();

  function closeModal() {
    setGroupModalOpen(false);
  }

  function handleNewGroup(e: React.SyntheticEvent) {
    e.preventDefault();

    if (inputValue.trim().length < 1) return;

    console.log(inputValue);
    setGroupModalOpen(false);
  }

  return (
    <Modal
      isOpen={groupModalOpen}
      onRequestClose={closeModal}
      className="group__modal"
      overlayClassName="global__overlay"
      contentLabel="New task Modal"
    >
      <section className={styles.section}>
        <button className={styles.section__close} onClick={closeModal}>
          <CloseRoundedIcon fontSize="large" />
        </button>
        <form action="" onClick={handleNewGroup}>
          <input
            type="text"
            placeholder="Type group name here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input type="submit" value="Create group" />
        </form>
      </section>
    </Modal>
  );
};

export default NewTaskModal;
