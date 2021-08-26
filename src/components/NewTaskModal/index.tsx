import React, { useEffect, useState } from "react";
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
import { useData } from "../../hooks/useData";

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
  const { getTask, comments, subtasks } = useData();

  useEffect(() => {}, []);

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
            {subtasks.map((subtask) => (
              <Subtask
                key={subtask.id}
                subtask={subtask.subtask}
                isDone={subtask.isDone}
                id={subtask.id}
              />
            ))}

            <InputComment />
            <>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment.comment}
                  createdAt={comment.createdAt}
                  id={comment.id}
                />
              ))}
            </>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default NewTaskModal;
