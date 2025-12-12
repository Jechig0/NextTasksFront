import { updateTask } from "../../../services/Task.service";
import { Board, Column, Task, TaskRequest } from "../../../interfaces/task.interface";


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
    setCompletionDate(
      task.completionDate
        ? new Date(task.completionDate).toISOString().split("T")[0]
        : ""
    );
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
  task: Partial<Task>
): Promise<void> => {
 

  try {

    console.log({
            title,
            description,
            dueDate,
            completionDate,
            priority,
          });
    

    const taskData: Partial<Task> = {
      title: title.trim(),
      description: description?.trim() || "",
      dueDate: new Date(dueDate),
      completionDate: completionDate
        ? new Date(completionDate)
        : undefined,
      priority: priority || undefined,
      column: task?.column ?? {} as Column, // Usar el column actual de la tarea
    };

    console.log(taskData);

    await updateTask(taskId, taskData);
  } catch (err: any) {
    const errorMessage = err.message || "Error al actualizar la tarea";
    console.error("Error updating task:", err);
    throw new Error(errorMessage);
  }
};

export const navigateToTaskDetails = (
  taskId: number,
  navigate: (path: string) => void
): void => {
  const isStandalone = window.location.port === "8083"; // Puerto específico del micro-frontend tasks

  if (isStandalone) {
    navigate(`/details/${taskId}`);
  } else {
    navigate(`/tasks/details/${taskId}`);
  }
};


export const resetFormErrors = (setError: (error: string) => void): void => {
  setError("");
};

export const getPriorityOptions = () => [
  { value: 1, label: "Baja" },
  { value: 2, label: "Media" },
  { value: 3, label: "Alta" },
  { value: 4, label: "Urgente" },
];

export const getSubmitButtonText = (isSubmitting: boolean): string => {
  return isSubmitting ? "Actualizando..." : "Actualizar Tarea";
};


