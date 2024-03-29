import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface TaskType {
  name: string;
  id: string;
  listId: string;
  projectId: string;
  dueTime?: Date;
  description: string;
  position: number;
}

type SearchedTask = Pick<TaskType, "name" | "id">;

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
      let tasksDB = await this.db.collection("users").doc(this.user?.uid).collection("tasks").get();

      //Normalize tasks
      tasksDB.forEach((taskDB) => {
        let task: TaskType = {
          name: taskDB.data().name,
          id: taskDB.id,
          listId: taskDB.data().listId,
          projectId: taskDB.data().projectId,
          dueTime: taskDB.data().dueTime && new Date(taskDB.data().dueTime.toDate().getTime()),
          description: taskDB.data().description,
          position: taskDB.data().position,
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
  async getSearchTasks(projectId: string, name: string) {
    try {
      //Get all Tasks from Database
      let tasksDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .where("projectId", "==", projectId)
        .where("name", "in", [name])
        .get();

      //Normalize tasks
      // tasksDB.forEach((taskDB) => {
      //   let task: TaskType = {
      //     name: taskDB.data().name,
      //     id: taskDB.id,
      //     listId: taskDB.data().listId,
      //     dueTime: taskDB.data().dueTime && new Date(taskDB.data().dueTime.toDate().getTime()),
      //     description: taskDB.data().description,
      //     position: taskDB.data().position,
      //   };

      //   this.tasks.push(task);
      // });
      const searchResult: SearchedTask[] = [];
      tasksDB.forEach((taskDB) => {
        let task: SearchedTask = {
          name: taskDB.data().name,
          id: taskDB.id,
        };

        searchResult.push(task);
      });

      console.log(searchResult);

      return searchResult;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async addTask(taskName: string, listId: string, position: number, projectId: string) {
    try {
      //Get all the Subtasks from Database
      let taskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .add({
          name: taskName,
          listId: listId,
          dueTime: null,
          position: position,
          projectId: projectId,
        })
        .then((data) => data.get());

      const newTask = {
        name: taskDB.data()?.name,
        id: taskDB.id,
        listId: taskDB.data()?.listId,
        projectId: taskDB.data()?.projectId,
        dueTime: taskDB.data()?.dueTime,
        description: taskDB.data()?.description,
        position: taskDB.data()?.position,
      } as TaskType;

      return newTask;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateTask(id: string, taskName: string, dueTime: undefined | Date, description: string, listId: string, position: number) {
    try {
      const dueDatetimestamp = dueTime ? firebase.firestore.Timestamp.fromDate(new Date(dueTime)) : null;

      //Update Task in Database
      let taskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(id)
        .update({
          name: taskName,
          dueTime: dueDatetimestamp,
          description: description ? description : "",
          listId: listId,
          position: position,
        });
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
      console.log(error);
    }
  }

  async updatePosition(tasksId: any) {
    try {
      //Update Task in Database

      for (const taskId in tasksId) {
        await this.db.collection("users").doc(this.user?.uid).collection("tasks").doc(taskId).update({
          position: tasksId[taskId],
        });
      }
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
      let subTaskDB = await this.db.collection("users").doc(this.user?.uid).collection("tasks").doc(id).delete();
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async deleteTaskBatch(projectId: string) {
    try {
      const batch = this.db.batch();
      let taskRef = await this.db.collection("users").doc(this.user?.uid).collection("tasks").where("projectId", "==", projectId).get();
      taskRef.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
}
