import { Tag } from "../../../interfaces/tag.interface";
import { addTagToTask, removeTagFromTask } from "../../../services/Task.service";
import { deleteTag } from "../../../services/Tags.service";

export const handleSelectExistingTag = (tag: Tag, selectedTag: Tag | null, setSelectedTag: (tag: Tag | null) => void) => {
  if (selectedTag?.id === tag.id) {
    setSelectedTag(null);
    return;
  }
  setSelectedTag(tag);
};

export const handleCancel = (setSelectedTag: (tag: Tag | null) => void, navigate: (path: string) => void, taskId: string) => {
  setSelectedTag(null);
  navigate(`/details/${taskId}`);
};

export const handleEdit = (selectedTag: Tag | null, navigate: (path: string) => void) => {
  if (!selectedTag) return;
  navigate(`/tags/edit/${selectedTag.id}`);
};

export const handleDelete = async (selectedTag: Tag | null, taskId: string | undefined, refetch: () => Promise<void>, setSelectedTag: (tag: Tag | null) => void) => {
  if (!selectedTag || !taskId) return;

  try {
    await deleteTag(selectedTag.id);
    await refetch();
    setSelectedTag(null);
  } catch (error) {
    console.error("Error al eliminar tag:", error);
    throw error;
  }
};

export const handleAddTagToTask = async (selectedTag: Tag | null, taskId: string | undefined, navigate: (path: string) => void) => {
  if (!selectedTag || !taskId) return;

  try {
    await addTagToTask(Number(taskId), selectedTag.id);
    navigate(`/details/${taskId}`);
  } catch (error) {
    console.error("Error al añadir tag a la tarea:", error);
    throw error;
  }
};

export const filterAvailableTags = (allTags: Tag[], taskTags: Tag[] = []): Tag[] => {
  return allTags.filter(tag => !taskTags.some(taskTag => taskTag.id === tag.id));
};