import { ErrorResponse } from "../interfaces/errorResponse.interface";
import { Task, TaskRequest } from "../interfaces/task.interface";

const baseUrl = 'http://localhost:8080';

export const getTaskById = async (taskId: number): Promise<Task> => {
    const response = await fetch(`${baseUrl}/tasks/details/${taskId}`);
    if (!response.ok) {
        try {
            // Intentar obtener el mensaje de error del backend
            const errorData: ErrorResponse = await response.json();
            console.log("Error fetching task:", errorData.message);
            throw new Error(errorData.message);
        } catch (parseError) {
            // Si no se puede parsear la respuesta, usar el statusText
            console.log("Error fetching task:", response.statusText);
            throw new Error("Failed to fetch task");
        }
    }
    const data = await response.json() as Task;
    return data;
};

export const createTask = async (taskData: TaskRequest): Promise<Task> => {
    const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        try {
            // Intentar obtener el mensaje de error del backend
            const errorData: ErrorResponse = await response.json();
            console.log("Error creating task:", errorData.message);
            throw new Error(errorData.message);
        } catch (parseError) {
            // Si no se puede parsear la respuesta, usar el statusText
            console.log("Error creating task:", response.statusText);
            throw new Error("Failed to create task");
        }
    }

    const data = await response.json() as Task;
    return data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
    const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        try {
            // Intentar obtener el mensaje de error del backend
            const errorData: ErrorResponse = await response.json();
            console.log("Error deleting task:", errorData.message);
            throw new Error(errorData.message);
        } catch (parseError) {
            // Si no se puede parsear la respuesta, usar el statusText
            console.log("Error deleting task:", response.statusText);
            throw new Error("Failed to delete task");
        }
    }
};
