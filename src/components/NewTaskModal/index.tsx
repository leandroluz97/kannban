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
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Tags from "../Tags";
import { useData } from "../../hooks/useData";
import Description from "../../components/Description";

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
  const { getTask, comments, subtasks, selectedTask, unSetTasks, getTags } = useData();

  useEffect(() => {}, []);

  async function closeModal() {
    setTaskModalOpen(false);
    unSetTasks();
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
          <InputCartTitle closeModal={closeModal} />
        </div>
        <div className={styles.newTaskModal}>
          <div className={styles.newTaskModal__left}>
            <Tags />
            <DueDate dueDate={selectedTask.dueTime} />

            {selectedTask.id && <Description description={selectedTask.description} />}
          </div>
          <div className={styles.newTaskModal__right}>
            <InputSubTask />

            {subtasks.length > 0 ? (
              subtasks.map((subtask) => (
                <Subtask key={subtask.id} subtask={subtask.subtask} isDone={subtask.isDone} id={subtask.id} createdAt={subtask.createdAt} />
              ))
            ) : (
              <p className={styles.newTaskModal__right__info}>You Don't Have Any Subtask Yet!</p>
            )}

            <InputComment />
            <>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment.comment} createdAt={comment.createdAt} id={comment.id} />
              ))}
            </>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default NewTaskModal;
