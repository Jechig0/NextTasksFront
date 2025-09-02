import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchTask } from "../../hooks/useFetchTask";
import { ConfirmationModal } from "../comfirmationModal";
import { deleteTask, removeTagFromTask } from "../../services/Task.service";

interface TaskDetailsProps {
  taskId: number;
}

export const TaskDetails = ({ taskId }: TaskDetailsProps) => {
  const { task, loading, error, refetch } = useFetchTask(taskId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteTask = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(taskId);
      setShowDeleteModal(false);

      // Mostrar mensaje de éxito
      alert("Tarea eliminada exitosamente");

      // Redirigir a la página principal o lista de tareas
      navigate("/");
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

  const handleRemoveTagFromTask = async (tagId: number) => {
    if (!taskId || !tagId) return;

    try {
      // Lógica para eliminar el tag de la tarea
      await removeTagFromTask(taskId, tagId);
      refetch();
    } catch (error) {
      console.error("Error al eliminar tag de la tarea:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <span className="ml-2 text-gray-600">Cargando tarea...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error: {error}</span>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="alert alert-warning">
        <span>No se encontró la tarea</span>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityText = (priority: number) => {
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

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Título */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">{task.title}</h2>
        <p className="text-gray-500">{task.description}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Fechas</h4>
        <div className="flex flex-wrap gap-6 text-sm ">
          <div>
            <span className="font-semibold">Creación:</span>{" "}
            {formatDate(task.creationDate)}
          </div>
          <div>
            <span className="font-semibold">Vencimiento:</span>{" "}
            {formatDate(task.dueDate)}
          </div>
          {task.completionDate && (
            <div>
              <span className="font-medium">Completada:</span>{" "}
              {formatDate(task.completionDate)}
            </div>
          )}
        </div>
      </div>

      {/* Prioridad y Tags en la misma sección */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        {/* Prioridad */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Prioridad</h4>
          <div className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
            {getPriorityText(task.priority)}
          </div>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Etiquetas</h4>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="px-3 py-1 btn text-sm border"
                  style={{ borderColor: tag.colorCode, color: tag.colorCode }}
                  onClick={() => handleRemoveTagFromTask(tag.id)}
                >
                  {tag.name}
                </div>
              ))}
              <div
                className="px-3 py-1 btn text-sm border border-green-700 text-green-700 "
                onClick={() => navigate(`/addTag/${task.id}`)}
              >
                +
              </div>
            </div>
          </div>
        )}

        {!task.tags ||
          (task.tags.length === 0 && (
            <div
              className="px-3 py-1 btn text-sm border border-green-700 text-green-700 "
              onClick={() => navigate(`/addTag/${task.id}`)}
            >
              +
            </div>
          ))}

        <div className="border-t border-gray-500 my-4"></div>
        <div className="flex justify-center gap-3">
          <button className="btn btn-outline" onClick={() => navigate("/")}>
            Volver
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/edit/${task.id}`)}>Editar tarea</button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowDeleteModal(true)}
          >
            Eliminar tarea
          </button>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Eliminar tarea"
        bodyText={`¿Estás seguro de que quieres eliminar la tarea "${task?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteTask}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={isDeleting}
      />
    </div>
  );
};
