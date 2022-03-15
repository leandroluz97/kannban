import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/datePicker.scss";
import "./styles/dropdown.scss";
// import "react-dropdown/style.css";
import { AuthProvider } from "./hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
