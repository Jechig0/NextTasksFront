import { Column } from "./column";

export interface Board {
  id: number;
  name: string;
  colorCode?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: number;
  columns?: Column[];
}