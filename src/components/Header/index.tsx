import { useRef, useState } from "react";
import styles from "./styles.module.scss";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";

import { useData } from "../../hooks/useData";
import PaperCard from "../PaperCard";
import { useUI } from "../../hooks/useUi";

const Header = () => {
  const [moreOption, setMoreOption] = useState(false);
  const optionRef = useRef<HTMLDivElement | null>(null);

  const { selectedProject } = useData();

  const { setDeleteProjectModalOpen } = useUI();

  let tagRefs = useRef<HTMLDivElement | null>(null);

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

  return (
    <header className={styles.header}>
      <div className={styles.header__title}>
        <h1>{selectedProject.name}</h1>
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
