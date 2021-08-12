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
import PaperCard from "../PaperCard";

interface ListProps {
  name: string;
  color: string;
}
const List = ({ name, color }: ListProps) => {
  const [addNewCard, setAddNewCard] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [changeColor, setChangeColor] = useState(false);

  const optionRef = useRef<HTMLDivElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

  const colors = [
    "#8B18D1",
    "#3399AF",
    "#D03737",
    "#C2D118",
    "#33AF47",
    "#D18718",
    "#18D183",
    "#3350B9",
  ];

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
      <header style={{ borderBottomColor: `#${color}` }}>
        <div className={styles.list__left}>
          <DragIndicatorIcon className={styles.list__drag} />
          <h2>{name}</h2>
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
          <PaperCard
            paperRef={optionRef}
            color="var(--blue-100)"
            handleBlur={handleMoreOtionOnBlur}
            top="3.11"
            left="25"
          >
            <div className={styles.list__actions}>
              <button>Rename</button>
              <button onClick={handleColors}>Change Color</button>
              <button>Delete</button>
            </div>
          </PaperCard>
        )}
        {changeColor && (
          <PaperCard
            paperRef={colorRef}
            color="var(--blue-100)"
            handleBlur={handleColorOnBlur}
            top="3.11"
            left="25"
          >
            <div className={styles.list__changeColor}>
              {colors.map((color) => (
                <button
                  key={color}
                  style={{ backgroundColor: color }}
                  onClick={() => handleChangeListColor(color)}
                ></button>
              ))}
            </div>
          </PaperCard>
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
