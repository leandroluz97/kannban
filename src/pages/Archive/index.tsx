import React from "react";
import ArchivedProject from "../../components/ArchivedProject";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";

interface ProjectosType {
  name: string;
  id: string;
}

const Archive = () => {
  const projectos: ProjectosType[] = [
    { name: "Http", id: "ghh12" },
    { name: "Javascript", id: "ghh13" },
  ];
  return (
    <div className={styles.archive}>
      <div className={styles.archive__inputs}>
        {projectos.map((projecto) => (
          <div key={projecto.id}>
            <ArchivedProject name={projecto.name} id={projecto.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
