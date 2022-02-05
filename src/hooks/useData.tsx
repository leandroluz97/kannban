import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

//imports
import firebase from "../config/firebase-config";
import Projects from "../utils/projects";
import Groups from "../utils/groups";
import Tasks from "../utils/tasks";
import Tags from "../utils/tags";
import Comments from "../utils/comments";
import Lists from "../utils/lists";

import { groupProjectsByGroupName, joinGroupAndProjects } from "../utils/normarlization";
import Subtasks from "../utils/subtasks";
import { getLastPosition } from "../utils/getLastPosition";
import { getLeftToRightDirection, getRightToLeftDirection } from "../utils/getDirection";

const configSuccess = { bodyClassName: "toastify__success", className: "toastify" };
const configError = { bodyClassName: "toastify__error", className: "toastify" };

interface DataProviderPropsType {
  children: ReactNode;
}

interface ProjectSelf {
  name: string;
  id: string;
  isActive: boolean;
}

interface ProjectType {
  name: string;
  group: string;
  id: string;
  isActive: boolean;
  createdAt: string;
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
  dueTime?: Date;
  description: string;
  position: number;
  tags: TagType[];
}

interface TasksTypeDisplay {
  name: string;
  id: string;
  listId: string;
  projectId: string;
  dueTime?: Date;
  description: string;
  position: number;
  tags: TagType[];
  comments: CommentType[];
  subtasks: SubTaskType[];
}

interface TasksCard {
  name: string;
  id: string;
  listId: string;
  dueTime?: Date;
  description: string;
  position: number;
  tags: TagType[];
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
  isDone: boolean;
}

interface TagType {
  name: string;
  color: string;
  id: string;
  isActive: boolean;
}

interface ListsType {
  name: string;
  id: string;
  color: string;
  position: number;
}

interface GroupType {
  name: string;
  id: string;
  createdAt: string;
}

interface UpdateListType {
  id: string;
  name: string;
  color: string;
  projectId: string;
  position: number;
}

type SearchedTask = Pick<TasksType, "name" | "id">;

interface contextProps {
  groups: JoinedType[];
  addGroup: (groupName: string) => Promise<void>;
  getProjects: () => Promise<void>;

  addProject: (groupName: string) => Promise<string | undefined>;
  setStorageProjectName: (name: string) => void;
  getLists: (id: string) => Promise<void>;
  getProject: (id: string) => Promise<void>;
  archiveProject: (id: string) => Promise<void>;
  updateProject: (id: string, name: string) => Promise<void>;
  selectedProject: ProjectSelf;
  archivedProjects: ProjectType[];
  getArchivedProjects: () => Promise<void>;
  restoreProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  lists: ListsType[];
  addList: (name: string) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  updateList: ({ id, name, color, projectId, position }: UpdateListType) => Promise<void>;
  switchList: (source: number, destination: number) => Promise<void>;

  getTask: (id: string) => Promise<void>;
  getTasks: () => Promise<void>;
  tasks: TasksTypeDisplay[];
  selectedTask: TasksType;
  addTask: (taskName: string, listId: string) => Promise<void>;
  updateTask: ({ id, name, listId, description, dueTime, tags }: TasksType) => Promise<void>;
  unSetTasks: () => void;
  deleteTask: (id: string) => Promise<void>;
  switchTask: (source: number, destination: number) => Promise<void>;
  getSearchTasks: (name: string) => Promise<void>;
  searchedTasks: SearchedTask[];

  addComment: (comment: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  comments: CommentType[];

  addSubtask: (subtask: string) => Promise<void>;
  subtasks: SubTaskType[];
  deleteSubtask: (id: string) => Promise<void>;
  updateSubtask: (id: string, isDone: boolean, subtask: string, createdAt: string) => Promise<void>;

  tags: TagType[];
  updateTag: (id: string, isActive: boolean) => Promise<void>;
  getTags: (id: string) => Promise<void>;
}

//context
const DataContext = createContext<contextProps>({} as contextProps);

//Provider
export const DataProvider = ({ children }: DataProviderPropsType) => {
  //const [projects, setProjects] = useState<projectData[]>([]);
  const [groups, setGroups] = useState<JoinedType[]>([]);
  const [storageProjectName, setStorageProjectName] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState({} as ProjectSelf);
  const [archivedProjects, setArchivedProjects] = useState<ProjectType[]>([]);

  const [lists, setLists] = useState<ListsType[]>([]);
  const [tasks, setTasks] = useState<TasksTypeDisplay[]>([]);
  const [searchedTasks, setSearchedTasks] = useState<SearchedTask[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [subtasks, setSubtasks] = useState<SubTaskType[]>([]);
  const [selectedTask, setSelectedTask] = useState({} as TasksType);

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
      toast.error("Error on getting the projects.", configError);
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
      toast.error(error.message, configError);
    }
  }

