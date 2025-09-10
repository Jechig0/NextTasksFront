import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";

const App = () => (
  <div className="">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
