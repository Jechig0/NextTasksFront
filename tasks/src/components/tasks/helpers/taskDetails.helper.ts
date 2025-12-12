import { Task } from "../../../interfaces/task.interface";
import { deleteTask, removeTagFromTask } from "../../../services/Task.service";

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getPriorityText = (priority: number): string => {
  switch (priority) {
    case 1:
      return "Baja";
    case 2:
      return "Media";
    case 3:
      return "Alta";
    case 4:
      return "Urgente";
    default:
      return "Sin prioridad";
  }
};

export const handleDeleteTask = async (
  task: Task | null,
  setIsDeleting: (loading: boolean) => void,
  setShowDeleteModal: (show: boolean) => void,
  navigate: (path: string) => void
): Promise<void> => {
  setIsDeleting(true);
  try {
    await deleteTask(task?.id ?? 0);
    setShowDeleteModal(false);

    // Mostrar mensaje de éxito
    alert("Tarea eliminada exitosamente");

    // Redirigir a la página principal o lista de tareas
    navigate("/boards/" + task?.column.board.id);
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    alert(
      `Error al eliminar la tarea: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );
  } finally {
    setIsDeleting(false);
  }
};

export const handleRemoveTagFromTask = async (
  taskId: number,
  tagId: number,
  refetch: () => Promise<void>
): Promise<void> => {
  if (!taskId || !tagId) return;

  try {
    await removeTagFromTask(taskId, tagId);
    await refetch();
  } catch (error) {
    console.error("Error al eliminar tag de la tarea:", error);
    throw error;
  }
};

export const navigateToEditTask = (
  taskId: number,
  navigate: (path: string) => void
): void => {
  const isStandalone = window.location.port === "8083"; // Puerto específico del micro-frontend tasks

  if (isStandalone) {
    navigate(`/edit/${taskId}`);
  } else {
    navigate(`/tasks/edit/${taskId}`);
  }

  

};

export const navigateToAddTag = (
  taskId: number,
  navigate: (path: string) => void
): void => {
  const isStandalone = window.location.port === "8083"; // Puerto específico del micro-frontend tasks

  if (isStandalone) {
    navigate(`/addTag/${taskId}`);
  } else {
    // Usar ruta absoluta desde el host para evitar rutas relativas
    navigate(`/tasks/addTag/${taskId}`);
  }
};

export const showDeleteConfirmation = (
  setShowDeleteModal: (show: boolean) => void
): void => {
  setShowDeleteModal(true);
};

export const hideDeleteConfirmation = (
  setShowDeleteModal: (show: boolean) => void
): void => {
  setShowDeleteModal(false);
};
