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
  const { selectedProject, updateProject } = useData();
  const { setDeleteProjectModalOpen } = useUI();

  const [moreOption, setMoreOption] = useState(false);
  const [title, setTitle] = useState(selectedProject.name);

  useEffect(() => {
    setTitle(selectedProject.name);
  }, [selectedProject]);

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

    await updateProject(selectedProject.id, text);
    projectTitleRef.current?.blur();
  }

  async function handleOnKeyPress(event: any) {
    if (event.key === "Enter") {
      projectTitleRef.current?.blur();
    }
  }

  function handleRename() {
    projectTitleRef.current?.focus();
    setMoreOption(false);
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
          <div className={styles.header__paperCardWrapper}>
            <PaperCard
              handleBlur={handleBlur}
              paperRef={tagRefs}
              color="var(--blue-100)"
            >
              <div className={styles.header__actions}>
                <button onClick={() => handleRename()}>Edit</button>
                <button onClick={() => handleOpenConfirmation()}>Delete</button>
              </div>
            </PaperCard>
          </div>
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
