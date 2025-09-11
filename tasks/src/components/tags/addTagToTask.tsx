import React, { useState } from "react";
import { Tag } from "../../interfaces/tag.interface";
import { useFetchTags } from "../../hooks/useFetchTags";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchTask } from "../../hooks/useFetchTask";
import { 
  handleSelectExistingTag as selectTag,
  handleNavigateNewTag as newTag,
  handleCancel as cancelSelection,
  handleEdit as editTag,
  handleDelete as deleteSelectedTag,
  handleAddTagToTask as addSelectedTagToTask,
  filterAvailableTags 
} from "./helpers/addTagToTask.helper";

interface AddTagToTaskProps {
  userId: number;
}

const AddTagToTask: React.FC<AddTagToTaskProps> = ({ userId }) => {
  const { taskId } = useParams<{ taskId: string }>();

  const navigate = useNavigate();
  // Usar el hook personalizado para manejar los tags
  const {
    tags: existingTags,
    loading,
    error: fetchError,
    refetch
  } = useFetchTags(userId);

  const { task } = useFetchTask(Number(taskId));

  const filteredTags = filterAvailableTags(existingTags, task?.tags);

  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);


  const handleNavigateNewTag = () => {
    newTag(Number(taskId), navigate);
  };

  const handleSelectExistingTag = (tag: Tag) => {
    selectTag(tag, selectedTag, setSelectedTag);
  };

  const handleCancel = () => {
    cancelSelection(setSelectedTag, navigate, taskId!);
  };

  const handleEdit = () => {
    editTag(selectedTag, Number(taskId), navigate);
  };

  const handleDelete = async () => {
      await deleteSelectedTag(selectedTag, taskId, refetch, setSelectedTag);
  };
  const handleAddTagToTask = async () => {
    try {
      await addSelectedTagToTask(selectedTag, taskId, navigate);
    } catch (error) {
      // El error ya se maneja en el helper
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-md"></span>
        <span className="ml-2">Cargando tags...</span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">Añadir Tag a la Tarea</h2>

        {fetchError && (
          <div className="alert alert-error mb-4">
            <span>{fetchError}</span>
          </div>
        )}

        {/* Sección de tags existentes */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Seleccionar Tag ({filteredTags.length} disponibles)
          </h3>

          {filteredTags.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTags.map((tag) => (
                <div
                  key={tag.id}
                  className={`card card-compact cursor-pointer transition-all duration-200 ${
                    selectedTag?.id === tag.id
                      ? "card-bordered border-primary bg-primary/10"
                      : "card-bordered hover:shadow-md"
                  }`}
                  onClick={() => handleSelectExistingTag(tag)}
                >
                  <div className="card-body">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: tag.colorCode }}
                      ></div>
                      <span className="font-medium">{tag.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="alert alert-info">
                <span>No tienes tags creados aún</span>
              </div>
            </div>
          )}
        </div>

        {selectedTag && (
          <div className="flex justify-center gap-3">
            <button className="btn btn-primary" onClick={handleEdit}>
              Editar Tag
            </button>
            <button className="btn btn-error" onClick={handleDelete}>Eliminar Tag</button>
          </div>
        )}

        {!selectedTag && (
          <button
            onClick={handleNavigateNewTag}
            className="btn btn-accent"
          >
            Crear Tag
          </button>
        )}

        {/* Botones de navegación */}
        <div className="card-actions justify-between pt-4">
          <button onClick={handleCancel} className="btn btn-ghost">
            Cancelar
          </button>
          {selectedTag && (
            <button
              onClick={handleAddTagToTask}
              className="btn btn-primary"
            >
              Añadir Tag a la Tarea
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTagToTask;
