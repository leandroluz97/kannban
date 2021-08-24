import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface GroupType {
  name: string;
  id: string;
  createdAt: string;
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
      let groupsDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("groups")
        .get();

      //Normalize  group  data
      groupsDB.forEach((groupDB) => {
        let subtask: GroupType = {
          name: groupDB.data().name,
          createdAt: groupDB.data().createdAt,
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
    try {
      //Add group to Database
      let groupsDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("groups")
        .add({ name: groupName, createdAt: "vv" })
        .then((group) => group.get());

      //new group from database data
      const newGroup = {
        name: groupsDB.data()?.name,
        createdAt: groupsDB.data()?.createdAt,
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
}
