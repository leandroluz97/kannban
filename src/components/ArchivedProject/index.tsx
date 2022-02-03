import styles from "./styles.module.scss";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import { useData } from "../../hooks/useData";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

interface ArchivedProjectProps {
  id: string;
  name: string;
}

const ArchivedProject = ({ id, name }: ArchivedProjectProps) => {
  const { restoreProject, deleteProject } = useData();

  const handleRestoreProject = async () => {
    await restoreProject(id);
  };

  const handleDeleteProject = async (id: string) => {
    deleteProject(id);
  };

  return (
    <>
      <div className={styles.archived}>
        <p>{name}</p>
        <button onClick={handleRestoreProject}>
          <UnarchiveIcon fontSize={"large"} /> <span>Restore</span>
        </button>
        <button onClick={() => handleDeleteProject(id)}>
          <DeleteForeverIcon fontSize={"large"} />
        </button>
      </div>
    </>
  );
};

export default ArchivedProject;
