import { updateTask } from "../../../services/Task.service";
import { TaskRequest } from "../../../interfaces/task.interface";

export const validateTaskForm = (title: string, dueDate: string): string | null => {
  if (!title.trim()) {
    return "El título es requerido";
  }

  if (!dueDate) {
    return "La fecha de vencimiento es requerida";
  }

  return null;
};

export const loadTaskDataForEditing = (
  task: any,
  setTitle: (title: string) => void,
  setDescription: (description: string) => void,
  setDueDate: (dueDate: string) => void,
  setCompletionDate: (completionDate: string) => void,
  setPriority: (priority: number) => void
) => {
  if (task) {
    setTitle(task.title);
    setDescription(task.description);
    // Convertir la fecha al formato requerido por el input date
    setDueDate(new Date(task.dueDate).toISOString().split("T")[0]);
    setCompletionDate(task.completionDate ? new Date(task.completionDate).toISOString().split("T")[0] : "");
    setPriority(task.priority);
  }
};

export const handleTaskSubmit = async (
  taskId: number,
  title: string,
  description: string,
  dueDate: string,
  completionDate: string,
  priority: number,
  task: any
): Promise<void> => {
  const validationError = validateTaskForm(title, dueDate);
  if (validationError) {
    throw new Error(validationError);
  }

  try {
    const taskData: TaskRequest = {
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate).toISOString(),
      completionDate: completionDate ? new Date(completionDate).toISOString() : null,
      priority,
      boardId: task?.board.id || 1, // Usar el board actual de la tarea
    };

    await updateTask(taskId, taskData);
  } catch (err: any) {
    const errorMessage = err.message || "Error al actualizar la tarea";
    console.error("Error updating task:", err);
    throw new Error(errorMessage);
  }
};

export const navigateToTaskDetails = (taskId: number, navigate: (path: string) => void): void => {
  navigate(`/details/${taskId}`);
};

export const navigateBack = (navigate: (delta: number) => void): void => {
  navigate(-1);
};

export const resetFormErrors = (setError: (error: string) => void): void => {
  setError("");
};

export const getPriorityOptions = () => [
  { value: 1, label: "Baja" },
  { value: 2, label: "Media" },
  { value: 3, label: "Alta" },
  { value: 4, label: "Urgente" }
];

export const getSubmitButtonText = (isSubmitting: boolean): string => {
  return isSubmitting ? "Actualizando..." : "Actualizar Tarea";
};

export const getCurrentDateMin = (): string => {
  return new Date().toISOString().split("T")[0];
};
