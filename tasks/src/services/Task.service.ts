import { ErrorResponse } from "../interfaces/errorResponse.interface";
import { Task } from "../interfaces/task.interface";

const baseUrl = "http://localhost:8080";

export const getTaskById = async (taskId: number): Promise<Task> => {
  const token = localStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tasks/details/${taskId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
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

  // Check if response has content before trying to parse JSON
  const contentType = response.headers.get("content-type");
  const hasJsonContent = contentType && contentType.includes("application/json");
  
  if (!hasJsonContent) {
    throw new Error("Invalid response format: Expected JSON");
  }

  // Check if response body is empty
  const responseText = await response.text();
  if (!responseText.trim()) {
    throw new Error("Empty response from server");
  }

  try {
    const data = JSON.parse(responseText) as Task;
    return data;
  } catch (parseError) {
    console.log("Error parsing JSON response:", parseError);
    throw new Error("Failed to parse server response");
  }
};

export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
  const token = localStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

  // Check if response has content before trying to parse JSON
  const contentType = response.headers.get("content-type");
  const hasJsonContent = contentType && contentType.includes("application/json");
  
  if (!hasJsonContent) {
    throw new Error("Invalid response format: Expected JSON");
  }

  // Check if response body is empty
  const responseText = await response.text();
  if (!responseText.trim()) {
    throw new Error("Empty response from server");
  }

  try {
    const data = JSON.parse(responseText) as Task;
    return data;
  } catch (parseError) {
    console.log("Error parsing JSON response:", parseError);
    throw new Error("Failed to parse server response");
  }
};

export const updateTask = async (
  taskId: number,
  taskData: Partial<Task>
): Promise<Task> => {

  console.log(JSON.stringify(taskData));

  const token = localStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(taskData),
  });

  console.log(response);

  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error updating task:", errorData.message);
      throw new Error(errorData.message);
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error updating task parsing:", response.statusText);
      throw new Error("Failed to update task");
    }
  }

  // Check if response has content before trying to parse JSON
  const contentType = response.headers.get("content-type");
  const hasJsonContent = contentType && contentType.includes("application/json");
  
  // If response is successful but empty (like 204 No Content), return the task data that was sent
  if (!hasJsonContent || response.status === 204) {
        console.log("Empty 1 response from server, returning sent task data");
    return { id: taskId, ...taskData } as Task;
  }

  // Check if response body is empty
  const responseText = await response.text();
  if (!responseText.trim()) {
    console.log("Empty response from server, returning sent task data");
    return { id: taskId, ...taskData } as Task;
  }

  try {
    const data = JSON.parse(responseText) as Task;
    console.log("datos" + JSON.stringify(data));
    return data;
  } catch (parseError) {
    console.log("Error parsing JSON response:", parseError);
    // Return the task data that was sent if parsing fails
    return { id: taskId, ...taskData } as Task;
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  const token = localStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
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

export const addTagToTask = async (
  taskId: number,
  tagId: number
): Promise<void> => {
  const token = localStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tasks/${taskId}/addTag/${tagId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error adding tag to task:", errorData.message);
      throw new Error(errorData.message);
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error adding tag to task:", response.statusText);
      throw new Error("Failed to add tag to task");
    }
  }
  
  // For PATCH operations, we don't expect a JSON response, so no need to parse
};

export const removeTagFromTask = async (
  taskId: number,
  tagId: number
): Promise<void> => {
  const token = localStorage.getItem("authToken") || undefined;
  const response = await fetch(
    `${baseUrl}/tasks/${taskId}/removeTag/${tagId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error removing tag from task:", errorData.message);
      throw new Error(errorData.message);
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error removing tag from task:", response.statusText);
      throw new Error("Failed to remove tag from task");
    }
  }
  
  // For PATCH operations, we don't expect a JSON response, so no need to parse
};
