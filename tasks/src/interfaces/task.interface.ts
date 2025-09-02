export interface Task {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  priority: number;
  completionDate?: Date;
  board: Board;
  tags: Tag[];
}

export interface TaskRequest {
  title: string;
  description: string;
  dueDate: string; // En formato ISO string para enviar al backend
  priority: number;
  completionDate?: string |null;
  boardId: number;
  tagIds?: number[]; // IDs de las etiquetas opcionales
}

export interface Board {
  id: number;
  name: string;
  description: string;
  colorCode: string;
  owner: Owner;
}

export interface Owner {
  id: number;
  fullName: string;
  username: string;
  email: string;
}

export interface Tag {
  id: number;
  name: string;
  colorCode: string;
  owner: Owner;
}
