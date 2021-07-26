import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";

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
      <p> Modallll</p>
    </Modal>
  );
};

export default NewTaskModal;
