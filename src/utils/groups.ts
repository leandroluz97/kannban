import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface GroupType {
  name: string;
  id: string;
  createdAt: Date;
}

export default class Groups {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  groups: GroupType[];

  constructor() {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.groups = [];
  }

  async getGroups() {
    try {
      //Get all Groups from Database
      let groupsDB = await this.db.collection("users").doc(this.user?.uid).collection("groups").get();

      //Normalize  group  data
      groupsDB.forEach((groupDB) => {
        let subtask: GroupType = {
          name: groupDB.data().name,
          createdAt: groupDB.data()?.createdAt ? new Date(groupDB.data()?.createdAt.toDate().getTime()) : new Date(),
          id: groupDB.id,
        };

        this.groups.push(subtask);
      });

      return this.groups;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async addGroup(groupName: string) {
    const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    try {
      //Add group to Database
      let groupsDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("groups")
        .add({ name: groupName, createdAt: createdAt })
        .then((group) => group.get());

      //new group from database data
      const newGroup = {
        name: groupsDB.data()?.name,
        createdAt: groupsDB.data()?.createdAt ? new Date(groupsDB.data()?.createdAt.toDate().getTime()) : new Date(),
        id: groupsDB.id,
      } as GroupType;

      return newGroup;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateGroup({ id, name }: { id: string; name: string }) {
    try {
      //Update Task in Database
      this.db.collection("users").doc(this.user?.uid).collection("groups");
      await this.db.collection("users").doc(this.user?.uid).collection("groups").doc(id).update({
        name: name,
      });
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
      console.log(error);
    }
  }

  async deleteGroup(id: string) {
    try {
      //Add group to Database
      let groupsDB = await this.db.collection("users").doc(this.user?.uid).collection("groups").doc(id).delete();
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
}
