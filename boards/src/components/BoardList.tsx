import React, { useEffect, useState } from 'react';
import { Board } from '../interfaces/board';
import { fetchBoards, createBoard } from '../services/boardsService';
//import { fetchBoardsMock as fetchBoards, createBoardMock as createBoard } from "../services/mocks/boardsService.mock";
import { BoardCard } from './BoardCard';


export const BoardList: React.FC<{ token?: string; onOpenBoard?: (id: number) => void }> = ({ token, onOpenBoard }) => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newBoard, setNewBoard] = useState({ name: '', description: '' });

 useEffect(() => {
        setLoading(true);
        fetchBoards()
            .then((b) => {
                // Sort boards by ID before setting state
                if (b.length > 1) {
                    const sortedBoards = [...b].sort((a, b) => a.id - b.id);
                    setBoards(sortedBoards);
                } else{
                    setBoards(b);
                }
            })
            .catch((e) => setError(String(e)))
            .finally(() => setLoading(false));
    }, [token]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBoard.name.trim()) return;
        
        try {
            const created = await createBoard({
                name: newBoard.name.trim(),
                description: newBoard.description.trim()
            });
            // Sort boards when adding new board
            setBoards((prev) => [...prev, created].sort((a, b) => a.id - b.id));
            setIsCreating(false);
            setNewBoard({ name: '', description: '' });
        } catch (e) {
            alert('Error creando tablero');
        }
    };

    const handleDelete = (deletedId: number) => {
        setBoards(prevBoards => prevBoards.filter(board => board.id !== deletedId));
    };


  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  );
    
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;


  return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Mis tableros</h2>
                <button 
                    onClick={() => setIsCreating(true)} 
                    className="px-3 py-1 rounded bg-green-600 hover:bg-green-900 text-white"
                >
                    Nuevo tablero
                </button>
            </div>

            {isCreating && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Crear nuevo tablero</h3>
                        <form onSubmit={handleCreate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={newBoard.name}
                                    onChange={(e) => setNewBoard(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Descripción</label>
                                <textarea
                                    value={newBoard.description}
                                    onChange={(e) => setNewBoard(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setNewBoard({ name: '', description: '' });
                                    }}
                                    className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
                                >
                                    Crear tablero
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.map((b) => (
                <BoardCard 
                key={b.id} 
                board={b} 
                onOpen={onOpenBoard}
                onDelete={handleDelete}
                />
                ))}
            </div>
        </div>
    );
};