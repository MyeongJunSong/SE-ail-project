import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "./Components/ProjectPage/ProjectPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import CanbanPage from "./Components/CanbanPage/CanbanPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/canban" element={<CanbanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
