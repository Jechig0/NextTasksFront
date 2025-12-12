import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "tasks/tasks";
import Auth from "auth/auth";
import Boards from "boards/boards";
import DashBoard from "dashboard/dashboard";
import LandingPage from "./components/LandingPage";
import AuthGuard from "./Guards/AuthGuard";
import GuestGuard from "./Guards/GuestGuard";
import { AuthProvider, useAuthContext } from "./context/AuthContext";

import "./index.css";

const AppRoutes = () => {
  const { user } = useAuthContext();

  return (
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
              <Tasks userId={user?.id ?? 1} />
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
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
