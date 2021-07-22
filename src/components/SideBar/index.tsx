import React, { useEffect, useState } from "react";
import stylescss from "./styles.module.scss";
import kannbanImg from "../../assets/horizontal_kannban.svg";
import profileImg from "../../assets/profileImg.svg";
import kannbanIcon from "../../assets/icon_kannban.svg";
import colapseImg from "../../assets/colapse.svg";
import uncolapseImg from "../../assets/uncolapse.svg";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
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
import { usePopper } from "react-popper";
import InputCard from "../InputCard";
import { useRef } from "react";

const SideBar = () => {
  const [colapse, setColapse] = useState(false);
  const [newProject, setNewProject] = useState(false);

  const projectNameRef = useRef(null as any);

  useEffect(() => {
    projectNameRef.current?.focus();
  }, [newProject]);

  function handleNewGroup() {
    setNewProject(true);
  }

  function handleNewProjectBlur() {
    setNewProject(false);
  }

  const sidebarStyle = colapse
    ? `${stylescss.sidebar} ${stylescss.colapse}`
    : `${stylescss.sidebar}`;
  return (
    <div className={sidebarStyle}>
      <div className={stylescss.sidebar__logo}>
        <img src={colapse ? kannbanIcon : kannbanImg} alt="kannban logo" />
      </div>

      <div className={stylescss.sidebar__profile}>
        <img src={profileImg} alt="profile" />
        <p>Leandro Luz </p>
      </div>

      <div className={stylescss.sidebar__menu}>
        <NavLink
          to="/gettingstarted"
          className={stylescss.sidebar__group}
          activeClassName={stylescss.sidebar__groupActive}
        >
          <IoIosRocket size={20} />
          <span>Getting Started</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={stylescss.sidebar__group}
          activeClassName={stylescss.sidebar__groupActive}
        >
          <IoIosSettings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink
          to="/archive"
          className={stylescss.sidebar__group}
          activeClassName={stylescss.sidebar__groupActive}
        >
          <IoMdArchive size={20} />
          <span>Archive</span>
        </NavLink>
        <NavLink
          to="/trash"
          className={stylescss.sidebar__group}
          activeClassName={stylescss.sidebar__groupActive}
        >
          <IoIosNotifications size={20} />
          <span>Trash</span>
        </NavLink>
      </div>

      <div className={stylescss.sidebar__projects}>
        <div className={stylescss.sidebar__project}>
          <div className={stylescss.sidebar__group}>
            <IoMdFolder size={20} />
            <span>Web Development</span>

            <button onClick={handleNewGroup}>
              <AddRoundedIcon fontSize="large" />
            </button>
            {newProject && (
              <div
                className={stylescss.sidebar__new}
                onBlur={handleNewProjectBlur}
                tabIndex={-1}
                ref={projectNameRef}
              ></div>
            )}
          </div>

          <ul>
            <li>
              <NavLink
                to="/http"
                activeClassName={stylescss.sidebar__groupActive}
              >
                Https
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client-side"
                activeClassName={stylescss.sidebar__groupActive}
              >
                Client Side
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reactjs"
                activeClassName={stylescss.sidebar__groupActive}
              >
                ReactJS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={stylescss.sidebar__project}>
          <div className={stylescss.sidebar__group}>
            <IoMdFolder size={20} />
            <span>Javascript</span>

            <button onClick={handleNewGroup}>
              <AddRoundedIcon fontSize="large" />
            </button>
          </div>
          <ul>
            <li>
              <NavLink
                to="/http"
                activeClassName={stylescss.sidebar__groupActive}
              >
                Https
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client-side"
                activeClassName={stylescss.sidebar__groupActive}
              >
                Client Side
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reactjs"
                activeClassName={stylescss.sidebar__groupActive}
              >
                ReactJS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={stylescss.sidebar__project}>
          <div className={stylescss.sidebar__group}>
            <IoMdFolder size={20} />
            <span>Web services</span>

            <button onClick={handleNewGroup}>
              <AddRoundedIcon fontSize="large" />
            </button>
          </div>

          <ul>
            <li>
              <NavLink
                to="/http"
                activeClassName={stylescss.sidebar__groupActive}
              >
                Https
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client-side"
                activeClassName={stylescss.sidebar__groupActive}
              >
                Client Side
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reactjs"
                activeClassName={stylescss.sidebar__groupActive}
              >
                ReactJS
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={stylescss.sidebar__project}>
          <NavLink
            to="/javascript"
            className={stylescss.sidebar__group}
            activeClassName={stylescss.sidebar__groupActive}
          >
            <IoMdFolder size={20} />
            <span>Javascript</span>
            <IoIosAdd size={20} onClick={handleNewGroup} />
          </NavLink>

          <ul>
            <li>
              <NavLink
                to="/oop "
                activeClassName={stylescss.sidebar__groupActive}
              >
                OOP
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/function-programming"
                activeClassName={stylescss.sidebar__groupActive}
              >
                <span>Function Programming</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dom-manipulation"
                activeClassName={stylescss.sidebar__groupActive}
              >
                <span>DOM Manipulation</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={stylescss.sidebar__colapse}
        onClick={() => setColapse(!colapse)}
      >
        <img src={colapse ? uncolapseImg : colapseImg} alt="colapse" />
      </div>

      <div className={stylescss.sidebar__add}>
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
