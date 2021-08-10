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
import {
  groupProjectsByGroupName,
  joinGroupAndProjects,
} from "../utils/normarlization";

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

interface joinedType {
  name: string;
  groupId: string;
  projects: projectData[];
}

interface contextProps {
  groups: joinedType[];
  addGroup: (groupName: string) => Promise<void>;
  addProject: (groupName: string) => Promise<void>;
  setStorageProjectName: (name: string) => void;
}

//context
const DataContext = createContext<contextProps>({} as contextProps);

//Provider
export const DataProvider = ({ children }: DataProviderPropsType) => {
  //const [projects, setProjects] = useState<projectData[]>([]);
  const [groups, setGroups] = useState<joinedType[]>([]);
  const [storageProjectName, setStorageProjectName] = useState<string>("");

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
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

      const dataOfGroup = {} as any;
      const dataOfProjects: projectData[] = [];

      collectionGroups.forEach((item) => {
        dataOfGroup[item.data().name] = { name: item.data().name, id: item.id };
      });

      collectionProjects.forEach((item) => {
        dataOfProjects.push({
          group: item.data().group,
          name: item.data().name,
          id: item.id,
        });
      });

      const groupOfProjects = groupProjectsByGroupName(dataOfProjects);

      const joinedGroupProjects = joinGroupAndProjects({
        groups: dataOfGroup,
        projects: groupOfProjects,
      });

      setGroups(joinedGroupProjects);
      // setProjects(dataOfProjects);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function addGroup(groupName: string) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      // fetching groups
      let collectionGroups = await db
        .collection("users")
        .doc(user?.uid)
        .collection("groups")
        .add({ name: groupName });

      const returnedGroup = await collectionGroups.get();

      const newGroup = {
        name: returnedGroup.data()?.name,
        groupId: returnedGroup.id,
        projects: [],
      } as joinedType;

      const dataOfGroups: joinedType[] = [...groups, newGroup];

      setGroups(dataOfGroups);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function addProject(projectName: string) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      // fetching groups
      let collectionProject = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .add({ name: projectName, group: storageProjectName });

      const returnedProject = await collectionProject.get();

      const newGroup = {
        name: returnedProject.data()?.name,
        id: returnedProject.id,
        group: storageProjectName,
      } as projectData;

      console.log(newGroup);

      const dataOfGroups = groups.map((group) => {
        if (group.name === newGroup.group) {
          group.projects = [...group.projects, newGroup];
        }
        return group;
      }) as joinedType[];

      //const dataOfGroups: joinedType[] = [...groups, newGroup];

      setGroups(dataOfGroups);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  return (
    <DataContext.Provider
      value={{ groups, addGroup, addProject, setStorageProjectName }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);

  return context;
}