  async function addProject(projectName: string) {
    const projectClass = new Projects();

    try {
      const returnedProject = await projectClass.addProject(projectName, storageProjectName);

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

      toast.success("added", {
        bodyClassName: "toastify__error",
        className: "toastify",
      });

      return returnedProject?.id;
    } catch (error) {
      toast.error(error.message, configError);
    }
  }

  async function getProject(id: string) {
    //Instance of classes
    const projectClass = new Projects();

    try {
      //Get Project from Database
      const projectDB: any = await projectClass.getProject(id);

      //If the project is not archived show it as an active project
      if (projectDB.isActive) {
        const returnedProject = {
          name: projectDB.name,
          id: projectDB.id,
          isActive: projectDB.isActive,
        } as ProjectSelf;

        setSelectedProject(returnedProject);

        return;
      }

      setSelectedProject({} as ProjectSelf);
    } catch (error) {
      toast.error("Error on creating a group.", configError);
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
      toast.error("Error on archive project", configError);
    }
  }

  async function restoreProject(id: string) {
    //Instance of classes
    const projectClass = new Projects();

    let archivedProject = archivedProjects.find((project) => project.id === id) as ProjectType;

    archivedProject = {
      ...archivedProject,
      isActive: true,
    };

    try {
      //Update Project in Database
      await projectClass.restoreProject(id);

      //Archived Project
      const allGroups = groups.reduce((acc, group) => {
        if (group.name === archivedProject.group) {
          group.projects.push(archivedProject);
        }

        acc.push(group);
        return acc;
      }, [] as JoinedType[]);

      const newArchivedProject = archivedProjects.filter((project) => project.id !== id);

      //Update State
      setGroups(allGroups);
      setArchivedProjects(newArchivedProject);
    } catch (error) {
      toast.error("Error on archiving project", configError);
    }
  }

  async function deleteProject(id: string) {
    //Instance of classes
    const projectClass = new Projects();

    let projectToDelete = archivedProjects.find((project) => project.id === id) as ProjectType;

    if (!projectToDelete) return;

    try {
      //Update Project in Database
      await projectClass.deleteProject(id);

      const newProjects = archivedProjects.filter((project) => project.id !== id);

      //Update State
      setArchivedProjects(newProjects);

      toast.success(`Project ${projectToDelete.name} deleted successfully!`, configSuccess);
    } catch (error) {
      toast.error("Error on deleting project.", configError);
    }
  }

  async function getArchivedProjects() {
    //Instance of classes
    const projectClass = new Projects();

    try {
      const allArchivedProjects = await projectClass.getArchivedProjects();

      //Update State
      setArchivedProjects(allArchivedProjects as ProjectType[]);
    } catch (error) {
      toast.error("Error on getting archived projects.", configError);
    }
  }

  async function updateProject(id: string, name: string) {
    //Instance of classes
    const projectClass = new Projects();

    try {
      //Update Project in Database
      await projectClass.updateProject(id, name);

      //Archived Project
      const updatedProject = groups.reduce((acc, group) => {
        group.projects = group.projects.map((project) => {
          if (project.id === id) {
            project.name = name;
          }
          return project;
        });
        acc = [...acc, group];
        return acc;
      }, [] as JoinedType[]);

      //Update State
      setGroups(updatedProject);
    } catch (error) {
      toast.error(error.message, configError);
    }
  }

  async function getLists(id: string) {
    //Instance of classes
    const listClass = new Lists(id);

    try {
      //Add list in Database
      let listDB: any = await listClass.getLists();

      //Update State
      setLists(listDB);
    } catch (error) {
      toast.error("Error on getting the project lists.", configError);
    }
  }

