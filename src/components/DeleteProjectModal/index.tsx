import React, { useState } from "react";
import styles from "./styles.module.scss";

import Modal from "react-modal";
import { useHistory } from "react-router-dom";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useUI } from "../../hooks/useUi";
import { useData } from "../../hooks/useData";

const DeleteProjectModal = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { setDeleteProjectModalOpen, deleteProjectModalOpen } = useUI();
  const { archiveProject, selectedProject, groups } = useData();

  let history = useHistory();

  function closeModal() {
    setDeleteProjectModalOpen(false);
  }

  async function handleDeleteProject() {
    setIsLoadingDelete(true);

    try {
      await archiveProject(selectedProject.id);

      setIsLoadingDelete(false);
      setDeleteProjectModalOpen(false);

      const allProjects = groups
        .map((group) => {
          return group.projects;
        })
        .reduce((acc, project) => {
          acc = [...acc, ...project.filter((p) => p.id !== selectedProject.id)];
          return acc;
        }, []);

      const lastProject = allProjects[allProjects.length - 1];

      history.push(allProjects.length <= 0 ? `/gettingstarted` : `/project/${lastProject.id}`);
    } catch (error) {}
  }

  return (
    <Modal
      isOpen={deleteProjectModalOpen}
      onRequestClose={closeModal}
      className="group__modal-delete"
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
            <button type="button" onClick={closeModal}>
              Cancel
            </button>

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
