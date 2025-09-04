export interface Column {
id: number;
name: string;
boardId: number; 
tasksId?: number[]; // orden de tasks
}