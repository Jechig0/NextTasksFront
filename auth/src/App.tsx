import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

export default App;

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <BrowserRouter basename="auth">
    <App />
  </BrowserRouter>
);
