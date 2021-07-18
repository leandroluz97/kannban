import React from "react";
import styles from "./styles.module.scss";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { IoIosMore } from "react-icons/io";
import Card from "../Card";

const List = () => {
  return (
    <section className={styles.list}>
      <header>
        <div className={styles.list__left}>
          <DragIndicatorIcon className={styles.list__drag} />

          <h2>TO DO</h2>
        </div>

        <div className={styles.list__right}>
          <div>
            <AddRoundedIcon fontSize="large" />
          </div>

          <div>
            <MoreHorizIcon fontSize="large" />
          </div>
        </div>
      </header>
      <section className={styles.list__body}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </section>
  );
};

export default List;
