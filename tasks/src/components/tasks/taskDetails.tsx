import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchTask } from "../../hooks/useFetchTask";
import { ConfirmationModal } from "../comfirmationModal";
import {
  formatDate,
  getPriorityText,
  handleDeleteTask as deleteTaskHelper,
  handleRemoveTagFromTask as removeTagHelper,
  navigateToEditTask,
  navigateToAddTag,
  showDeleteConfirmation,
  hideDeleteConfirmation
} from "./helpers/taskDetails.helper";

interface TaskDetailsProps {
  taskId: number;
}

export const TaskDetails = ({ taskId }: TaskDetailsProps) => {
  const { task, loading, error, refetch } = useFetchTask(taskId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteTask = async () => {
    await deleteTaskHelper(task, setIsDeleting, setShowDeleteModal, navigate);
  };

  const navigateToBoard = (boardId: number) => {
    navigate(`/boards/${boardId}`);
  };

  const handleRemoveTagFromTask = async (tagId: number) => {
    await removeTagHelper(taskId, tagId, refetch);
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
            {getPriorityText(task.priority || 1)}
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
                onClick={() => navigateToAddTag(task.id, navigate)}
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
              onClick={() => navigateToAddTag(task.id, navigate)}
            >
              +
            </div>
          ))}

        <div className="border-t border-gray-500 my-4"></div>
        <div className="flex justify-center gap-3">
          <button
            className="btn btn-ghost"
            onClick={() => navigateToBoard(task.column.board.id)}
          >
            Volver
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigateToEditTask(task.id, navigate)}
          >
            Editar tarea
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => showDeleteConfirmation(setShowDeleteModal)}
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
        onCancel={() => hideDeleteConfirmation(setShowDeleteModal)}
        isLoading={isDeleting}
      />
    </div>
  );
};
