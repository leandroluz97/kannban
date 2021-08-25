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
import Projects from "../utils/projects";
import Groups from "../utils/groups";
import Tasks from "../utils/tasks";
import Tags from "../utils/tags";
import Comments from "../utils/comments";
import Lists from "../utils/lists";

import {
  groupProjectsByGroupName,
  joinGroupAndProjects,
} from "../utils/normarlization";

import Subtasks from "../utils/subtasks";
import { Description } from "@material-ui/icons";

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
  createdAt: string;
  name: string;
  groupId: string;
  projects: ProjectData[];
}

interface TasksType {
  name: string;
  id: string;
  listId: string;
  dueTime: string;
  description: string;
}

interface CommentType {
  comment: string;
  id: string;
  createdAt: string;
}

interface SubTaskType {
  subtask: string;
  id: string;
  createdAt: string;
}

interface TagType {
  tag: string;
  color: string;
  id: string;
}

interface ListsType {
  name: string;
  id: string;
  color: string;
  //tasks: TasksType[];
}

interface GroupType {
  name: string;
  id: string;
  createdAt: string;
}
interface KeyType {
  key: GroupType;
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
  getTask: (id: string) => Promise<void>;
  getTasks: () => Promise<void>;
  tasks: TasksType[];
  addTask: (taskName: string, listId: string) => Promise<void>;
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
  const [tags, setTags] = useState<TasksType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [subTaks, setSubTaks] = useState<SubTaskType[]>([]);

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    //Instances of classes
    const projectClasse = new Projects();
    const groupClasse = new Groups();

    try {
      //Get Groups and Projects from Database
      let collectionGroups = await groupClasse.getGroups();
      let collectionProjects = await projectClasse.getProjects();

      const dataOfGroup = collectionGroups?.reduce((acc: any, group) => {
        acc[group.name] = {
          name: group.name,
          id: group.id,
          createdAt: group.createdAt,
        };
        return acc;
      }, {});

      let dataOfProjects = collectionProjects?.reduce((acc: any, project) => {
        if (project.isActive) {
          acc.push({
            group: project.group,
            name: project.name,
            id: project.id,
            isActive: project.isActive,
          });
        }

        return acc;
      }, []);

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

    const groupClass = new Groups();

    try {
      const returnedGroup = await groupClass.addGroup(groupName);

      const newGroup = {
        name: returnedGroup?.name,
        id: returnedGroup?.id,
        projects: [],
      };

      const dataOfGroups = [...groups, newGroup] as JoinedType[];

      setGroups(dataOfGroups);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function addProject(projectName: string) {
    const projectClass = new Projects();

    try {
      const returnedProject = await projectClass.addProject(
        projectName,
        storageProjectName
      );

      const newProject = {
        name: returnedProject?.name,
        id: returnedProject?.id,
        group: storageProjectName,
      } as ProjectData;

      const dataOfGroups = groups.map((group) => {
        if (group.name === newProject.group) {
          group.projects = [...group.projects, newProject];
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
    //Instance of classes
    const projectClass = new Projects();

    try {
      //Get Project from Database
      const projectDB: any = await projectClass.getProject(id);

      //If the project is not archived show it as an active project
      if (projectDB.data()?.isActive) {
        const returnedProject = {
          name: projectDB.data()?.name,
          id: projectDB.id,
          isActive: projectDB.data()?.isActive,
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
    //Instance of classes
    const projectClass = new Projects();

    try {
      //Update Project in Database
      await projectClass.archiveProject(id);

      //Archived Project
      const archivedProject = groups.reduce((acc, group) => {
        group.projects = group.projects.filter((project) => project.id !== id);
        acc = [...acc, group];
        return acc;
      }, [] as JoinedType[]) as JoinedType[];

      //Update State
      setGroups(archivedProject);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function getLists(id: string) {
    //Instance of classes
    const listClass = new Lists(selectedProject.id);

    try {
      //Add list in Database
      let listDB: any = await listClass.getLists();

      //Update State
      setLists(listDB);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function addList(name: string) {
    //Instance of classes
    const listClass = new Lists(selectedProject.id);

    try {
      //Add list in Database
      let listDB: any = await listClass.addList(name, "8B18D1");

      const newList = {
        name: listDB.data()?.name,
        id: listDB.id,
        color: listDB.data()?.color,
      } as ListsType;

      const allLists: ListsType[] = [...lists, newList];

      setLists(allLists);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function deleteList(id: string) {
    //Instance of classes
    const listClass = new Lists(selectedProject.id);

    try {
      //Delete list in Database
      await listClass.deleteList(id);

      //Delete List in State
      const allLists = lists.filter((list) => list.id !== id);

      //Update State
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

  async function getTask(id: string) {
    //Instance of classes
    const subtaskClass = new Subtasks(selectedProject.id, id);
    const comentsClass = new Comments(id);
    const tagsClass = new Tags(id);

    try {
      //Get subtasks comments and tags from Database
      const allSubtasks: any = await subtaskClass.getSubtasks();
      const allComments: any = await comentsClass.getComments();
      const allTags: any = await tagsClass.getTags();

      //Update States
      setSubTaks(allSubtasks);
      setComments(allComments);
      setTags(allTags);
    } catch (error) {
      //handle toast error
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });

      console.log(error);
    }
  }

  async function getTasks() {
    try {
      const taskClass = new Tasks();
      const allTasks = await taskClass.getTasks();

      setTasks(allTasks as TasksType[]);
    } catch (error) {}
  }

  async function addTask(taskName: string, listId: string) {
    try {
      const taskClass = new Tasks();

      const newTask = await taskClass.addTask(taskName, listId);

      const allTask = [...tasks, newTask] as TasksType[];

      setTasks(allTask);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });

      console.log(error);
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
        getTasks,
        tasks,
        addTask,
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
