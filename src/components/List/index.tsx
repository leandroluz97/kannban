import React, { useRef } from "react";
import styles from "./styles.module.scss";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Card from "../Card";
import ListCard from "../ListCard";
import { useState } from "react";
import InputCard from "../InputCard";
import { useEffect } from "react";

const List = () => {
  const [addNewCard, setAddNewCard] = useState(false);
  const [moreOption, setMoreOption] = useState(false);

  const optionRef = useRef(null as any);

  useEffect(() => {
    if (optionRef.current?.focus()) {
      //optionRef.current?.blur();
      handleMoreOtionOnBlur();
    }
  }, [moreOption]);

  function handleCloseAddNewCardTextField() {
    setAddNewCard(false);
  }
  function handleMoreOtionOnBlur() {
    setMoreOption(false);

    console.log("outfocus");
  }

  return (
    <section className={styles.list}>
      <header>
        <div className={styles.list__left}>
          <DragIndicatorIcon className={styles.list__drag} />
          <h2>TO DO</h2>
        </div>

        <div className={styles.list__right}>
          <div onClick={() => setAddNewCard(true)}>
            <AddRoundedIcon fontSize="large" />
          </div>

          <div onClick={() => setMoreOption(true)}>
            <MoreHorizIcon fontSize="large" />
          </div>
        </div>

        {moreOption && (
          <div
            className={styles.list__moreinfo}
            onBlur={handleMoreOtionOnBlur}
            tabIndex={-1}
            ref={optionRef}
          ></div>
        )}
      </header>
      <section className={styles.list__body}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        {addNewCard && (
          <ListCard handleCloseTextFied={handleCloseAddNewCardTextField} />
        )}
      </section>
    </section>
  );
};

export default List;
