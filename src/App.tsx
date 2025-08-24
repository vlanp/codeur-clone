import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import ProjectsPage from "./app/projects";
import ProjectPage from "./app/projects/project";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
