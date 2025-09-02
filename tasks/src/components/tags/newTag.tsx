import React, { useState, useEffect } from "react";
import { Tag } from "../../interfaces/tag.interface";
import { createTag, updateTag } from "../../services/Tags.service";
import { Owner } from "../../interfaces/task.interface";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchOneTag } from "../../hooks/useFetchOneTag";

interface NewTagProps {
  userId: number;
}

const NewTag: React.FC<NewTagProps> = ({ userId }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const tagId = id ? parseInt(id) : null;

  const [error, setError] = useState<string>("");

  // Estados para crear/editar tag
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#3B82F6");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook para obtener el tag a editar
  const { tag, loading: loadingTag, error: fetchError } = useFetchOneTag(tagId);

  // Efecto para cargar los datos del tag al editar
  useEffect(() => {
    if (isEditing && tag) {
      setNewTagName(tag.name);
      setNewTagColor(tag.colorCode);
    }
  }, [isEditing, tag]);

  const handleNavigation = () => {
    navigate(-1); // Navegar hacia atrás como la flecha del navegador
  };

  // Colores predefinidos para los tags
  const predefinedColors = [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#8B5CF6", // Purple
    "#F97316", // Orange
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#EC4899", // Pink
    "#6B7280", // Gray
  ];

  const handleCreateNewTag = async () => {
    if (!newTagName.trim()) {
      setError("El nombre del tag es requerido");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      if (isEditing && tagId) {
        // Actualizar tag existente
        await updateTag(tagId, {
          name: newTagName.trim(),
          colorCode: newTagColor,
        });
      } else {
        // Crear nuevo tag
        await createTag({
          name: newTagName.trim(),
          colorCode: newTagColor,
          owner: { id: userId } as Owner,
        });
      }

      navigate(-1); // Volver a la página anterior después de crear/editar el tag
    } catch (err) {
      setError(isEditing ? "Error al actualizar el tag" : "Error al crear el tag");
      console.error(isEditing ? "Error updating tag:" : "Error creating tag:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setNewTagName("");
    setNewTagColor("#3B82F6");
    setError("");
    navigate(-1); // Volver a la página anterior
  };

  // Mostrar loading mientras se carga el tag para editar
  if (isEditing && loadingTag) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-md"></span>
        <span className="ml-2">Cargando tag...</span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">
          {isEditing ? "Editar Tag" : "Crear Nuevo Tag"}
        </h2>

        {(error || fetchError) && (
          <div className="alert alert-error mb-4">
            <span>{error || fetchError}</span>
          </div>
        )}

        {/* Formulario para crear/editar tag */}
        <div className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium mb-4">
                Nombre del Tag
              </span>
            </label>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Ingrese el nombre del tag"
              className="input input-bordered w-full"
              maxLength={50}
              autoFocus
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Color del Tag</span>
            </label>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewTagColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    newTagColor === color
                      ? "border-primary scale-110"
                      : "border-base-300 hover:border-base-content"
                  }`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
            <input
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
              className="input input-bordered w-full h-10"
            />
          </div>

          {/* Preview del tag */}
          {newTagName && (
            <div className="card card-compact bg-base-200">
              <div className="card-body">
                <p className="text-sm opacity-70 mb-2">Vista previa:</p>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: newTagColor }}
                  ></div>
                  <span className="font-medium">{newTagName}</span>
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="card-actions justify-end gap-3 pt-4">
            <button onClick={handleCancel} className="btn btn-ghost">
              Cancelar
            </button>
            <button
              onClick={handleCreateNewTag}
              disabled={!newTagName.trim() || isSubmitting}
              className="btn btn-success"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isEditing ? "Actualizando..." : "Creando..."}
                </>
              ) : (
                isEditing ? "Actualizar Tag" : "Crear Tag"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTag;