  async function addList(name: string) {
    //Instance of classes
    const listClass = new Lists(selectedProject.id);

    const position = getLastPosition(lists) + 1;

    try {
      //Add list in Database
      let listDB: any = await listClass.addList(name, "8B18D1", position);

      const newList = {
        name: listDB.name,
        id: listDB.id,
        color: listDB.color,
        position: position,
      } as ListsType;

      const allLists: ListsType[] = [...lists, newList];

      setLists(allLists);

      toast.success(`List ${name} created successfully!`, configSuccess);
    } catch (error) {
      toast.error("Error on creating list", configError);
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

      toast.success(`List deleted successfully!`, configSuccess);
    } catch (error) {
      toast.error("Error on deleting list!", configError);
    }
  }

  async function updateList({ id, name, color, projectId, position }: UpdateListType) {
    //Instance of classes
    const listClass = new Lists(projectId);

    try {
      //Add list in Database
      let listDB: any = await listClass.updateList(id, name, color, position);

      //console.log(listDB);

      const allLists = lists.map((list) => {
        if (list.id === id) {
          list = {
            ...list,
            name: name,
            color: color,
            position: position,
          };
        }
        return list;
      }) as ListsType[];

      setLists(allLists);
    } catch (error: any) {
      toast.error("Error on updating list.", configError);
    }
  }

  async function switchList(source: number, destination: number) {
    const leftToRight = getLeftToRightDirection(source, destination);

    const rigthToLeft = getRightToLeftDirection(source, destination);

    const listsId = {} as any;

    const allLists = lists.map((list) => {
      if (list.position === source) {
        list.position = destination;
        listsId[list.id] = destination;
        return list;
      }

      if (leftToRight(list.position)) {
        list.position = list.position - 1;
        listsId[list.id] = list.position;
        return list;
      }

      if (rigthToLeft(list.position)) {
        list.position = list.position + 1;
        listsId[list.id] = list.position;
        return list;
      }

      return list;
    });

    //Instance of classes
    const listClass = new Lists(selectedProject.id);
    console.log(listsId);

    try {
      await listClass.updatePosition(listsId);

      setLists(allLists);
    } catch (error: any) {
      toast.error("Error on swapping list.", configError);
    }
  }

  async function getTask(id: string) {
    //Instance of classes
    const subtaskClass = new Subtasks(id);
    const comentsClass = new Comments(id);
    const tagsClass = new Tags(id);

    try {
      //Get subtasks comments and tags from Database
      const allSubtasks: any = await subtaskClass.getSubtasks();
      const allComments: any = await comentsClass.getComments();
      const allTags: any = await tagsClass.getTags();

      const task: any = tasks.find((task) => task.id === id);

      //Update States
      setSubtasks(allSubtasks);
      setComments(allComments);
      setTags(allTags);
      setSelectedTask(task);
    } catch (error) {
      //handle toast error
      toast.error("Error on getting task.", configError);
    }
  }

  function unSetTasks() {
    setSubtasks([]);
    setComments([]);
    setTags([]);
    setSelectedTask({} as TasksType);
  }

  async function getTasks() {
    try {
      const newAllTask = [];

      const taskClass = new Tasks();
      const allTasks = await taskClass.getTasks();

      for (const task of allTasks as any) {
        const tagsClass = new Tags(task.id);
        const commentsClass = new Comments(task.id);
        const subtasksClass = new Subtasks(task.id);
        const allTags = await tagsClass.getTags();
        const allComments = await commentsClass.getComments();
        const allSubtasks = await subtasksClass.getSubtasks();
        task["tags"] = allTags;
        task["comments"] = allComments;
        task["subtasks"] = allSubtasks;

        newAllTask.push(task);
      }

      setTasks(newAllTask as TasksTypeDisplay[]);
    } catch (error) {
      toast.error("Error on getting tasks.", configError);
    }
  }

  async function getSearchTasks(name: string) {
    try {
      // const newAllTask = [];
      // const taskClass = new Tasks();
      // const allTasks: SearchedTask[] | undefined = await taskClass.getSearchTasks(selectedProject.id, name);
      const allTasks = tasks
        .filter((t) => t.projectId === selectedProject.id && t.name.toLowerCase().includes(name.toLowerCase()))
        .map((t) => ({ name: t.name, id: t.id }));
      setSearchedTasks(allTasks ? allTasks : ([] as SearchedTask[]));
    } catch (error) {}
  }

