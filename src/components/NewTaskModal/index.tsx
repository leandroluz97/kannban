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

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tags from "../Tags";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

const NewTaskModal = () => {
  const { setTaskModalOpen, taskModalOpen } = useUI();

  function closeModal() {
    setTaskModalOpen(false);
  }

  return (
    <Modal
      isOpen={taskModalOpen}
      onRequestClose={closeModal}
      className="global__modal"
      overlayClassName="global__overlay"
      contentLabel="New task Modal"
    >
      <section className={styles.section}>
        <button className={styles.close} onClick={closeModal}>
          <CloseRoundedIcon fontSize="large" />
        </button>
        <div className={styles.title}>
          <InputCartTitle />
        </div>
        <div className={styles.newTaskModal}>
          <div className={styles.newTaskModal__left}>
            <Tags />
            <DueDate />

            <InputComment />
          </div>
          <div className={styles.newTaskModal__right}>
            <InputSubTask />
            <Subtask key="32" />
            <Subtask key="44w" />

            <InputComment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default NewTaskModal;
