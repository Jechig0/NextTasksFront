import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from "react-router-dom";

import "./index.css";
import { TaskDetails } from "./components/taskDetails";
import { NewTask } from "./components/newTask";

// Componente wrapper para TaskDetails que obtiene el ID de la URL
const TaskDetailsWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const taskId = id ? parseInt(id, 10) : 0;
  
  return <TaskDetails taskId={taskId} />;
};

const HomeComponent = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Bienvenido a Tasks</h1>
      <p className="text-gray-600">Selecciona una opción para continuar</p>
      <button className="btn btn-primary mt-4" onClick={() => navigate("/new")}>Crear nueva tarea</button>
      <button className="btn btn-primary mt-4 ml-2" onClick={() => navigate("/details/2")}>Ir a Tarea2</button>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen w-full relative bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Fondo con blur */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <Routes>
            <Route path="/details/:id" element={<TaskDetailsWrapper />} />
            <Route path="/new" element={<NewTask />} />
            <Route path="/" element={<HomeComponent />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);