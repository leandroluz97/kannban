import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface TaskType {
  name: string;
  id: string;
  listId: string;
  dueTime: string;
  description: string;
}

export default class Tasks {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  tasks: TaskType[];

  constructor() {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.tasks = [];
  }

  async getTasks() {
    try {
      //Get all Tasks from Database
      let tasksDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .get();

      //Normalize tasks
      tasksDB.forEach((taskDB) => {
        let task: TaskType = {
          name: taskDB.data().name,
          id: taskDB.id,
          listId: taskDB.data().listId,
          dueTime: taskDB.data().dueTime,
          description: taskDB.data().description,
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

  async addTask(taskName: string, listId: string) {
    try {
      //Get all the Subtasks from Database
      let taskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .add({ name: taskName, listId: listId, dueTime: "" })
        .then((data) => data.get());

      const newTask = {
        name: taskDB.data()?.name,
        id: taskDB.id,
        listId: taskDB.data()?.listId,
        dueTime: taskDB.data()?.dueTime,
        description: taskDB.data()?.description,
      } as TaskType;

      return newTask;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateTask(
    id: string,
    taskName: string,
    dueTime: string,
    description: string,
    listId: string
  ) {
    try {
      //Update Task in Database
      let taskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(id)
        .update({
          name: taskName,
          dueTime: dueTime,
          description: description,
          listId: listId,
        });
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
      console.log(error);
    }
  }

  async deleteTask(id: string) {
    try {
      //Delete Task from Database
      let subTaskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
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
