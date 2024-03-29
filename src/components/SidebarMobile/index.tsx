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

const SideBarMobile = () => {
  const { setGroupModalOpen, colapse, setColapse } = useUI();
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

      <div className={stylescss.sidebar__profile}>
        <img src={currentUserOnSettings?.photoURL ? currentUserOnSettings?.photoURL : profileImg} alt="profile" />
        <p>{currentUserOnSettings?.displayName}</p>
      </div>

      <button className={stylescss.sidebar__logout} onClick={handleLogout}>
        <ExitToAppIcon fontSize="large" />
        <span> Logout</span>
      </button>

      <div className={stylescss.sidebar__menu}>
        <NavLink
          to="/gettingstarted"
          className={stylescss.sidebar__group}
          activeClassName={stylescss.sidebar__groupActive}
          onClick={() => setColapse(false)}
        >
          <IoIosRocket size={20} />
          <span>Getting Started</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={stylescss.sidebar__group}
          activeClassName={stylescss.sidebar__groupActive}
          onClick={() => setColapse(false)}
        >
          <IoIosSettings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink
          to="/archive"
          className={stylescss.sidebar__group}
          activeClassName={stylescss.sidebar__groupActive}
          onClick={() => setColapse(false)}
        >
          <IoMdArchive size={20} />
          <span>Archive</span>
        </NavLink>
        <NavLink
          to="/notification"
          className={stylescss.sidebar__group}
          activeClassName={stylescss.sidebar__groupActive}
          onClick={() => setColapse(false)}
        >
          <IoIosNotifications size={20} />
          <span>Notification</span>
        </NavLink>
      </div>

      <div className={stylescss.sidebar__projects}>
        {groups.map((group) => (
          <GroupOfProjects name={group.name} key={group.groupId} id={group.groupId} projects={group.projects} colapse={false} />
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

export default SideBarMobile;
