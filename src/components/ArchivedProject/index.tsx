import styles from "./styles.module.scss";
import UnarchiveIcon from "@material-ui/icons/Unarchive";

interface ArchivedProjectProps {
  id: string;
  name: string;
}

const ArchivedProject = ({ id, name }: ArchivedProjectProps) => {
  return (
    <>
      <div className={styles.archived}>
        <p>{name}</p>
        <button>
          <UnarchiveIcon fontSize={"large"} /> <span>Restore</span>
        </button>
      </div>
    </>
  );
};

export default ArchivedProject;
