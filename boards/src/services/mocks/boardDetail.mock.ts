import { BoardDetail } from "../../interfaces/boardDetail";
import { ListColumn } from "../../interfaces/listColumn";
import { Task } from "../../interfaces/task";

const now = () => new Date().toISOString();


// Estado en memoria (simula una única board para pruebas)
let boardDetail: BoardDetail = {
id: "1",
name: "Demo Board",
description: "Board de ejemplo con listas y tareas (mock)",
lists: [
{ id: "list-1", name: "To Do", taskIds: ["task-1", "task-2"] },
{ id: "list-2", name: "In Progress", taskIds: ["task-3"] },
{ id: "list-3", name: "Done", taskIds: [] },
],
tasks: {
"task-1": { id: "task-1", title: "Diseñar header", description: "Diseñar el header responsive", createdAt: now() },
"task-2": { id: "task-2", title: "Crear API mock", description: "Mock de endpoints para front", createdAt: now() },
"task-3": { id: "task-3", title: "Configurar CI", description: "Pipeline básico en GitHub Actions", createdAt: now() },
}
};


function delay(ms = 300) {
return new Promise((res) => setTimeout(res, ms));
}

export async function fetchBoardDetailMock(boardId: string): Promise<BoardDetail> {
await delay(300);
if (boardDetail.id !== boardId) throw new Error("Board no encontrado");
// devolvemos copia profunda para evitar mutaciones externas accidentales
return JSON.parse(JSON.stringify(boardDetail));
}


export async function createListMock(boardId: string, name: string): Promise<ListColumn> {
await delay(200);
const newList: ListColumn = { id: `list-${Date.now()}`, name, taskIds: [] };
boardDetail.lists.push(newList);
return JSON.parse(JSON.stringify(newList));
}


export async function createTaskMock(boardId: string, listId: string, title: string, description?: string): Promise<Task> {
await delay(200);
const id = `task-${Date.now()}`;
const newTask: Task = { id, title, description, createdAt: now() };
boardDetail.tasks[id] = newTask;
const list = boardDetail.lists.find((l) => l.id === listId);
if (!list) throw new Error("Lista no encontrada");
list.taskIds.unshift(id);
return JSON.parse(JSON.stringify(newTask));
}


export async function moveTaskMock(boardId: string, sourceListId: string, destListId: string, taskId: string, destIndex: number): Promise<void> {
await delay(100);
const source = boardDetail.lists.find((l) => l.id === sourceListId);
const dest = boardDetail.lists.find((l) => l.id === destListId);
if (!source || !dest) throw new Error("Lista origen o destino no encontrada");
// quitar de origen
source.taskIds = source.taskIds.filter((id) => id !== taskId);
// insertar en destino
dest.taskIds.splice(destIndex, 0, taskId);
}