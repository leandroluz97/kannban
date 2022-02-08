import firebase from "../config/firebase-config";
import { toast } from "react-toastify";

interface ProjectType {
  name: string;
  group: string;
  id: string;
  isActive: boolean;
  createdAt: string;
}

interface ProjectSelectedType {
  name: string;
  id: string;
  isActive: boolean;
  createdAt: string;
}

export default class Projects {
  db: firebase.firestore.Firestore;
  user: firebase.User | null;
  projects: ProjectType[];

  constructor() {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.projects = [];
  }

  async getProjects() {
    try {
      //Get all Projects from Database
      let projectsDB = await this.db.collection("users").doc(this.user?.uid).collection("projects").get();

      //Normalize Project data
      projectsDB.forEach((projectDB) => {
        let project: ProjectType = {
          name: projectDB.data().name,
          group: projectDB.data().group,
          isActive: projectDB.data().isActive,
          createdAt: projectDB.data().createdAt,
          id: projectDB.id,
        };

        this.projects.push(project);
      });

      return this.projects;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async getProject(id: string) {
    try {
      //Get ONE PROJECT from Database
      let projectDB = await this.db.collection("users").doc(this.user?.uid).collection("projects").doc(id).get();

      //new Project from database data
      const project = {
        name: projectDB.data()?.name,
        id: projectDB.id,
        isActive: projectDB.data()?.isActive,
        createdAt: projectDB.data()?.createdAt,
      };

      return project;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async addProject(project: string, group: string) {
    try {
      //Add Project to Database
      let projectDB = await this.db
        .collection("users")
        .doc(this.user?.uid)
        .collection("projects")
        .add({ name: project, isActive: true, group: group, createdAt: "ffff" })
        .then((data) => data.get());

      // new Project from database data
      const newProject = {
        name: projectDB.data()?.name,
        group: projectDB.data()?.group,
        isActive: projectDB.data()?.isActive,
        createdAt: projectDB.data()?.createdAt,
        id: projectDB.id,
      } as ProjectType;

      return newProject;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async updateProject(id: string, name: string) {
    try {
      //Get all the Subtasks from Database
      let projectDB = await this.db.collection("users").doc(this.user?.uid).collection("projects").doc(id).update({ name: name });

      //Normalize all subtask
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async archiveProject(id: string) {
    try {
      //Get all the Subtasks from Database
      let projectDB = await this.db.collection("users").doc(this.user?.uid).collection("projects").doc(id).update({ isActive: false });

      //Normalize all subtask
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async restoreProject(id: string) {
    try {
      //Get all the Subtasks from Database
      let projectDB = await this.db.collection("users").doc(this.user?.uid).collection("projects").doc(id).update({ isActive: true });

      //Normalize all subtask
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async getArchivedProjects() {
    try {
      //Get all Projects from Database
      let projectsDB = await this.db.collection("users").doc(this.user?.uid).collection("projects").where("isActive", "==", false).get();

      //Normalize Project data
      projectsDB.forEach((projectDB) => {
        let project: ProjectType = {
          name: projectDB.data().name,
          group: projectDB.data().group,
          isActive: projectDB.data().isActive,
          createdAt: projectDB.data().createdAt,
          id: projectDB.id,
        };

        this.projects.push(project);
      });

      return this.projects;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async deleteProject(id: string) {
    try {
      //Delete Project  from Database
      let subTaskDB = await this.db.collection("users").doc(this.user?.uid).collection("projects").doc(id).delete();
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
}
