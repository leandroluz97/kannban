import { BrowserRouter as Router } from "react-router-dom";
import Modal from "react-modal";

import "./styles/global.scss";

import Routes from "./routes";
import NewTaskModal from "./components/NewTaskModal";
import NewGroupModal from "./components/NewGroupModal";
import DeleteProjectModal from "./components/DeleteProjectModal";

import { AuthProvider, useAuth } from "./hooks/useAuth";
import { UiProvider } from "./hooks/useUi";
import { DataProvider } from "./hooks/useData";
import { useEffect } from "react";
import LoadingState from "./components/LoadingState";

Modal.setAppElement("#root");

function App() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <UiProvider>
        <DataProvider>
          <Router>
            <DeleteProjectModal />
            <NewTaskModal />
            <NewGroupModal />
            <Routes />
          </Router>
        </DataProvider>
      </UiProvider>
    </>
  );
}

export default App;
