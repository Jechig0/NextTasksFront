import React from "react";
import { Board } from "../interfaces/board";

export const BoardCard: React.FC<{ board: Board; onOpen?: (id:number) => void}> = ({ board, onOpen }) => {
return (
    <div className="p-4 rounded-lg shadow-sm bg-white">
        <h3 className="text-lg font-semibold">{board.name}</h3>
    {board.description && <p className="text-sm mt-1 text-gray-600">{board.description}</p>}
    <div className="mt-3 flex justify-end">
    <button
        onClick={() => onOpen?.((board.id))}
        className="px-3 py-1 rounded bg-sky-500 hover:bg-sky-900 text-white text-sm"
    >
    Abrir
    </button>
    <button
        onClick={() => alert('Funcionalidad de editar no implementada')}
        className="ml-2 px-3 py-1 rounded bg-red-500 text-sm text-white hover:bg-red-700"
    >
        Borrar
    </button>
        </div>
    </div>
);
};