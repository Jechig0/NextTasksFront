import { Tag } from "../../../interfaces/tag.interface";
import {
  addTagToTask,
  removeTagFromTask,
} from "../../../services/Task.service";
import { deleteTag } from "../../../services/Tags.service";

export const handleSelectExistingTag = (
  tag: Tag,
  selectedTag: Tag | null,
  setSelectedTag: (tag: Tag | null) => void
) => {
  if (selectedTag?.id === tag.id) {
    setSelectedTag(null);
    return;
  }
  setSelectedTag(tag);
};

export const handleNavigateNewTag = (navigate: (path: string) => void) => {
  const isStandalone = window.location.port === "8083"; // Puerto específico del micro-frontend tasks

  if (isStandalone) {
    navigate(`/tags/new`);
  } else {
    navigate(`/tasks/tags/new`);
  }
};

export const handleCancel = (
  setSelectedTag: (tag: Tag | null) => void,
  navigate: (path: string) => void,
  taskId: string
) => {
  setSelectedTag(null);
  const isStandalone = window.location.port === "8083"; // Puerto específico del micro-frontend tasks

  if (isStandalone) {
    navigate(`/details/${taskId}`);
  } else {
    navigate(`/tasks/details/${taskId}`);
  }
};

export const handleEdit = (
  selectedTag: Tag | null,
  navigate: (path: string) => void
) => {
  if (!selectedTag) return;
  // navigate(`/tags/edit/${selectedTag.id}`);
  const isStandalone = window.location.port === "8083"; // Puerto específico del micro-frontend tasks

  if (isStandalone) {
    navigate(`/tags/edit/${selectedTag.id}`);
  } else {
    navigate(`/tasks/tags/edit/${selectedTag.id}`);
  }
};

export const handleDelete = async (
  selectedTag: Tag | null,
  taskId: string | undefined,
  refetch: () => Promise<void>,
  setSelectedTag: (tag: Tag | null) => void
) => {
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

export const handleAddTagToTask = async (
  selectedTag: Tag | null,
  taskId: string | undefined,
  navigate: (path: string) => void
) => {
  if (!selectedTag || !taskId) return;

  try {
    await addTagToTask(Number(taskId), selectedTag.id);

    const isStandalone = window.location.port === "8083"; // Puerto específico del micro-frontend tasks

    if (isStandalone) {
      navigate(`/details/${taskId}`);
    } else {
      navigate(`/tasks/details/${taskId}`);
    }
  } catch (error) {
    console.error("Error al añadir tag a la tarea:", error);
    throw error;
  }
};

export const filterAvailableTags = (
  allTags: Tag[],
  taskTags: Tag[] = []
): Tag[] => {
  return allTags.filter(
    (tag) => !taskTags.some((taskTag) => taskTag.id === tag.id)
  );
};
