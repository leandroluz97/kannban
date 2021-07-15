import Routes from "./routes";
import "./styles/global.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
