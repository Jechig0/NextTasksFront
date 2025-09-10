import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "tasks/tasks";
import Auth from "auth/auth";
import Boards from "boards/boards";
import DashBoard from "dashboard/dashboard";
import LandingPage from "./components/LandingPage";

import "./index.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/tasks/*" element={<Tasks />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Boards />} />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
