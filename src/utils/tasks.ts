import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface TaskType {
  name: string;
  id: string;
}

export default class Tasks {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  tasks: TaskType[];
  projectId: string;

  constructor(projectId: string) {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.tasks = [];
    this.projectId = projectId;
  }

  async getTasks() {
    try {
      //Get all Tasks from Database
      let tasksDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .get();

      //Normalize tasks
      tasksDB.forEach((taskDB) => {
        let task: TaskType = {
          name: taskDB.data().name,
          id: taskDB.id,
        };

        this.tasks.push(task);
      });

      return this.tasks;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async addTask(taskName: string) {
    try {
      //Get all the Subtasks from Database
      let taskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .add({ name: taskName })
        .then((data) => data.get());

      const newTask = {
        name: taskDB.data()?.name,
        id: taskDB.id,
      } as TaskType;

      return newTask;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateTask(id: string, taskName: string) {
    try {
      //Update Task in Database
      let taskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .doc(id)
        .update({ name: taskName });
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async deleteTask(id: string) {
    try {
      //Delete Task from Database
      let subTaskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .doc(id)
        .delete();
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
}
