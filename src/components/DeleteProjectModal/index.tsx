import React, { useState } from "react";
import styles from "./styles.module.scss";

import Modal from "react-modal";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useUI } from "../../hooks/useUi";

const DeleteProjectModal = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { setDeleteProjectModalOpen, deleteProjectModalOpen } = useUI();

  function closeModal() {
    setDeleteProjectModalOpen(false);
  }

  function handleDeleteProject() {
    console.log("Project Deleted");
    setDeleteProjectModalOpen(false);
  }

  return (
    <Modal
      isOpen={deleteProjectModalOpen}
      onRequestClose={closeModal}
      className="group__modal"
      overlayClassName="global__overlay"
      contentLabel="New task Modal"
    >
      <section className={styles.confirmation}>
        <button className={styles.confirmation__close} onClick={closeModal}>
          <CloseRoundedIcon fontSize="large" />
        </button>
        <div>
          <h2>Are you sure you want to delete this Project?</h2>

          <div className={styles.confirmation__actions}>
            {isLoadingDelete ? (
              <button type="button" disabled>
                <CircularProgress disableShrink size={20} />
              </button>
            ) : (
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            )}

            {isLoadingDelete ? (
              <button type="button" disabled>
                <CircularProgress disableShrink size={20} />
              </button>
            ) : (
              <button type="button" onClick={handleDeleteProject}>
                Delete
              </button>
            )}
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default DeleteProjectModal;
