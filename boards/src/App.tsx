import ReactDOM from "react-dom/client";

import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { BoardList } from './components/BoardList';
import BoardView from "./views/BoardView";
import "./index.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return <BoardList onOpenBoard={(id) => navigate(`/boards/${id}`)} />;
};

const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 👈 forzamos tipado
  if (!id) return <div>Board ID no proporcionado</div>;
  return <BoardView boardId={Number(id)} />;
};

const App = () => (
  <>
    <div className="p-6 min-h-screen bg-gray-50">
    <Routes>
      <Route path="/boards" element={<Home />} />
      <Route path="/boards/:id" element={<BoardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes> 
    </div>
  </>
);

// Export the App component for Module Federation
export default App;

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<BrowserRouter><App /></BrowserRouter>);