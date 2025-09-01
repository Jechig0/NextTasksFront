import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardDetail } from "../interfaces/boardDetail";
import { fetchBoardDetailMock, createListMock, createTaskMock, moveTaskMock } from "../services/mocks/boardDetail.mock";
import { ListColumn } from "../components/ListColumn";
import { useParams } from "react-router-dom";


export const BoardView: React.FC<{ boardId?: string }> = () => {
const { id } = useParams<{ id: string }>();  const boardId = id ?? "1"; 
const [board, setBoard] = useState<BoardDetail | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
setLoading(true);
fetchBoardDetailMock(boardId).then((b) => setBoard(b)).catch(console.error).finally(() => setLoading(false));
}, [boardId]);


const handleAddList = async () => {
const name = prompt('Nombre de la lista')?.trim();
if (!name) return;
const newList = await createListMock(boardId, name);
setBoard((prev) => prev ? { ...prev, lists: [...prev.lists, newList] } : prev);
};


const handleAddTask = async (listId: string, title: string) => {
const task = await createTaskMock(boardId, listId, title);
setBoard((prev) => {
if (!prev) return prev;
return {
...prev,
tasks: { ...prev.tasks, [task.id]: task },
lists: prev.lists.map((l) => l.id === listId ? { ...l, taskIds: [task.id, ...l.taskIds] } : l)
};
});
};


const onDragEnd = async (result: DropResult) => {
if (!result.destination || !board) return;
const { source, destination, draggableId } = result;
if (source.droppableId === destination.droppableId && source.index === destination.index) return;


// Optimistic UI update
setBoard((prev) => {
if (!prev) return prev;
const newLists = prev.lists.map((l) => ({ ...l, taskIds: [...l.taskIds] }));
const sourceList = newLists.find((l) => l.id === source.droppableId)!;
const destList = newLists.find((l) => l.id === destination.droppableId)!;
// remove
sourceList.taskIds.splice(source.index, 1);
// insert
destList.taskIds.splice(destination.index, 0, draggableId);
return { ...prev, lists: newLists };
});

try {
await moveTaskMock(boardId, source.droppableId, destination.droppableId, draggableId, destination.index);
} catch (e) {
console.error(e);
// En caso de error podrías recargar desde el mock
const fresh = await fetchBoardDetailMock(boardId);
setBoard(fresh);
}
};


if (loading || !board) return <div>Cargando tablero...</div>;


return (
    <div className="p-6 min-h-screen bg-gray-50">
    <div className="flex justify-between items-center mb-6">
    <div>
    <h1 className="text-2xl font-bold">{board.name}</h1>
    {board.description && <div className="text-sm text-gray-600">{board.description}</div>}
    </div>
    <div>
    <button onClick={handleAddList} className="px-3 py-2 rounded bg-sky-600 text-white">+ Añadir lista</button>
    </div>
    </div>
    
    
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="flex gap-4 overflow-auto pb-6">
    {board.lists.map((list) => (
    <ListColumn key={list.id} list={list} tasks={list.taskIds.map((id) => board.tasks[id])} onAddTask={(title) => handleAddTask(list.id, title)} />
    ))}
    </div>
    </DragDropContext>
    </div>
    );
};