  async function addTask(taskName: string, listId: string) {
    const position = getLastPosition(tasks) + 1;
    try {
      const taskClass = new Tasks();

      //New task
      let newTask = await taskClass.addTask(taskName, listId, position, selectedProject.id);
      const id = newTask?.id as string;

      //Get original tags
      const tagsClass = new Tags(id);
      await tagsClass.getOriginalTags();

      newTask = { ...newTask, tags: [], comments: [], subtasks: [] } as unknown as TasksTypeDisplay;

      const allTask = [...tasks, newTask] as TasksTypeDisplay[];

      setTasks(allTask);
    } catch (error) {
      toast.error("Error o creating task.", configError);

      console.log(error);
    }
  }

  async function updateTask({ id, name, listId, description, dueTime, tags, position }: TasksType) {
    //Instance of classes
    const taskClass = new Tasks();

    //convert the start day of month to firestore timpstamp

    try {
      //delete subtasks from Database
      await taskClass.updateTask(id, name, dueTime, description, listId, position);

      //New array of subtasks
      const allTasks = tasks.map((task) => {
        if (task.id === id) {
          task.name = name;
          task.description = description;
          task.dueTime = dueTime && new Date(dueTime);
          task.listId = listId;
          task.position = position;
          task.tags = tags;
          task.comments = comments;
          task.subtasks = subtasks;
        }

        return task;
      }) as TasksTypeDisplay[];

      //Update States
      setTasks(allTasks);
    } catch (error) {
      //handle toast error
      toast.error("Error on updating task.", configError);

      console.log(error);
    }
  }

  async function switchTask(source: number, destination: number) {
    //Instance of classes
    const taskClass = new Tasks();

    const leftToRight = getLeftToRightDirection(source, destination);
    const rigthToLeft = getRightToLeftDirection(source, destination);

    const tasksId = {} as any;

    const allTasks = tasks.map((task) => {
      if (task.position === source) {
        task.position = destination;
        tasksId[task.id] = destination;
        return task;
      }

      if (leftToRight(task.position)) {
        task.position = task.position - 1;
        tasksId[task.id] = task.position;
        return task;
      }

      if (rigthToLeft(task.position)) {
        task.position = task.position + 1;
        tasksId[task.id] = task.position;
        return task;
      }

      return task;
    });

    try {
      await taskClass.updatePosition(tasksId);

      // Update States
      setTasks(allTasks);
    } catch (error) {
      //handle toast error
      toast.error("Error swapping task.", configError);

      console.log(error);
    }
  }

  async function deleteTask(id: string) {
    //Instance of classes
    const taskClass = new Tasks();

    try {
      //Delete Task in Database
      await taskClass.deleteTask(id);

      //Delete Task in State
      const allTasks = tasks.filter((task) => task.id !== id);

      //Update State
      setTasks(allTasks);

      toast.success(`Task ${selectedTask.name} deleted successfully`, configSuccess);
    } catch (error) {
      toast.error("Error on deleting task.", configError);
    }
  }

