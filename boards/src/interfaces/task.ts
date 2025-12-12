export interface Task {
    id: number;
    title: string;
    description?: string;
    columnId: number;
    completionDate?: Date;
    dueDate?: Date;
}