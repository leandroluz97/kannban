import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";
import ListOption from "../ListOption";

const Header = () => {
  const [moreOption, setMoreOption] = useState(false);
  const optionRef = useRef<HTMLDivElement | null>(null);

  function handleMoreOtionOnBlur() {
    setMoreOption(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__title}>
        <h1>Getting started</h1>
        <button onClick={() => setMoreOption(true)}>
          <MoreHorizIcon fontSize="large" />
        </button>
        {moreOption && (
          <ListOption
            color={false}
            optionRef={optionRef}
            handleMoreOtionOnBlur={handleMoreOtionOnBlur}
          />
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
