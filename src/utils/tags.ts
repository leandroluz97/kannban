import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface TagType {
  tag: string;
  id: string;
  color: string;
  isActive: boolean;
}

export default class Tags {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  tags: TagType[];
  projectId: string;
  taskId: string;

  constructor(projectId: string, taskId: string) {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.tags = [];
    this.projectId = projectId;
    this.taskId = taskId;
  }

  async getTags() {
    try {
      //Get  Tags from Database
      let tagsDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .doc(this.taskId)
        .collection("tags")
        .get();

      //Normalize tags
      tagsDB.forEach((tagDB) => {
        let tag: TagType = {
          tag: tagDB.data().tag,
          isActive: tagDB.data().isActive,
          color: tagDB.data().color,
          id: tagDB.id,
        };

        this.tags.push(tag);
      });

      return this.tags;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateTag(id: string, isActive: boolean) {
    try {
      //Get all the Subtasks from Database
      let tagsDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .doc(this.projectId)
        .collection("tasks")
        .doc(this.taskId)
        .collection("tags")
        .doc(id)
        .update({ isActive: isActive });
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
}
