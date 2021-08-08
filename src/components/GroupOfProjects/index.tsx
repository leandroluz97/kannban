import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";

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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import firebase from "../../config/firebase-config";
import { useRef } from "react";
import InputProject from "../InputProject/input";
import { useUI } from "../../hooks/useUi";
import { useHistory } from "react-router";
import { useData } from "../../hooks/useData";

interface GroupOfProjectsProps {
  name: string;
  id: string;
}

const GroupOfProjects = ({ name, id }: GroupOfProjectsProps) => {
  const [newProject, setNewProject] = useState(false);

  const { projects } = useData();

  //const filteredProjects = projects.filter((project) => project.group === name);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.group === name);
  }, [projects]);

  function handleNewModalGroup() {
    setNewProject(true);
  }

  function handleNewProjectBlur() {
    setNewProject(false);
  }

  return (
    <div className={styles.groupOfProject__project}>
      <div className={styles.groupOfProject__group}>
        <IoMdFolder size={20} />
        <span>{name}</span>

        <button onClick={handleNewModalGroup}>
          <AddRoundedIcon fontSize="large" />
        </button>
      </div>

      <ul>
        {filteredProjects.map((project) => (
          <li key={project.id}>
            <NavLink
              to={`/project/${project.id}`}
              activeClassName={styles.groupOfProject__groupActive}
            >
              {project.name}
            </NavLink>
          </li>
        ))}

        {newProject && (
          <li>
            <InputProject handleBlur={handleNewProjectBlur} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default GroupOfProjects;