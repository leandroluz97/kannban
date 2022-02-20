import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface NotificationType {
  id: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  notificationTime: Date;
}

type NotificationAdd = Omit<NotificationType, "id" | "createdAt">;

export default class Notification {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  notifications: NotificationType[];

  constructor() {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.notifications = [];
  }

  async getNotifications() {
    let notificationsDB = await this.db.collection("users").doc(this.user?.uid).collection("notifications").get();

    notificationsDB.forEach((notificationDB) => {
      let notification: NotificationType = {
        id: notificationDB.id,
        description: notificationDB.data().description,
        isActive: notificationDB.data().isActive,
        createdAt: notificationDB.data()?.createdAt ? new Date(notificationDB.data()?.createdAt.toDate().getTime()) : new Date(),
        notificationTime: notificationDB.data()?.notificationTime ? new Date(notificationDB.data()?.notificationTime.toDate().getTime()) : new Date(),
      };

      this.notifications.push(notification);
    });

    return this.notifications;
  }

  async addNotification({ description, isActive, notificationTime }: NotificationAdd) {
    const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    //Add Project to Database
    let notificationDB = await this.db
      .collection("users")
      .doc(this.user?.uid)
      .collection("notifications")
      .add({ description: description, isActive: isActive, createdAt: createdAt, notificationTime: notificationTime })
      .then((data) => data.get());

    // new Project from database data
    const newNotification = {
      id: notificationDB.id,
      description: notificationDB.data()?.description,
      isActive: notificationDB.data()?.isActive,
      createdAt: notificationDB.data()?.createdAt ? new Date(notificationDB.data()?.createdAt.toDate().getTime()) : new Date(),
      notificationTime: notificationDB.data()?.notificationTime ? new Date(notificationDB.data()?.notificationTime.toDate().getTime()) : new Date(),
    } as NotificationType;

    return newNotification;
  }

  async updateNotification({ isActive, id }: { isActive: boolean; id: string }) {
    await this.db.collection("users").doc(this.user?.uid).collection("notifications").doc(id).update({ isActive: isActive });
  }

  async deleteNotification(id: string) {
    await this.db.collection("users").doc(this.user?.uid).collection("notifications").doc(id).delete();
  }
}
