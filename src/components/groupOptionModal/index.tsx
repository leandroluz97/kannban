import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { group } from "console";
import { useHistory } from "react-router-dom";
import ContentEditable from "react-contenteditable";

interface payloadType {
  name: string;
  groupId: string;
}
const GroupOptionsModal = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const { setGroupModalOptions, groupModalOptions } = useUI();
  const { addGroup, deleteGroup, selectedGroup, groups, updateGroup } = useData();
  const groupTitleRef = useRef<HTMLParagraphElement | null>(null);
  const [inputValue, setInputValue] = useState(selectedGroup.name);

  useEffect(() => {
    setInputValue(selectedGroup.name);
  }, [selectedGroup]);

  function closeModal() {
    setGroupModalOptions(false);
  }

  async function handleChangeGroupName(id: string) {
    setIsLoading(true);

    if (inputValue.trim().length < 1) {
      setIsLoading(false);
      return;
    }

    try {
      await updateGroup({ id, name: inputValue.trim() });

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

  async function handleDeleteGroup(payload: payloadType) {
    await deleteGroup(payload.groupId);
    setGroupModalOptions(false);
    console.log(groups.length, groups[0].projects.length > 0);

    const updatedGroup = groups.filter((g) => g.groupId !== payload.groupId);

    if (updatedGroup.length > 0 && updatedGroup[0].projects.length > 0) {
      const id = updatedGroup[0].projects[0].id;
      history.push(`/project/${id}`);
    } else {
      history.push(`/gettingstarted`);
    }
  }

  const totalProjects = useMemo(() => groups.find((g) => g.groupId === selectedGroup.groupId)?.projects.length, [selectedGroup]);

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
            <h3 className={styles.section__article__title}>{selectedGroup.name}</h3>
          </header>
          <div className={styles.section__article__body}>
            <div>
              <span>Change name</span>
              <ContentEditable
                innerRef={groupTitleRef}
                html={inputValue ? inputValue : ""}
                disabled={false}
                onChange={(event) => setInputValue(event.target.value as string)}
                tagName="span"
              />
            </div>
            <div>
              <span>Number of projects</span>
              <p>{totalProjects}</p>
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
            <button type="submit" onClick={() => handleDeleteGroup(selectedGroup)}>
              <span>Delete</span>
              <DeleteForeverIcon fontSize="large" />
            </button>
          </div>
          <div className={styles.footer__right}>
            <button type="submit" onClick={() => setGroupModalOptions(false)}>
              Cancel
            </button>
            <button type="submit" onClick={() => handleChangeGroupName(selectedGroup.groupId)}>
              Save
            </button>
          </div>
        </footer>
      </section>
    </Modal>
  );
};

export default GroupOptionsModal;
