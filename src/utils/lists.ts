import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface ListType {
  name: string;
  id: string;
  color: string;
  position: number;
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
      let listsDB = await this.db.collection("users").doc(this.user?.uid).collection("projects").doc(this.projectId).collection("lists").get();

      //Normalize all subtask
      listsDB.forEach((listDB) => {
        let list: ListType = {
          name: listDB.data().name,
          color: listDB.data().color,
          id: listDB.id,
          position: listDB.data().position,
        };

        this.lists.push(list);
      });

      return this.lists;
    } catch (error: any) {
      return new Error(error.message as string);
    }
  }

  async addList(ListName: string, color: string, position: number) {
    try {
      //Add List to Database
      let listDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("lists")
        .add({
          name: ListName,
          color: color,
          position: position,
        })
        .then((data) => data.get());

      const newList = {
        name: listDB.data()?.name,
        color: listDB.data()?.color,
        id: listDB.id,
        position: listDB.data()?.position,
      } as ListType;

      return newList;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateList(id: string, name: string, color: string, position: number) {
    try {
      //throw Error("Falha na rede");
      //Update list in Database
      let listDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("lists")
        .doc(id)
        .update({
          name: name,
          color: color,
          position: position,
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  async updatePosition(listsId: any) {
    try {
      for (const listId in listsId) {
        await this.db.collection("users").doc(this.user?.uid).collection("projects").doc(this.projectId).collection("lists").doc(listId).update({
          position: listsId[listId],
        });
      }
    } catch (error: any) {
      console.log(error);
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

  async deleteListBatch() {
    try {
      //Delete list from Database

      const batch = this.db.batch();
      let listRef = await this.db.collection("users").doc(this.user?.uid).collection("projects").doc(this.projectId).collection("lists").get();

      listRef.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      //Normalize all subtask
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
}
