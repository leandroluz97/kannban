import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface SubTaskType {
  subtask: string;
  id: string;
  createdAt: string;
  isDone: boolean;
}

export default class Subtasks {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  subtasks: SubTaskType[];

  taskId: string;

  constructor(taskId: string) {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.subtasks = [];

    this.taskId = taskId;
  }

  async getSubtasks() {
    try {
      //Get all the Subtasks from Database
      let subTasksDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(this.taskId)
        .collection("subtasks")
        .get();

      //Normalize all subtask
      subTasksDB.forEach((subtaskDB) => {
        let subtask: SubTaskType = {
          subtask: subtaskDB.data().subtask,
          createdAt: subtaskDB.data().createdAt,
          isDone: subtaskDB.data().isDone,
          id: subtaskDB.id,
        };

        this.subtasks.push(subtask);
      });

      return this.subtasks;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async addSubtask(subtask: string) {
    try {
      //Get all the Subtasks from Database
      let subTaskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(this.taskId)
        .collection("subtasks")
        .add({ subtask: subtask, isDone: false, createdAt: "ffff" })
        .then((data) => data.get());

      const newSubtask = {
        subtask: subTaskDB.data()?.subtask,
        createdAt: subTaskDB.data()?.createdAt,
        isDone: subTaskDB.data()?.isDone,
        id: subTaskDB.id,
      } as SubTaskType;

      return newSubtask;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateSubtask(id: string, isDone: boolean, subtask: string) {
    try {
      //Get all the Subtasks from Database
      let subTaskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(this.taskId)
        .collection("subtasks")
        .doc(id)
        .set({ isDone: isDone, subtask: subtask, createdAt: "fff" });

      //Normalize all subtask
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });

      console.log(error);
    }
  }

  async deleteSubtask(id: string) {
    try {
      //Get all the Subtasks from Database
      let subTaskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(this.taskId)
        .collection("subtasks")
        .doc(id)
        .delete();

      //Normalize all subtask
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
}
