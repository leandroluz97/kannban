import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

//imports
import firebase from "../config/firebase-config";

interface DataProviderPropsType {
  children: ReactNode;
}

interface groupsData {
  name: string;
  id: string;
}

interface projectData {
  name: string;
  id: string;
  group: string;
}

interface contextProps {
  groups: groupsData[];
  projects: projectData[];
}

//context
const DataContext = createContext<contextProps>({} as contextProps);

//Provider
export const DataProvider = ({ children }: DataProviderPropsType) => {
  const [projects, setProjects] = useState<projectData[]>([]);
  const [groups, setGroups] = useState<groupsData[]>([]);

  useEffect(() => {
    getProjectList();
  }, []);

  async function getProjectList() {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //fetching projects
      let collectionProjects = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .get();

      // fetching groups
      let collectionGroups = await db
        .collection("users")
        .doc(user?.uid)
        .collection("groups")
        .get();

      const dataOfGroup: groupsData[] = [];
      const dataOfProjects: projectData[] = [];

      collectionGroups.forEach((item) => {
        dataOfGroup.push({ name: item.data().name, id: item.id });
      });

      collectionProjects.forEach((item) => {
        dataOfProjects.push({
          group: item.data().group,
          name: item.data().name,
          id: item.id,
        });
      });

      setGroups(dataOfGroup);
      setProjects(dataOfProjects);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  return (
    <DataContext.Provider value={{ groups, projects }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);

  return context;
}
