import { Board } from "../interfaces/board";
import { Column } from "../interfaces/column";

const API_BASE = 'http://localhost:8080';

export async function fetchBoards(id?:number, token?: string): Promise<Board[]> {
    const userId = id ? id : 1;
    const res = await fetch(`${API_BASE}/boards/owner/${userId}`, {
        headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!res.ok) throw new Error('Error fetching boards');
    return res.json();
}

export async function fetchBoard (boardId: number): Promise<Board> {
    const response = await fetch(`${API_BASE}/boards/${boardId}`);
    if (!response.ok) throw new Error('Failed to fetch board');
    return response.json();
};


export async function createBoard(payload: {colorCode?:string, description: string, name: string, owner?: {id: number} }, token?: string): Promise<Board> {
    payload.colorCode = payload.colorCode ? payload.colorCode : "#FFFFFF";
    payload.owner = payload.owner ? payload.owner : {id: 1};
    console.log(payload)
    const res = await fetch(`${API_BASE}/boards/new`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
    body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Error creating board');
    return res.json();
}

export async function fetchListColumns(boardId: number, token?: string): Promise<Column[]> {
    const res = await fetch(`${API_BASE}/boards/${boardId}/columns`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!res.ok) throw new Error('Error fetching list columns');
    return res.json();
}

export async function createListColumn(payload: { name: string, board: {id: number} } ,token?: string): Promise<Column> {
    payload.board = payload.board ? payload.board : {id: 1};
    const boardId = payload.board.id
    const res = await fetch(`${API_BASE}/boards/${boardId}/columns/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Error creating list column');
    return res.json();
}