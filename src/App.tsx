import Routes from "./routes";
import "./styles/global.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { UiProvider } from "./hooks/useUi";
import Modal from "react-modal";
import NewTaskModal from "./components/NewTaskModal";
import NewGroupModal from "./components/NewGroupModal";

Modal.setAppElement("#root");

function App() {
  return (
    <AuthProvider>
      <UiProvider>
        <Router>
          <>
            <NewTaskModal />
            <NewGroupModal />
            <Routes />
          </>
        </Router>
      </UiProvider>
    </AuthProvider>
  );
}

export default App;
