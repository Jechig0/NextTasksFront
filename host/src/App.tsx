import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "tasks/tasks";
import Auth from "auth/auth";
import Boards from "boards/boards";
import DashBoard from "dashboard/dashboard";
import LandingPage from "./components/LandingPage";
import AuthGuard from "./Guards/AuthGuard";
import GuestGuard from "./Guards/GuestGuard";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuestGuard>
              <LandingPage />
            </GuestGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <DashBoard />
            </AuthGuard>
          }
        />
        <Route
          path="/tasks/*"
          element={
            <AuthGuard>
              <Tasks />
            </AuthGuard>
          }
        />
        <Route
          path="/auth/*"
          element={
            <GuestGuard>
              <Auth />
            </GuestGuard>
          }
        />
        <Route
          path="*"
          element={
            <AuthGuard>
              <Boards />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
