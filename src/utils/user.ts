import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface User {
  displayName: string;
  photoURL: string;
  email: string;
  userId?: string;
  firstName?: string | null;
  lastName?: string | null;
}

interface EditSettingsTypes {
  displayname: string;
  firstname: string;
  lastname: string;
  profileImage: string;
}

export default class Users {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;

  constructor() {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
  }

  async getUser() {
    try {
      let docRef = this.db.collection("users").doc(this.user?.uid);
      const doc = await docRef.get();

      return doc.data();
    } catch (error) {
      console.log(error);
    }
  }

  async updateSettings(userInfo: EditSettingsTypes) {
    try {
      //updated user data
      const updatedUserData = {
        displayName: userInfo.displayname ? userInfo.displayname : "",
        photoURL: userInfo.profileImage ? userInfo.profileImage : "",
        firstName: userInfo.firstname ? userInfo.firstname : "",
        lastName: userInfo.lastname ? userInfo.lastname : "",
      };

      //set new user information in firestore
      let docRef = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .update(updatedUserData);

      return updatedUserData;
    } catch (error) {
      console.log(error);
    }
  }
}
