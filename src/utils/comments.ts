import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface CommentType {
  comment: string;
  id: string;
  createdAt: string;
}

export default class Comments {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  comments: CommentType[];
  taskId: string;

  constructor(taskId: string) {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.comments = [];
    this.taskId = taskId;
  }

  async getComments() {
    try {
      //Get all the Subtasks from Database
      let commentsDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(this.taskId)
        .collection("comments")
        .orderBy("createdAt")
        .get();

      //Normalize all subtask
      commentsDB.forEach((commentDB) => {
        const date = new Date(commentDB.data()?.createdAt.toDate());
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        } as any;

        const createdAt = date.toLocaleDateString("en-EN", options);
        let comment: CommentType = {
          comment: commentDB.data().comment,
          createdAt: createdAt,
          id: commentDB.id,
        };

        this.comments.push(comment);
      });

      console.log(this.comments);

      return this.comments;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async addComment(comment: string) {
    try {
      //Get all the Subtasks from Database
      let commentDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(this.taskId)
        .collection("comments")
        .add({ comment: comment, createdAt: new Date() })
        .then((data) => data.get());

      const date = new Date(commentDB.data()?.createdAt.toDate());
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      } as any;
      const createdAt = date.toLocaleDateString("en-EN", options);

      const newComment = {
        comment: commentDB.data()?.comment,
        createdAt: createdAt,
        id: commentDB.id,
      } as CommentType;

      return newComment;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async deleteComment(id: string) {
    try {
      //Get all the Subtasks from Database
      let commentDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("tasks")
        .doc(this.taskId)
        .collection("comments")
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
