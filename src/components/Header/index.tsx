import { useRef, useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import styles from "./styles.module.scss";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";

import { useData } from "../../hooks/useData";
import PaperCard from "../PaperCard";
import { useUI } from "../../hooks/useUi";

import CircularProgress from "@material-ui/core/CircularProgress";
import ContentEditable from "react-contenteditable";

const Header = () => {
  const { selectedProject, updateProject, getSearchTasks, searchedTasks, getTask } = useData();
  const { setDeleteProjectModalOpen, setTaskModalOpen } = useUI();

  const [moreOption, setMoreOption] = useState(false);
  const [title, setTitle] = useState(selectedProject.name);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState(false);

  let tagRefs = useRef<HTMLDivElement | null>(null);
  let dropdownRef = useRef<HTMLDivElement | null>(null);
  const projectTitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    setTitle(selectedProject.name);
  }, [selectedProject]);

  useEffect(() => {
    //handle close calendar when clicked outsite
    const handler = (event: any) => {
      event.stopPropagation();
      if (!dropdownRef.current?.contains(event.target as HTMLElement)) {
        setDropdown(false);
      }
    };

    // close calendar when clicked outsite
    document.addEventListener("mousedown", handler);

    //clean up the mousedown effect
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

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

  function handleOnchange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    getSearchTasks(event.target.value);
  }
  function handleSearchPaperOnFocus(event: SyntheticEvent) {
    setDropdown(true);
  }

  async function handleOpenTask(id: string) {
    setTaskModalOpen(true);
    await getTask(id);
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
            <PaperCard handleBlur={handleBlur} paperRef={tagRefs} color="var(--blue-100)">
              <div className={styles.header__actions}>
                <button onClick={() => handleRename()}>Edit</button>
                <button onClick={() => handleOpenConfirmation()}>Delete</button>
              </div>
            </PaperCard>
          </div>
        )}
      </div>
      <div className={styles.header__searchWrapper}>
        <div className={styles.header__search}>
          <div>
            <SearchIcon fontSize="large" />
          </div>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleOnchange} onFocus={handleSearchPaperOnFocus} />
        </div>
        {dropdown && (
          <div className={styles.header__paperSearchWrapper} ref={dropdownRef}>
            <PaperCard handleBlur={handleBlur} paperRef={tagRefs} color="var(--blue-100)" width="360px">
              <div className={styles.header__searchOption}>
                {searchTerm === "" ? (
                  <p className={styles.header__searchOption__start}>Start searching...</p>
                ) : searchedTasks.length > 0 ? (
                  searchedTasks.map((task) => (
                    <button key={task.id} className={styles.header__searchOption__results} onClick={() => handleOpenTask(task.id)}>
                      {task.name}
                    </button>
                  ))
                ) : (
                  <p className={styles.header__searchOption__nothing}>Nothing Found!😔</p>
                )}
              </div>
            </PaperCard>
          </div>
        )}
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
