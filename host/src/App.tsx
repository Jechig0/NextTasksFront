import ReactDOM from "react-dom/client";
import Tasks from "tasks/tasks";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: host</div>
      <div>Framework: react-19</div>
      <Tasks />
    </div>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
