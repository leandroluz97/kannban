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
import { useData } from "../../hooks/useData";
import { useParams } from "react-router-dom";
import ContentEditable from "react-contenteditable";

interface TasksType {
  name: string;
  id: string;
}

interface ListProps {
  name: string;
  color: string;
  id: string;
}

interface ID {
  id: string;
}

interface ParamsProps {
  id: string;
}
const List = ({ name, color, id }: ListProps) => {
  const [addNewCard, setAddNewCard] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [title, setTitle] = useState(name);

  const optionRef = useRef<HTMLDivElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);
  const deleteConfirmationRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const { deleteList, tasks, updateList, getProject, selectedProject } =
    useData();

  const allTasks = tasks.filter((task) => task.listId === id);

  let params: ParamsProps = useParams();

  useEffect(() => {
    const project = async () => {
      await getProject(params.id);
    };
    project();
  }, []);

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

  async function handleListDelete(id: string) {
    await deleteList(id);
  }

  function handleDeleteConfirmationOnBlur() {
    setDeleteConfirmation(false);
  }

  async function handleOnBlur(event: any) {
    const text = event.target.innerText;

    await updateList({ id: id, name: text, color: color, listId: params.id });
    titleRef.current?.blur();
  }

  async function handleOnKeyPress(event: any) {
    if (event.key === "Enter") {
      titleRef.current?.blur();
    }
  }

  return (
    <section className={styles.list}>
      <header style={{ borderBottomColor: `#${color}` }}>
        <div className={styles.list__left}>
          <DragIndicatorIcon className={styles.list__drag} />
          <ContentEditable
            innerRef={titleRef}
            html={title ? title : ""}
            disabled={false}
            onChange={(event) => setTitle(event.target.value as string)}
            onKeyDown={handleOnKeyPress}
            onBlur={handleOnBlur}
            tagName="h2"
          />
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
              <button onClick={() => setDeleteConfirmation(true)}>
                Delete
              </button>
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
        {deleteConfirmation && (
          <PaperCard
            paperRef={deleteConfirmationRef}
            color="var(--blue-100)"
            handleBlur={handleDeleteConfirmationOnBlur}
            top="3.11"
            left="25"
          >
            <div className={styles.list__confirmation}>
              <h2>Delete List?</h2>
              <p>If you delete this list, you won't be able to recover it.</p>
              <button
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => handleListDelete(id)}
              >
                Delete
              </button>
            </div>
          </PaperCard>
        )}
      </header>
      <section className={styles.list__body}>
        {allTasks.map((task) => (
          <Card key={task.id} title={task.name} id={task.id} />
        ))}

        {addNewCard && (
          <ListCard
            handleCloseTextFied={handleCloseAddNewCardTextField}
            listId={id}
          />
        )}
      </section>
    </section>
  );
};

export default List;
