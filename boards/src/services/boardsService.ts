import { Board } from "../interfaces/board";

const API_BASE = 'http://localhost:4000';

export async function fetchBoards(token?: string): Promise<Board[]> {
    const res = await fetch(`${API_BASE}/api/boards`, {
        headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!res.ok) throw new Error('Error fetching boards');
    return res.json();
}


export async function createBoard(payload: { name: string; description?: string }, token?: string): Promise<Board> {
    const res = await fetch(`${API_BASE}/api/boards`, {
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