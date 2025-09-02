import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardDetail } from "../interfaces/boardDetail";
import { fetchBoardDetailMock, createListMock, createTaskMock, moveTaskMock } from "../services/mocks/boardDetail.mock";
import { ListColumn } from "../components/ListColumn";
import { useParams } from "react-router-dom";

export const BoardView: React.FC<{ boardId?: string }> = () => {
    const { id } = useParams<{ id: string }>();
    const boardId = id ?? "1";
    const [board, setBoard] = useState<BoardDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState("");


    useEffect(() => {
        setLoading(true);
        fetchBoardDetailMock(boardId).then((b) => setBoard(b)).catch(console.error).finally(() => setLoading(false));
    }, [boardId]);

    const handleEditTask = (taskId: string) => {
        // Here you would integrate with your task microfrontend
        // For example:
        window.dispatchEvent(new CustomEvent('openTaskEditor', { 
            detail: { taskId, boardId }
        }));
    };

    const handleAddList = async () => {
        if (!newListName.trim()) return;
        const newList = await createListMock(boardId, newListName.trim());
        setBoard((prev) => prev ? { ...prev, lists: [...prev.lists, newList] } : prev);
        setNewListName("");
        setIsAddingList(false);
    };


    const handleAddTask = async (listId: string, title: string) => {
        const task = await createTaskMock(boardId, listId, title);
        setBoard((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                tasks: { ...prev.tasks, [task.id]: task },
                lists: prev.lists.map((l) => 
                    l.id === listId 
                        ? { ...l, taskIds: [...l.taskIds, task.id] } // Add to end of list
                        : l
                )
            };
        });
    };


    const onDragEnd = async (result: DropResult) => {
        if (!result.destination || !board) return;
        const { source, destination, draggableId } = result;
        
        // Don't do anything if dropped in same position
        if (source.droppableId === destination.droppableId) {
            console.log("Dropped in same position, no changes made");
            return;
        }

        // Optimistic UI update
        setBoard((prev) => {
            if (!prev) return prev;
            console.log("Updating from", source, "to", destination);

            if (source.droppableId === destination.droppableId) {
                const list = prev.lists.find((l) => l.id === source.droppableId);
                if (!list) return prev;
            }
            
            const newLists = prev.lists.map((list) => {
                if (list.id === source.droppableId) {
                    const newTaskIds = [...list.taskIds];
                    newTaskIds.splice(source.index, 1);
                    return { ...list, taskIds: newTaskIds };
                }
                if (list.id === destination.droppableId) {
                    const newTaskIds = [...list.taskIds];
                    newTaskIds.splice(destination.index, 0, draggableId);
                    return { ...list, taskIds: newTaskIds };
                }
                return list;
            });

            return { ...prev, lists: newLists };
        });

        try {
            await moveTaskMock(
                boardId,
                source.droppableId,
                destination.droppableId,
                draggableId,
                destination.index
            );
        } catch (e) {
            console.error(e);
            // Revert on error
            const fresh = await fetchBoardDetailMock(boardId);
            setBoard(fresh);
        }
    };


    if (loading || !board) return <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>;

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{board.name}</h1>
                    {board.description && 
                        <div className="text-sm text-gray-600 mt-1">{board.description}</div>
                    }
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 overflow-x-auto pb-6">
                    {board.lists.map((list) => (
                        <ListColumn 
                            key={list.id} 
                            list={list} 
                            tasks={list.taskIds.map((id) => board.tasks[id])} 
                            onAddTask={(title) => handleAddTask(list.id, title)}
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
                                    placeholder="Nombre de la lista"
                                    className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    autoFocus
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddList}
                                        className="px-3 py-1.5 rounded bg-sky-600 text-white hover:bg-sky-700 flex-grow"
                                    >
                                        Añadir lista
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
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Añadir nueva lista
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};