import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {useNavigate} from "react-router-dom";
import { ListColumn } from "../components/ListColumn";
import { Column } from "../interfaces/column";
import { Board } from "../interfaces/board";
import { createListColumn, fetchBoard, fetchListColumns, updateTaskPosition } from "../services/boardsService";

export default function BoardView({ boardId }: { boardId: number }) {
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState<Board | null>(null);
    const [columns, setColumns] = useState<Column[]>([]);
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const loadBoardData = async () => {
            try {
                setLoading(true);
                const boardData = await fetchBoard(boardId);
                const columnsData = await fetchListColumns(boardId);
                setBoard(boardData);
                setColumns(columnsData);
            } catch (error) {
                console.error('Error loading board data:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadBoardData();
    }, [boardId, refreshKey]);

    const handleEditTask = (taskId: number) => {
        window.dispatchEvent(new CustomEvent('openTaskEditor', { 
            detail: { taskId, boardId }
        }));
    };

    const handleAddColumn = async () => {
        if (!newListName.trim() || !board) return;

        try {
            const newColumn = await createListColumn({ 
                name: newListName,
                board: { id: board.id }
            });
            
            setColumns([...columns, newColumn]);
            setIsAddingList(false);
            setNewListName("");
        } catch (error) {
            console.error('Error creating column:', error);
        }
    };

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return;
        
        const { source, destination, draggableId } = result;
        
        if (source.droppableId === destination.droppableId && 
            source.index === destination.index) {
            return;
        }

        try {
            // Here you would implement the API call to update task position
            await updateTaskPosition(Number(draggableId), Number(destination.droppableId));

            // For now, we'll just update the local state
            // This should be replaced with the actual response from the backend
            setRefreshKey(prev => prev + 1);

        } catch (error) {
            console.error('Error updating task position:', error);
            // Refresh the columns data from the server in case of error
            const columnsData = await fetchListColumns(boardId);
            setColumns(columnsData);
            setRefreshKey(prev => prev + 1);
        }
    };

    if (loading || !board) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
    );

    return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-yellow-950">
        <div className="bg-white/95 backdrop-blur-sm shadow-lg bg-">
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                            {board.name}
                        </h1>
                        {board.description && 
                            <div className="text-gray-600 mt-2 font-medium">{board.description}</div>
                        }
                    </div>
                    <button 
                        className="btn btn-accent btn-outline hover:scale-105 transition-all duration-200" 
                        onClick={()=>navigate(`/boards`)}
                    >
                        ← Volver a Tableros
                    </button>
                </div>
            </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto p-6">
                        <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6 overflow-x-auto pb-6 pt-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    {columns.map((column) => (
                        <ListColumn 
                            key={column.id} 
                            list={column}
                            onEditTask={handleEditTask}
                        />
                    ))}
                    
                    {/* Nueva lista */}
                    <div className="w-80 flex-shrink-0">
                        {isAddingList ? (
                            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                                <input
                                    type="text"
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    placeholder="Nombre de la lista"
                                    className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    autoFocus
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddColumn}
                                        className="btn btn-primary flex-grow"
                                    >
                                        Añadir lista
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAddingList(false);
                                            setNewListName("");
                                        }}
                                        className="btn btn-ghost"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingList(true)}
                                className="w-full p-4 rounded-xl bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 shadow-md hover:shadow-lg border border-white/20 text-left transition-all duration-200 hover:scale-105"
                            >
                                <span className="flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Nueva lista
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </DragDropContext>
        </div>
    </div>
    );
}