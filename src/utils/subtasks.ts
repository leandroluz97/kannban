import firebase from "../config/firebase-config";

interface SubTaskType {
  subtask: string;
  id: string;
  createdAt: string;
  isDone: boolean;
}

interface AddSubTask {
  subtask: string;
  id: string;
  projectId: string;
  taskId: string;
}

export default class Subtasks {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  subtasks: SubTaskType[];
  projectId: string;
  taskId: string;

  constructor(projectId: string, taskId: string) {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.subtasks = [];
    this.projectId = projectId;
    this.taskId = taskId;
  }

  async getSubtasks() {
    //Get all the Subtasks from Database
    let subTasksDB = await this.db
      .collection("users")
      .doc(this.user?.uid)
      .collection("projects")
      .doc(this.projectId)
      .collection("tasks")
      .doc(this.taskId)
      .collection("subtasks")
      .get();

    //Normalize all subtask
    subTasksDB.forEach((subtaskDB) => {
      let subtask: SubTaskType = {
        subtask: subtaskDB.data().subtask,
        createdAt: subtaskDB.data().createdAt,
        isDone: subtaskDB.data().isDone,
        id: subtaskDB.id,
      };

      this.subtasks.push(subtask);
    });

    return this.subtasks;
  }

  async addSubtask(subtask: string) {
    //Get all the Subtasks from Database
    let subTaskDB = await this.db
      .collection("users")
      .doc(this.user?.uid)
      .collection("projects")
      .doc(this.projectId)
      .collection("tasks")
      .doc(this.taskId)
      .collection("subtasks")
      .add({ subtask: subtask, isDone: false, createdAt: "ffff" })
      .then((data) => data.get());

    const newSubtask = {
      subtask: subTaskDB.data()?.subtask,
      createdAt: subTaskDB.data()?.createdAt,
      isDone: subTaskDB.data()?.isDone,
      id: subTaskDB.id,
    } as SubTaskType;

    return newSubtask;
  }

  async updateSubtask(id: string, isDone: boolean, subtask: string) {
    //Get all the Subtasks from Database
    let subTaskDB = await this.db
      .collection("users")
      .doc(this.user?.uid)
      .collection("projects")
      .doc(this.projectId)
      .collection("tasks")
      .doc(this.taskId)
      .collection("subtasks")
      .doc(id)
      .update({ isDone: subtask });

    //Normalize all subtask
  }

  async deleteSubtask(id: string) {
    //Get all the Subtasks from Database
    let subTaskDB = await this.db
      .collection("users")
      .doc(this.user?.uid)
      .collection("projects")
      .doc(this.projectId)
      .collection("tasks")
      .doc(this.taskId)
      .collection("subtasks")
      .doc(id)
      .delete();

    //Normalize all subtask
  }
}
