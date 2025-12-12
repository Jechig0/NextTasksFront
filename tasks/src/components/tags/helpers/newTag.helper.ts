import { createTag, updateTag } from "../../../services/Tags.service";
import { Owner } from "../../../interfaces/task.interface";

// Colores predefinidos para los tags
export const predefinedColors = [
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

export const validateTagName = (tagName: string): string | null => {
  if (!tagName.trim()) {
    return "El nombre del tag es requerido";
  }
  return null;
};

export const handleCreateOrUpdateTag = async (
  isEditing: boolean,
  tagId: number | null,
  tagName: string,
  tagColor: string,
  userId: number
) => {
  const validationError = validateTagName(tagName);
  if (validationError) {
    throw new Error(validationError);
  }

  try {
    if (isEditing && tagId) {
      // Actualizar tag existente
      await updateTag(tagId, {
        name: tagName.trim(),
        colorCode: tagColor,
      });
    } else {
      // Crear nuevo tag
      await createTag({
        name: tagName.trim(),
        colorCode: tagColor,
        owner: { id: userId } as Owner,
      });
    }
  } catch (err) {
    const errorMessage = isEditing ? "Error al actualizar el tag" : "Error al crear el tag";
    console.error(isEditing ? "Error updating tag:" : "Error creating tag:", err);
    throw new Error(errorMessage);
  }
};

export const resetForm = (
  setTagName: (name: string) => void,
  setTagColor: (color: string) => void,
  setError: (error: string) => void
) => {
  setTagName("");
  setTagColor("#3B82F6");
  setError("");
};

export const loadTagDataForEditing = (
  tag: any,
  isEditing: boolean,
  setTagName: (name: string) => void,
  setTagColor: (color: string) => void
) => {
  if (isEditing && tag) {
    setTagName(tag.name);
    setTagColor(tag.colorCode);
  }
};

export const getSubmitButtonText = (isSubmitting: boolean, isEditing: boolean): string => {
  if (isSubmitting) {
    return isEditing ? "Actualizando..." : "Creando...";
  }
  return isEditing ? "Actualizar Tag" : "Crear Tag";
};

export const getPageTitle = (isEditing: boolean): string => {
  return isEditing ? "Editar Tag" : "Crear Nuevo Tag";
};