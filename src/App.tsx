import { BrowserRouter as Router } from "react-router-dom";
import Modal from "react-modal";

import "./styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";
import NewTaskModal from "./components/NewTaskModal";
import NewGroupModal from "./components/NewGroupModal";
import DeleteProjectModal from "./components/DeleteProjectModal";
import { ToastContainer } from "react-toastify";

import { AuthProvider, useAuth } from "./hooks/useAuth";
import { UiProvider } from "./hooks/useUi";
import { DataProvider } from "./hooks/useData";
import { useEffect } from "react";
import LoadingState from "./components/LoadingState";
import GroupOptionsModal from "./components/groupOptionModal";
import { NotificationProvider } from "./hooks/useNotifications";

Modal.setAppElement("#root");

function App() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <ToastContainer />
      <UiProvider>
        <DataProvider>
          <NotificationProvider>
            <Router>
              <DeleteProjectModal />
              <NewTaskModal />
              <NewGroupModal />
              <GroupOptionsModal />
              <Routes />
            </Router>
          </NotificationProvider>
        </DataProvider>
      </UiProvider>
    </>
  );
}

export default App;