  async function addComment(comment: string) {
    //Instance of classes
    const comentsClass = new Comments(selectedTask.id);

    try {
      //Get subtasks comments and tags from Database
      const newComment: any = await comentsClass.addComment(comment);

      //New array of comments
      const allComments = [...comments, newComment];

      const allTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          console.log("yesss");

          task.comments = [...task.comments, newComment];
        }
        return task;
      }) as unknown as TasksTypeDisplay[];

      //Update States
      setComments(allComments);
      setTasks(allTasks);
    } catch (error) {
      //handle toast error
      toast.error("Error on creating a comment.", configError);

      console.log(error);
    }
  }

  async function deleteComment(id: string) {
    //Instance of classes
    const comentsClass = new Comments(selectedTask.id);

    try {
      //Get subtasks comments and tags from Database
      await comentsClass.deleteComment(id);

      //New array of comments
      const allComments = comments.filter((comment) => comment.id !== id);

      const allTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          task.comments = task.comments.filter((c) => c.id !== id);
        }

        return task;
      });

      //Update States
      setComments(allComments);
      setTasks(allTasks);
    } catch (error) {
      //handle toast error
      toast.error("Error on deleting comment.", configError);

      console.log(error);
    }
  }

  async function addSubtask(subtask: string) {
    //Instance of classes
    const subtaskClass = new Subtasks(selectedTask.id);

    try {
      //Get subtasks comments and tags from Database
      const newSubtask: any = await subtaskClass.addSubtask(subtask);

      //New array of comments
      const allSubtasks = [...subtasks, newSubtask];

      const allTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          task.subtasks = [...task.subtasks, newSubtask];
        }

        return task;
      });
      //Update States
      setSubtasks(allSubtasks);
      setTasks(allTasks);
    } catch (error) {
      //handle toast error
      toast.error("Error on creating subtask.", configError);
    }
  }

  async function deleteSubtask(id: string) {
    //Instance of classes
    const subtaskClass = new Subtasks(selectedTask.id);

    try {
      //delete subtasks from Database
      await subtaskClass.deleteSubtask(id);

      //New array of subtasks
      const allSubtasks = subtasks.filter((subtask) => subtask.id !== id);

      const allTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          task.subtasks = task.subtasks.filter((s) => s.id !== id);
        }

        return task;
      });

      //Update States
      setSubtasks(allSubtasks);
      setTasks(allTasks);
    } catch (error) {
      //handle toast error
      toast.error("Error on deletting subtask.", configError);

      console.log(error);
    }
  }

  async function updateSubtask(id: string, isDone: boolean, subtaskName: string, createdAt: string) {
    //Instance of classes
    const subtaskClass = new Subtasks(selectedTask.id);

    try {
      //delete subtasks from Database
      await subtaskClass.updateSubtask(id, isDone, subtaskName, createdAt);

      //New array of subtasks
      const allSubtasks = subtasks.map((subtask) => {
        if (subtask.id === id) {
          subtask.isDone = isDone;
          subtask["subtask"] = subtaskName;
        }

        return subtask;
      }) as SubTaskType[];

      const allTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          task.subtasks = task.subtasks.map((s) => {
            if (s.id === id) {
              s.isDone = isDone;
              s.subtask = subtaskName;
            }
            return s;
          });
        }

        return task;
      });

      //Update States
      setSubtasks(allSubtasks);
      setTasks(allTasks);
    } catch (error) {
      //handle toast error
      toast.error("Subtask updated successfully.", configError);
    }
  }

  async function updateTag(id: string, isActive: boolean) {
    //Instance of classes
    const tagsClass = new Tags(selectedTask.id);

    try {
      //delete tags from Database
      await tagsClass.updateTag(id, isActive);

      //New array of tags
      const allTags = tags.map((tag) => {
        if (tag.id === id) {
          tag.isActive = isActive;
        }

        return tag;
      }) as TagType[];

      const allTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          task.tags = allTags;
        }
        return task;
      }) as TasksTypeDisplay[];

      //Update States
      setTags(allTags);
      setTasks(allTasks);
      toast.success("Tags Update!", {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    } catch (error) {
      //handle toast error
      toast.error(error.message, configError);

      console.log(error);
    }
  }

  async function getTags(id: string) {
    //Instance of classes
    const tagsClass = new Tags(id);

    try {
      //get tasks
      const allTags = await tagsClass.getTags();

      //Update States
      setTags(allTags as TagType[]);

      toast.success("Tags Update!", {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    } catch (error) {
      //handle toast error
      toast.error(error.message, configError);

      console.log(error);
    }
  }

  return (
    <DataContext.Provider
      value={{
        groups,
        addGroup,
        getProjects,
        addProject,
        setStorageProjectName,
        selectedProject,
        getProject,
        updateProject,
        archiveProject,
        archivedProjects,
        getArchivedProjects,
        restoreProject,
        deleteProject,
        getLists,
        lists,
        addList,
        updateList,
        deleteList,
        switchList,
        getTask,
        unSetTasks,
        getTasks,
        tasks,
        deleteTask,
        selectedTask,
        addTask,
        updateTask,
        switchTask,
        getSearchTasks,
        searchedTasks,
        addComment,
        comments,
        deleteComment,
        addSubtask,
        deleteSubtask,
        subtasks,
        updateSubtask,
        tags,
        updateTag,
        getTags,
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
