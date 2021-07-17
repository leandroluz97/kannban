import React, { useState } from "react";
import styles from "./styles.module.scss";
import kannbanImg from "../../assets/horizontal_kannban.svg";
import profileImg from "../../assets/profileImg.svg";
import kannbanIcon from "../../assets/icon_kannban.svg";
import colapseImg from "../../assets/colapse.svg";
import uncolapseImg from "../../assets/uncolapse.svg";
import {
  IoIosRocket,
  IoIosSettings,
  IoMdArchive,
  IoMdTrash,
  IoMdFolder,
  IoIosAdd,
  IoIosNotifications,
} from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const SideBar = () => {
  const [colapse, setColapse] = useState(true);

  function handleNewGroup() {
    console.log("yess");
  }
  return (
    <div
      className={
        colapse ? `${styles.sidebar} ${styles.colapse}` : `${styles.sidebar}`
      }
    >
      <div className={styles.sidebar__logo}>
        <img src={colapse ? kannbanIcon : kannbanImg} alt="kannban logo" />
      </div>

      <div className={styles.sidebar__profile}>
        <img src={profileImg} alt="profile" />
        <p>Leandro Luz </p>
      </div>

      <div className={styles.sidebar__menu}>
        <NavLink
          to="/gettingstarted"
          className={styles.sidebar__group}
          activeClassName={styles.sidebar__groupActive}
        >
          <IoIosRocket size={20} />
          <span>Getting Started</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={styles.sidebar__group}
          activeClassName={styles.sidebar__groupActive}
        >
          <IoIosSettings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink
          to="/archive"
          className={styles.sidebar__group}
          activeClassName={styles.sidebar__groupActive}
        >
          <IoMdArchive size={20} />
          <span>Archive</span>
        </NavLink>
        <NavLink
          to="/trash"
          className={styles.sidebar__group}
          activeClassName={styles.sidebar__groupActive}
        >
          <IoIosNotifications size={20} />
          <span>Trash</span>
        </NavLink>
      </div>

      <div className={styles.sidebar__projects}>
        <div className={styles.sidebar__project}>
          <NavLink
            to="/web-development"
            className={styles.sidebar__group}
            activeClassName={styles.sidebar__groupActive}
          >
            <IoMdFolder size={20} />
            <span>Web Development</span>
            <IoIosAdd size={20} onClick={handleNewGroup} />
          </NavLink>

          <ul>
            <li>
              <NavLink to="/http" activeClassName={styles.sidebar__groupActive}>
                Https
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client-side"
                activeClassName={styles.sidebar__groupActive}
              >
                Client Side
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reactjs"
                activeClassName={styles.sidebar__groupActive}
              >
                ReactJS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__project}>
          <NavLink
            to="/web-development"
            className={styles.sidebar__group}
            activeClassName={styles.sidebar__groupActive}
          >
            <IoMdFolder size={20} />
            <span>Web Development</span>
            <IoIosAdd size={20} onClick={handleNewGroup} />
          </NavLink>

          <ul>
            <li>
              <NavLink to="/http" activeClassName={styles.sidebar__groupActive}>
                Https
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client-side"
                activeClassName={styles.sidebar__groupActive}
              >
                Client Side
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reactjs"
                activeClassName={styles.sidebar__groupActive}
              >
                ReactJS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__project}>
          <NavLink
            to="/web-development"
            className={styles.sidebar__group}
            activeClassName={styles.sidebar__groupActive}
          >
            <IoMdFolder size={20} />
            <span>Web Development</span>
            <IoIosAdd size={20} onClick={handleNewGroup} />
          </NavLink>

          <ul>
            <li>
              <NavLink to="/http" activeClassName={styles.sidebar__groupActive}>
                Https
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client-side"
                activeClassName={styles.sidebar__groupActive}
              >
                Client Side
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reactjs"
                activeClassName={styles.sidebar__groupActive}
              >
                ReactJS
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.sidebar__project}>
          <NavLink
            to="/javascript"
            className={styles.sidebar__group}
            activeClassName={styles.sidebar__groupActive}
          >
            <IoMdFolder size={20} />
            <span>Javascript</span>
            <IoIosAdd size={20} onClick={handleNewGroup} />
          </NavLink>

          <ul>
            <li>
              <NavLink to="/oop " activeClassName={styles.sidebar__groupActive}>
                OOP
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/function-programming"
                activeClassName={styles.sidebar__groupActive}
              >
                <span>Function Programming</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dom-manipulation"
                activeClassName={styles.sidebar__groupActive}
              >
                <span>DOM Manipulation</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={styles.sidebar__colapse}
        onClick={() => setColapse(!colapse)}
      >
        <img src={colapse ? uncolapseImg : colapseImg} alt="colapse" />
      </div>

      <div className={styles.sidebar__add}>
        <button>
          <div>
            <FaPlus size={20} />
          </div>
          <span>Add Group</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
