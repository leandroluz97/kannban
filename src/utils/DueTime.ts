import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface SubTaskType {
  subtask: string;
  id: string;
  createdAt: string;
  isDone: boolean;
}

export default class DueTime {
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

  async addDueTime(dueTime: string) {
    try {
      //Get all the Subtasks from Database
      let subTaskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(this.taskId)
        .collection("subtasks")
        .add({ subtask: dueTime, isDone: false, createdAt: "ffff" })
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
        .update({ isDone: subtask });

      //Normalize all subtask
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
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
