import styles from "./styles.module.scss";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import { useData } from "../../hooks/useData";

interface ArchivedProjectProps {
  id: string;
  name: string;
}

const ArchivedProject = ({ id, name }: ArchivedProjectProps) => {
  const { restoreProject } = useData();

  const handleRestoreProject = async () => {
    await restoreProject(id);
  };

  return (
    <>
      <div className={styles.archived}>
        <p>{name}</p>
        <button onClick={handleRestoreProject}>
          <UnarchiveIcon fontSize={"large"} /> <span>Restore</span>
        </button>
      </div>
    </>
  );
};

export default ArchivedProject;
