import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import ProjectsPage from "./app/projects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
