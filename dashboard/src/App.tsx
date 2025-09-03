import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DashBoard from "./components/DashBoard";

import "./index.css";

const App = () => (
  <>
    <DashBoard />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <BrowserRouter>
    
    <App />
  </BrowserRouter>
);
