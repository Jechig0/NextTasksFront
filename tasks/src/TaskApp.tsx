import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";

import "./index.css";
import { TaskDetails } from "./components/tasks/taskDetails";
import NewTag from "./components/tags/newTag";
import AddTagToTask from "./components/tags/addTagToTask";
import EditTask from "./components/tasks/editTask";

// Componente wrapper para TaskDetails que obtiene el ID de la URL
const TaskDetailsWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const taskId = id ? parseInt(id, 10) : 0;
  
  return <TaskDetails taskId={taskId} />;
};

const TasksApp = () => (
  <div className="min-h-screen w-full relative bg-gradient-to-br from-blue-100 to-purple-100">
    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
    
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
        <Routes>
          <Route path="/details/:id" element={<TaskDetailsWrapper />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/addTag/:taskId" element={<AddTagToTask userId={1} />} />
          <Route path="/tags/new/:taskId" element={<NewTag userId={1} />} />
          <Route path="/tags/edit/:id/:taskId" element={<NewTag userId={1} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default TasksApp;


  const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
  root.render(
    <BrowserRouter basename="/tasks">
      <TasksApp />
    </BrowserRouter>
  );
