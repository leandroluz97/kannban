import React, { useState } from "react";
import styles from "./styles.module.scss";

import Modal from "react-modal";
import { toast } from "react-toastify";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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

const GroupOptionsModal = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setGroupModalOptions, groupModalOptions } = useUI();
  const { addGroup } = useData();

  function closeModal() {
    setGroupModalOptions(false);
  }

  async function handleNewGroup(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (inputValue.trim().length < 1) {
      setIsLoading(false);
      return;
    }

    try {
      await addGroup(inputValue.trim());

      setGroupModalOptions(false);
      setInputValue("");
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  return (
    <Modal
      isOpen={groupModalOptions}
      onRequestClose={closeModal}
      className="options__modal"
      overlayClassName="global__overlay"
      contentLabel="modal group options"
    >
      <section className={styles.section}>
        <button className={styles.section__close} onClick={closeModal}>
          <CloseRoundedIcon fontSize="large" />
        </button>
        <article className={styles.section__article}>
          <header>
            <h3 className={styles.section__article__title}>Web development</h3>
          </header>
          <div className={styles.section__article__body}>
            <div>
              <span>Change name</span>
              <p>Web Development</p>
            </div>
            <div>
              <span>Number of projects</span>
              <p>6</p>
            </div>
          </div>

          {/* {isLoading ? (
            <button type="button" disabled>
              <CircularProgress disableShrink size={20} />
            </button>
          ) : (
            <button type="submit">Create Group</button>
          )} */}
        </article>
        <footer className={styles.footer}>
          <div className={styles.footer__left}>
            <button type="submit">
              <span>Delete</span>
              <DeleteForeverIcon fontSize="large" />
            </button>
          </div>
          <div className={styles.footer__right}>
            <button type="submit">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </footer>
      </section>
    </Modal>
  );
};

export default GroupOptionsModal;
