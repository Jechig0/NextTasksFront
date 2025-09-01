import ReactDOM from "react-dom/client";

import "./index.css";
import { TaskDetails } from "./components/taskDetails";

const App = () => (
  <div className="min-h-screen w-full relative bg-gradient-to-br from-blue-100 to-purple-100">
    {/* Fondo con blur */}
    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
    
    {/* Contenido centrado */}
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
        <TaskDetails taskId={2}/>
      </div>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);