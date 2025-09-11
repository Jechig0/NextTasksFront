import { Board } from "../interfaces/board";
import { Column } from "../interfaces/column";
import { Task } from "../interfaces/task";

const API_BASE = "http://localhost:8080";

export async function fetchBoards(id?: number): Promise<Board[]> {
  const token = sessionStorage.getItem("authToken") || undefined;
  const userId = id ? id : 1;
  const res = await fetch(`${API_BASE}/boards/owner/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Error fetching boards");
  return res.json();
}

export async function fetchBoard(boardId: number): Promise<Board> {
    const token = sessionStorage.getItem("authToken") || undefined;

  const res = await fetch(`${API_BASE}/boards/${boardId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
}

export async function createBoard(payload: {
  colorCode?: string;
  description: string;
  name: string;
  owner?: { id: number };
}): Promise<Board> {
  payload.colorCode = payload.colorCode ? payload.colorCode : "#FFFFFF";
  payload.owner = payload.owner ? payload.owner : { id: 1 };
  const token = sessionStorage.getItem("authToken") || undefined;
  console.log(payload);
  const res = await fetch(`${API_BASE}/boards/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error creating board");
  return res.json();
}

export async function fetchListColumns(boardId: number): Promise<Column[]> {
  const token = sessionStorage.getItem("authToken") || undefined;

  const res = await fetch(`${API_BASE}/boards/${boardId}/columns`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Error fetching list columns");
  return res.json();
}

export async function createListColumn(payload: {
  name: string;
  board: { id: number };
}): Promise<Column> {
  const boardId = payload.board.id;
  const token = sessionStorage.getItem("authToken") || undefined;

  const res = await fetch(`${API_BASE}/boards/${boardId}/columns/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error creating list column");
  return res.json();
}

export async function fetchTasks(columnId: number): Promise<Task[]> {
  const token = sessionStorage.getItem("authToken") || undefined;

  const res = await fetch(`${API_BASE}/tasks/${columnId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Error fetching tasks");
  return res.json();
}

export async function createTask(
  title: string,
  column: { id: number }
): Promise<Task> {
  const token = sessionStorage.getItem("authToken") || undefined;

  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ title, column }),
  });
  if (!res.ok) throw new Error("Error creating task");
  return res.json();
}

export async function updateTaskPosition(
  taskId: number,
  columnId: number
): Promise<void> {
  const token = sessionStorage.getItem("authToken") || undefined;

  const res = await fetch(`${API_BASE}/tasks/${taskId}/column/${columnId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Error updating task position");
}

export async function deleteBoard(boardId: number): Promise<void> {
  const token = sessionStorage.getItem("authToken") || undefined;

  const res = await fetch(`${API_BASE}/boards/inactive/${boardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Error deleting board");
}
