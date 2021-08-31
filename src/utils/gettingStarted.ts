import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface StartedType {
  title: string;
  cover: string;
  icon: string;
  text: string;
}

export default class Started {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  started: StartedType;

  constructor() {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.started = {} as StartedType;
  }

  async getGettingStarted() {
    try {
      //Get getting started text from Database
      let gettingStartedDB = await this.db.collection("started").get();

      //Normalize all subtask
      gettingStartedDB.forEach((started) => {
        let gettingStarted: StartedType = {
          title: started.data().title,
          icon: started.data().icon,
          cover: started.data().cover,
          text: started.data().text,
        };

        this.started = gettingStarted;
      });

      return this.started;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });

      console.log(error);
    }
  }
}
