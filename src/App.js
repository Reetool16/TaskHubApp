import LoginPage from "./components/login/index";
import SignupPage from "./components/signup/index";
import Kanban from "./components/home/index";

import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/taskboard" element={<Kanban />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
