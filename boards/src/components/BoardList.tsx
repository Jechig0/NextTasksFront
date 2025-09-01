import React, { useEffect, useState } from 'react';
import { Board } from '../interfaces/board';
//import { fetchBoards, createBoard } from '../services/boardsService';
import { fetchBoardsMock as fetchBoards, createBoardMock as createBoard } from "../services/boardsService.mock";
import { BoardCard } from './BoardCard';


export const BoardList: React.FC<{ token?: string; onOpenBoard?: (id: string) => void }> = ({ token, onOpenBoard }) => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
    setLoading(true);
    fetchBoards()
    .then((b) => setBoards(b))
    .catch((e) => setError(String(e)))
    .finally(() => setLoading(false));
    }, [token]);


const handleCreate = async () => {
    const name = prompt('Nombre del tablero')?.trim();
    if (!name) return;
    const description = prompt('Descripción del tablero')?.trim();
    try {
        const newBoard = await createBoard({ name, description });
        setBoards((s) => [newBoard, ...s]);
    } catch (e) {
        alert('Error creando tablero');
    }
};


if (loading) return <div>Cargando tableros...</div>;
if (error) return <div className="text-red-600">{error}</div>;


return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Mis tableros</h2>
        <button onClick={handleCreate} className="px-3 py-1 rounded bg-green-600 text-white">
          Nuevo tablero
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((b) => (
          <BoardCard key={b.id} board={b} onOpen={onOpenBoard} />
        ))}
      </div>
    </div>
  );
};