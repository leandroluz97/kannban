import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface ListType {
  name: string;
  id: string;
  color: string;
}

export default class Lists {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  lists: ListType[];
  projectId: string;

  constructor(projectId: string) {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.lists = [];
    this.projectId = projectId;
  }

  async getLists() {
    try {
      //Get  all Lists from Database
      let listsDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("lists")
        .get();

      //Normalize all subtask
      listsDB.forEach((listDB) => {
        let subtask: ListType = {
          name: listDB.data().name,
          color: listDB.data().color,
          id: listDB.id,
        };

        this.lists.push(subtask);
      });

      return this.lists;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async addList(ListName: string, color: string) {
    try {
      //Get all the Subtasks from Database
      let listDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("lists")
        .add({ name: ListName, color: color })
        .then((data) => data.get());

      const newList = {
        name: listDB.data()?.subtask,
        color: listDB.data()?.color,
        id: listDB.id,
      } as ListType;

      return newList;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateList(id: string, name: boolean, color: string) {
    try {
      //Update list in Database
      let listDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("lists")
        .doc(id)
        .update({ name: name, color: color });
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async deleteList(id: string) {
    try {
      //Delete list from Database
      let subTaskDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("lists")
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
