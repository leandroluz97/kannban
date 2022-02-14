import React, { useEffect, useState } from "react";
import stylescss from "./styles.module.scss";
import kannbanImg from "../../assets/horizontal_kannban.svg";
import profileImg from "../../assets/profileImg.svg";
import kannbanIcon from "../../assets/icon_kannban.svg";
import colapseImg from "../../assets/colapse.svg";
import uncolapseImg from "../../assets/uncolapse.svg";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { IoIosRocket, IoIosSettings, IoMdArchive, IoMdTrash, IoMdFolder, IoIosAdd, IoIosNotifications } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import firebase from "../../config/firebase-config";
import { useRef } from "react";
import InputProject from "../InputProject/input";
import GroupOfProjects from "../GroupOfProjects";

import { useUI } from "../../hooks/useUi";
import { useHistory } from "react-router";
import { useData } from "../../hooks/useData";
import { useAuth } from "../../hooks/useAuth";

const SideBar = () => {
  const [colapse, setColapse] = useState(false);

  const { setGroupModalOpen } = useUI();
  const { groups } = useData();
  const { currentUserOnSettings } = useAuth();

  const projectNameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    projectNameRef.current?.focus();
  }, []);

  let history = useHistory();

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        //setCurrentUser(null);
        history.push("/login");
      });
  }

  const sidebarStyle = colapse ? `${stylescss.sidebar} ${stylescss.colapse}` : `${stylescss.sidebar}`;

  return (
    <div className={sidebarStyle}>
      <div className={stylescss.sidebar__logo}>
        <img src={colapse ? kannbanIcon : kannbanImg} alt="kannban logo" />
      </div>

      <div className={stylescss.sidebar__colapse} onClick={() => setColapse(!colapse)}>
        <img src={colapse ? uncolapseImg : colapseImg} alt="colapse" />
      </div>

      <div className={stylescss.sidebar__profile}>
        <img src={currentUserOnSettings?.photoURL ? currentUserOnSettings?.photoURL : profileImg} alt="profile" />
        <p>{currentUserOnSettings?.displayName}</p>
      </div>

      <button className={stylescss.sidebar__logout} onClick={handleLogout}>
        <ExitToAppIcon fontSize="large" />
        <span> Logout</span>
      </button>

      <div className={stylescss.sidebar__menu}>
        <NavLink to="/gettingstarted" className={stylescss.sidebar__group} activeClassName={stylescss.sidebar__groupActive}>
          <IoIosRocket size={20} />
          <span>Getting Started</span>
        </NavLink>
        <NavLink to="/settings" className={stylescss.sidebar__group} activeClassName={stylescss.sidebar__groupActive}>
          <IoIosSettings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/archive" className={stylescss.sidebar__group} activeClassName={stylescss.sidebar__groupActive}>
          <IoMdArchive size={20} />
          <span>Archive</span>
        </NavLink>
        <NavLink to="/notification" className={stylescss.sidebar__group} activeClassName={stylescss.sidebar__groupActive}>
          <IoIosNotifications size={20} />
          <span>Notification</span>
        </NavLink>
      </div>

      <div className={stylescss.sidebar__projects}>
        {groups
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .map((group) => (
            <GroupOfProjects name={group.name} key={group.groupId} id={group.groupId} projects={group.projects} />
          ))}
      </div>

      <div className={stylescss.sidebar__add}>
        <button onClick={() => setGroupModalOpen(true)}>
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

/*

{groups.map((group) => (
          <div className={stylescss.sidebar__project} key={group.id}>
            <div className={stylescss.sidebar__group}>
              <IoMdFolder size={20} />
              <span>{group.name}</span>

              <button onClick={handleNewModalGroup}>
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
              {newProject && (
                <li>
                  <InputProject handleBlur={handleNewProjectBlur} />
                </li>
              )}
            </ul>
          </div>
        ))}
*/
