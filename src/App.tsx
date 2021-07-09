import Routes from "./routes";
import "./styles/global.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes />
      </div>
    </Router>
  );
}

export default App;
