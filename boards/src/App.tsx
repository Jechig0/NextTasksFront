import ReactDOM from "react-dom/client";

import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { BoardList } from './components/BoardList';
import BoardView from "./views/BoardView";
import "./index.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return <BoardList onOpenBoard={(id) => navigate(`/boards/${id}`)} />;
};

const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: number }>(); // 👈 forzamos tipado
  if (!id) return <div>Board ID no proporcionado</div>;
  return <BoardView boardId={(id)} />;
};

const App = () => (
  <BrowserRouter>
    <div className="p-6 min-h-screen bg-gray-50">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/boards/:id" element={<BoardPage />} />
    </Routes>
    </div>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);