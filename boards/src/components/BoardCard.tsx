import React from "react";
import { Board } from "../interfaces/board";
import { deleteBoard } from "../services/boardsService";

export const BoardCard: React.FC<{ 
    board: Board; 
    onOpen?: (id:number) => void;
    onDelete?: (id:number) => void;
}> = ({ board, onOpen, onDelete }) => {
    
    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que quieres borrar este tablero?')) {
            try {
                await deleteBoard(board.id);
                onDelete?.(board.id);
            } catch (error) {
                console.error('Error al borrar el tablero:', error);
                alert('Error al borrar el tablero');
            }
        }
    };
    
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300/50">
            <div className="card-body p-5">
                {/* Header con icono y menú */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17H7a2 2 0 01-2-2V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2h-8" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-base-content text-lg leading-tight">
                                {board.name}
                            </h3>
                        </div>
                    </div>
                    
                    {/* Dropdown menu */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle hover:bg-base-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow-lg border border-base-300">
                            <li>
                                <button 
                                    onClick={() => handleDelete()}
                                    className="flex items-center gap-2 text-sm text-error hover:bg-error/10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Eliminar
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Descripción */}
                {board.description ? (
                    <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                        {board.description}
                    </p>
                ) : (
                    <p className="text-sm text-base-content/50 italic mb-4">
                        Sin descripción
                    </p>
                )}

                {/* Footer con acciones */}
                <div className="flex items-center justify-between pt-3 border-t border-base-300/30">
                    <button 
                        onClick={() => handleDelete()}
                        className="btn btn-error btn-sm btn-outline hover:scale-105 transition-all duration-200 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                    </button>
                    
                    <button 
                        onClick={() => onOpen?.(board.id)}
                        className="btn btn-primary btn-sm hover:scale-105 transition-all duration-200 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Abrir
                    </button>
                </div>
            </div>
        </div>
    );
};