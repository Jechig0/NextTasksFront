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
        <div className="p-6 min-h-screen bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{board.name}</h1>
                    {board.description && 
                        <div className="text-sm text-gray-600 mt-1">{board.description}</div>
                    }
                </div>
                <button className="btn btn-accent" onClick={()=>navigate(`/boards`)}> Vovler </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 overflow-x-auto pb-6">
                    {columns.map((column) => (
                        <ListColumn 
                            key={column.id} 
                            list={column}
                            onEditTask={handleEditTask}
                        />
                    ))}
                    
                    <div className="w-72 flex-shrink-0">
                        {isAddingList ? (
                            <div className="bg-white p-3 rounded-lg shadow">
                                <input
                                    type="text"
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    placeholder="List name"
                                    className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    autoFocus
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddColumn}
                                        className="px-3 py-1.5 rounded bg-sky-600 text-white hover:bg-sky-700 flex-grow"
                                    >
                                        Añadir
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAddingList(false);
                                            setNewListName("");
                                        }}
                                        className="px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-100"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingList(true)}
                                className="w-full p-3 rounded-lg bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 shadow text-left transition-colors"
                            >
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
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
    );
}