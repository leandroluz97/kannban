import React, { useEffect } from "react";
import ArchivedProject from "../../components/ArchivedProject";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";

interface ProjectosType {
  name: string;
  id: string;
}

const Archive = () => {
  const { archivedProjects, getArchivedProjects } = useData();

  useEffect(() => {
    (async function () {
      await getArchivedProjects();
    })();
  }, []);

  return (
    <div className={styles.archive}>
      <div className={styles.archive__inputs}>
        {archivedProjects.map((project) => (
          <div key={project.id}>
            <ArchivedProject name={project.name} id={project.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
