import React, { useEffect, useState } from 'react';
import { Board } from '../interfaces/board';
import { fetchBoards, createBoard } from '../services/boardsService';
//import { fetchBoardsMock as fetchBoards, createBoardMock as createBoard } from "../services/mocks/boardsService.mock";
import { BoardCard } from './BoardCard';
import { useNavigate } from 'react-router-dom';
import { checkStatus } from '../services/statusService';


export const BoardList: React.FC<{ token?: string; onOpenBoard?: (id: number) => void }> = ({ token, onOpenBoard }) => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newBoard, setNewBoard] = useState({ name: '', description: '' });

    const navigate = useNavigate();

 useEffect(() => {
        setLoading(true);
        checkStatus().then(res => {
            if (!res) {
                navigate('/auth/login');
                return;
            }
            // Usar res.id directamente en lugar de idUser
            return fetchBoards(res.id);
        })
        .then((b) => {
            if (b) {
                // Sort boards by ID before setting state
                if (b.length > 1) {
                    const sortedBoards = [...b].sort((a, b) => a.id - b.id);
                    setBoards(sortedBoards);
                } else {
                    setBoards(b);
                }
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
                description: newBoard.description.trim(),
                owner: {id: (await checkStatus()).id}
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
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
        <p className="text-lg font-medium text-base-content/70">Cargando tus tableros...</p>
      </div>
    </div>
  );
    
  if (error) return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="alert alert-error shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Error al cargar los tableros</h3>
            <div className="text-xs">{error}</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );


  return (
        <div className="min-h-screen bg-base-100">
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* Header compacto */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Mis Tableros
                        </h1>
                        <p className="text-base-content/70 text-sm mt-1">
                            {boards.length > 0 ? `${boards.length} tablero${boards.length !== 1 ? 's' : ''} disponible${boards.length !== 1 ? 's' : ''}` : 'Organiza tus proyectos'}
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setIsCreating(true)} 
                            className="btn btn-primary hover:scale-105 transition-all duration-200 shadow-md group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nuevo
                        </button>
                        <button 
                            className="btn btn-ghost hover:scale-105 transition-all duration-200" 
                            onClick={() => navigate(`/dashboard`)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Dashboard
                        </button>
                    </div>
                </div>

            {isCreating && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-base-100 rounded-2xl p-6 w-full max-w-lg shadow-xl animate-in zoom-in duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-base-content">Nuevo Tablero</h3>
                                <p className="text-sm text-base-content/60">Crea un espacio para tu proyecto</p>
                            </div>
                        </div>
                        
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Nombre del tablero</span>
                                </label>
                                <input
                                    type="text"
                                    value={newBoard.name}
                                    onChange={(e) => setNewBoard(prev => ({ ...prev, name: e.target.value }))}
                                    className="input input-bordered w-full focus:input-primary"
                                    placeholder="Ej: Proyecto Web, Marketing Q4..."
                                    autoFocus
                                />
                            </div>
                            
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Descripción</span>
                                    <span className="label-text-alt text-base-content/50">Opcional</span>
                                </label>
                                <textarea
                                    value={newBoard.description}
                                    onChange={(e) => setNewBoard(prev => ({ ...prev, description: e.target.value }))}
                                    className="textarea textarea-bordered w-full focus:textarea-primary resize-none"
                                    rows={2}
                                    placeholder="Describe brevemente el propósito de este tablero..."
                                />
                            </div>
                            
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setNewBoard({ name: '', description: '' });
                                    }}
                                    className="btn btn-ghost"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newBoard.name.trim()}
                                    className="btn btn-primary disabled:opacity-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Crear Tablero
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {boards.length > 0 ? (
                <>

                    {/* Grid de tableros */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {boards.map((b) => (
                            <div 
                                key={b.id} 
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative transform transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1">
                                    <BoardCard 
                                        board={b} 
                                        onOpen={onOpenBoard}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-secondary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-base-content mb-2">¡Comienza tu primer proyecto!</h3>
                    <p className="text-base-content/60 text-center max-w-sm mb-8 leading-relaxed">
                        Los tableros te ayudan a organizar tareas, colaborar con tu equipo y hacer seguimiento del progreso.
                    </p>
                    
                    <button 
                        onClick={() => setIsCreating(true)} 
                        className="btn btn-primary btn-lg hover:scale-105 transition-all duration-200 shadow-lg group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Crear Mi Primer Tablero
                    </button>
                </div>
            )}
        </div>
    </div>
    );
};