import { ErrorResponse } from "../interfaces/errorResponse.interface";
import { Task } from "../interfaces/task.interface";

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
