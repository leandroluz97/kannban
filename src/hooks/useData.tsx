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

interface ProjectSelf {
  name: string;
  id: string;
  isActive: boolean;
}

interface ProjectData {
  name: string;
  id: string;
  group: string;
  isActive: boolean;
}

interface JoinedType {
  name: string;
  groupId: string;
  projects: ProjectData[];
}

interface TasksType {
  name: string;
  id: string;
}

interface ListsType {
  name: string;
  id: string;
  color: string;
  tasks: TasksType[];
}

interface contextProps {
  groups: JoinedType[];
  addGroup: (groupName: string) => Promise<void>;
  addProject: (groupName: string) => Promise<void>;
  setStorageProjectName: (name: string) => void;
  getLists: (id: string) => Promise<void>;
  lists: ListsType[];
  selectedProject: ProjectSelf;
  getProject: (id: string) => Promise<void>;
  addList: (name: string) => Promise<void>;
  archiveProject: (id: string) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  getTask: (id: string, projectId: string) => Promise<void>;
  tasks: TasksType[];
}

//context
const DataContext = createContext<contextProps>({} as contextProps);

//Provider
export const DataProvider = ({ children }: DataProviderPropsType) => {
  //const [projects, setProjects] = useState<projectData[]>([]);
  const [groups, setGroups] = useState<JoinedType[]>([]);
  const [storageProjectName, setStorageProjectName] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ProjectSelf>(
    {} as ProjectSelf
  );
  const [lists, setLists] = useState<ListsType[]>([]);
  const [tasks, setTasks] = useState<TasksType[]>([]);

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
      const dataOfProjects: ProjectData[] = [];

      collectionGroups.forEach((item) => {
        dataOfGroup[item.data().name] = { name: item.data().name, id: item.id };
      });

      collectionProjects.forEach((project) => {
        if (project.data().isActive) {
          dataOfProjects.push({
            group: project.data().group,
            name: project.data().name,
            id: project.id,
            isActive: project.data().isActive,
          });
        }
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
      } as JoinedType;

      const dataOfGroups: JoinedType[] = [...groups, newGroup];

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
        .add({ name: projectName, group: storageProjectName, isActive: true });

      const returnedProject = await collectionProject.get();

      const newGroup = {
        name: returnedProject.data()?.name,
        id: returnedProject.id,
        group: storageProjectName,
      } as ProjectData;

      const dataOfGroups = groups.map((group) => {
        if (group.name === newGroup.group) {
          group.projects = [...group.projects, newGroup];
        }
        return group;
      }) as JoinedType[];

      //const dataOfGroups: joinedType[] = [...groups, newGroup];

      setGroups(dataOfGroups);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function getProject(id: string) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      // fetching groups
      let getProjectDB = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(id)
        .get();

      if (getProjectDB.data()?.isActive) {
        const returnedProject = {
          name: getProjectDB.data()?.name,
          id: getProjectDB.id,
          isActive: getProjectDB.data()?.isActive,
        } as ProjectSelf;

        setSelectedProject(returnedProject);

        return;
      }

      setSelectedProject({} as ProjectSelf);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function archiveProject(id: string) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      // fetching groups
      let getProjectDB = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(id)
        .update({ isActive: false });

      const archiveProject = groups.reduce((acc, group) => {
        group.projects = group.projects.filter((project) => project.id !== id);
        acc = [...acc, group];
        return acc;
      }, [] as JoinedType[]) as JoinedType[];

      setGroups(archiveProject);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function getLists(id: string) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      // fetching tasks
      let allTasks = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(id)
        .collection("tasks")
        .get();

      // fetching groups
      let listsProject = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(id)
        .collection("lists")
        .get();

      const dataOfLists = [] as any;
      const dataOfTask = {} as any;

      allTasks.forEach((task) => {
        const listIDKey = task.data().listId.trim();

        dataOfTask[listIDKey] = dataOfTask.listId || [];
        dataOfTask[listIDKey].push({
          name: task.data().name,
          id: task.id,
        });
      });

      listsProject.forEach((list) => {
        dataOfLists.push({
          name: list.data().name,
          id: list.id,
          color: list.data().color,
          tasks: dataOfTask[list.id],
        });
      });

      setLists(dataOfLists);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function getTask(id: string, projectId: string) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      // fetching tasks
      let taskBD = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(selectedProject.id)
        .collection("tasks")
        .doc(id);

      // fetching tasks
      let subTasksDB = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(selectedProject.id)
        .collection("tasks")
        .doc(id)
        .collection("subtasks")
        .get();

      // fetching tasks
      let commentsDB = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(selectedProject.id)
        .collection("tasks")
        .doc(id)
        .collection("comments")
        .get();

      const task = [] as TasksType[];
      const subtasks = [] as any[];
      const comments = [] as any[];

      subTasksDB.forEach((subtask) => {
        subtasks.push(subtask.data());
      });

      commentsDB.forEach((subtask) => {
        comments.push(subtask.data());
      });

      console.log(subtasks);

      //setTasks(dataOfTask);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function addList(name: string) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      // fetching groups
      let listDB = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(selectedProject.id)
        .collection("lists")
        .add({ name: name, color: "8B18D1" });

      const returnedlistDB = await listDB.get();

      const returnedList = {
        name: returnedlistDB.data()?.name,
        id: returnedlistDB.id,
        color: returnedlistDB.data()?.color,
      } as ListsType;

      const allLists: ListsType[] = [...lists, returnedList];

      setLists(allLists);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function deleteList(id: string) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      // fetching groups
      let listDB = await db
        .collection("users")
        .doc(user?.uid)
        .collection("projects")
        .doc(selectedProject.id)
        .collection("lists")
        .doc(id)
        .delete();

      const allLists = lists.filter((list) => list.id !== id);

      setLists(allLists);

      toast.error("List Deleted!", {
        bodyClassName: "toastify__success",
        className: "toastify",
      });
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  return (
    <DataContext.Provider
      value={{
        groups,
        addGroup,
        addProject,
        setStorageProjectName,
        getLists,
        lists,
        selectedProject,
        getProject,
        addList,
        archiveProject,
        deleteList,
        getTask,
        tasks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);

  return context;
}
