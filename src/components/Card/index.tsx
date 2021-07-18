import React from "react";
import styles from "./styles.module.scss";

const Card = () => {
  return (
    <div className={styles.card}>
      <p>
        t is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum
      </p>

      <div className={styles.card__tags}>
        <p>cool</p>
        <p>awsome</p>
        <p>finished</p>
      </div>
    </div>
  );
};

export default Card;
