import React, { useState } from "react";
import styles from "./styles.module.scss";

import Modal from "react-modal";
import { toast } from "react-toastify";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

import InputSubTask from "../InputSubTask";
import Subtask from "../Subtask";
import InputComment from "../InputComment";
import Comment from "../Comment";
import DueDate from "../DueDate";

import InputCartTitle from "../InputCartTitle";

import Input from "../Input";

import { useUI } from "../../hooks/useUi";
import { useData } from "../../hooks/useData";
import Spinner from "../Spinner";

const NewTaskModal = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { groupModalOpen, setGroupModalOpen } = useUI();
  const { addGroup } = useData();

  function closeModal() {
    setGroupModalOpen(false);
  }

  async function handleNewGroup(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (inputValue.trim().length < 1) {
      setIsLoading(false);
      return;
    }

    await addGroup(inputValue.trim());

    setGroupModalOpen(false);
    setInputValue("");
    setIsLoading(false);
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
        <form onSubmit={handleNewGroup}>
          <h3 className={styles.section__title}>New group</h3>
          <input type="text" placeholder="Type group name here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

          {isLoading ? (
            <button type="button" disabled>
              <CircularProgress disableShrink size={20} />
              {/*<Spinner color="violet" />*/}
            </button>
          ) : (
            <button type="submit">Create Group</button>
          )}
        </form>
      </section>
    </Modal>
  );
};

export default NewTaskModal;
