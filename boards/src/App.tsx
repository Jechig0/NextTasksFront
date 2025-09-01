import ReactDOM from "react-dom/client";

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BoardList } from './components/BoardList';

import "./index.css";


const Home: React.FC = () => {
// token could come from a global window.__AUTH or similar provided by host
const token = (window as any).__TOKEN as string | undefined;
return <BoardList token={token} onOpenBoard={(id) => alert(`Abrir tablero ${id}`)} />;
};

const App = () => (
  <BrowserRouter>
    <div className="p-6 min-h-screen bg-gray-50">
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);