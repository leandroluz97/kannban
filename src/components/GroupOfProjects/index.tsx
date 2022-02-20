import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { IoIosRocket, IoIosSettings, IoMdArchive, IoMdTrash, IoMdFolder, IoIosAdd, IoIosNotifications } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import firebase from "../../config/firebase-config";
import { useRef } from "react";
import InputProject from "../InputProject/input";
import { useUI } from "../../hooks/useUi";
import { useHistory } from "react-router";
import { useData } from "../../hooks/useData";

interface projectData {
  name: string;
  id: string;
  group: string;
  createdAt: Date;
}
interface GroupOfProjectsProps {
  name: string;
  id: string;
  projects: projectData[];
}

const GroupOfProjects = ({ name, id, projects }: GroupOfProjectsProps) => {
  const [newProject, setNewProject] = useState(false);

  const { setStorageProjectName, setSelectedGroup } = useData();
  const { setGroupModalOptions, groupModalOptions } = useUI();

  //const filteredProjects = projects.filter((project) => project.group === name);
  /*
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.group === name);
  }, [projects]);
*/
  function handleNewGroupInput() {
    setNewProject(true);
    setStorageProjectName(id);
  }

  function handleNewProjectBlur() {
    setNewProject(false);
  }
  async function handleGroupOption() {
    setGroupModalOptions(true);
    setSelectedGroup({ name: name, groupId: id });
  }

  return (
    <div className={styles.groupOfProject__project}>
      <div className={styles.groupOfProject__group}>
        <button onClick={() => handleGroupOption()}>
          <IoMdFolder size={20} />
        </button>
        <span>{name}</span>

        <button onClick={handleNewGroupInput}>
          <AddRoundedIcon fontSize="large" />
        </button>
      </div>

      <ul>
        {projects
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .map((project) => (
            <li key={project.id}>
              <NavLink to={`/project/${project.id}`} activeClassName={styles.groupOfProject__groupActive}>
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
