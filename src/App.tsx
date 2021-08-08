import { BrowserRouter as Router } from "react-router-dom";
import Modal from "react-modal";

import "./styles/global.scss";

import Routes from "./routes";
import NewTaskModal from "./components/NewTaskModal";
import NewGroupModal from "./components/NewGroupModal";

import { AuthProvider } from "./hooks/useAuth";
import { UiProvider } from "./hooks/useUi";
import { DataProvider } from "./hooks/useData";

Modal.setAppElement("#root");

function App() {
  return (
    <AuthProvider>
      <UiProvider>
        <DataProvider>
          <Router>
            <>
              <NewTaskModal />
              <NewGroupModal />
              <Routes />
            </>
          </Router>
        </DataProvider>
      </UiProvider>
    </AuthProvider>
  );
}

export default App;
