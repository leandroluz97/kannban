import React, { SyntheticEvent, useRef } from "react";
import styles from "./styles.module.scss";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Card from "../Card";
import ListCard from "../ListCard";
import { useState } from "react";
import InputCard from "../InputCard";
import { useEffect } from "react";
import ListOption from "../ListOption";
import ChangeColors from "../ChangleColors";

const List = () => {
  const [addNewCard, setAddNewCard] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [changeColor, setChangeColor] = useState(false);

  const optionRef = useRef<HTMLDivElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

  function handleCloseAddNewCardTextField() {
    setAddNewCard(false);
  }
  //event: SyntheticEvent<EventTarget>
  function handleMoreOtionOnBlur() {
    setMoreOption(false);
  }
  function handleColorOnBlur() {
    setChangeColor(false);
  }

  function handleColors() {
    colorRef.current?.focus();
    setChangeColor(true);
    setMoreOption(false);
  }
  async function handleChangeListColor(color: string) {
    setChangeColor(false);
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
          <ListOption
            handleColor={handleColors}
            optionRef={optionRef}
            handleMoreOtionOnBlur={handleMoreOtionOnBlur}
            color={true}
          />
        )}
        {changeColor && (
          <ChangeColors
            colorRef={colorRef}
            handleColorOnBlur={handleColorOnBlur}
            ChangeListColor={handleChangeListColor}
          />
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
