import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";

import { useData } from "../../hooks/useData";
import PaperCard from "../PaperCard";
import { useUI } from "../../hooks/useUi";

import CircularProgress from "@material-ui/core/CircularProgress";
import ContentEditable from "react-contenteditable";

const Header = () => {
  const { selectedProject } = useData();

  const [moreOption, setMoreOption] = useState(false);
  const [title, setTitle] = useState(selectedProject.name);

  useEffect(() => {
    setTitle(selectedProject.name);
  }, [selectedProject]);

  const { setDeleteProjectModalOpen } = useUI();

  let tagRefs = useRef<HTMLDivElement | null>(null);
  const projectTitleRef = useRef<HTMLParagraphElement | null>(null);

  function handleMoreOtionOnBlur() {
    setMoreOption(false);
  }

  function handleBlur() {
    setMoreOption(false);
  }

  function handleOpenConfirmation() {
    setDeleteProjectModalOpen(true);
    handleMoreOtionOnBlur();
  }

  async function handleOnBlur(event: any) {
    const text = event.target.innerText;

    // await updateSubtask(id, isChecked, text, createdAt);
    projectTitleRef.current?.blur();
  }

  async function handleOnKeyPress(event: any) {
    if (event.key === "Enter") {
      projectTitleRef.current?.blur();
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__title}>
        <h1>
          {selectedProject.name ? (
            <ContentEditable
              innerRef={projectTitleRef}
              html={title ? title : ""}
              disabled={false}
              onChange={(event) => setTitle(event.target.value as string)}
              onKeyDown={handleOnKeyPress}
              onBlur={handleOnBlur}
              tagName="span"
            />
          ) : (
            <CircularProgress size={15} />
          )}
        </h1>
        <button onClick={() => setMoreOption(true)}>
          <MoreHorizIcon fontSize="large" />
        </button>
        {moreOption && (
          <PaperCard
            top="3.11"
            left="17.5"
            handleBlur={handleBlur}
            paperRef={tagRefs}
            color="var(--blue-100)"
          >
            <div className={styles.header__actions}>
              <button>Edit</button>
              <button onClick={() => handleOpenConfirmation()}>Delete</button>
            </div>
          </PaperCard>
        )}
      </div>

      <div className={styles.header__search}>
        <div>
          <SearchIcon fontSize="large" />
        </div>
        <input type="text" placeholder="Search..." />
      </div>
    </header>
  );
};

export default Header;

/* <ListOption
            color={false}
            optionRef={optionRef}
            handleMoreOtionOnBlur={handleMoreOtionOnBlur}
         />*/
