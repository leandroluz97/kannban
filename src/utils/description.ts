import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface DescriptionType {
  description: string;
  id: string;
}

export default class Descriptions {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  description: DescriptionType;
  projectId: string;
  taskId: string;

  constructor(projectId: string, taskId: string) {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.description = {} as DescriptionType;
    this.projectId = projectId;
    this.taskId = taskId;
  }

  async getDescription() {
    try {
      //Get all the Subtasks from Database
      let descriptionDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .doc(this.taskId)
        .collection("description")
        .get();

      //Normalize all subtask
      descriptionDB.forEach((description) => {
        let desc: DescriptionType = {
          description: description.data().description,
          id: description.id,
        };

        this.description = desc;
      });

      return this.description;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async addDescription(description: string) {
    try {
      //Get all the Subtasks from Database
      let subTaskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .doc(this.taskId)
        .collection("subtasks")
        .add({ description: description })
        .then((data) => data.get());

      const newDescription = {
        description: subTaskDB.data()?.description,
        id: subTaskDB.id,
      } as DescriptionType;

      return newDescription;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateDescription(id: string, description: string) {
    try {
      //Get all the Subtasks from Database
      let descriptionDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .doc(this.taskId)
        .collection("description")
        .doc(id)
        .update({ description: description });

      //Normalize all subtask
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
}
