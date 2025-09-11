import { ErrorResponse } from "../interfaces/errorResponse.interface";
import { Tag } from "../interfaces/tag.interface";

const baseUrl = "http://localhost:8080";

export const getTagById = async (tagId: number): Promise<Tag> => {
  const token = sessionStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tags/${tagId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error fetching tag:", errorData.message);
      throw new Error(errorData.message);
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error fetching tag:", response.statusText);
      throw new Error("Failed to fetch tag");
    }
  }
  const data = (await response.json()) as Tag;
  return data;
};

export const getAllTagsByOwner = async (userId: number): Promise<Tag[]> => {
  const token = sessionStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tags/owner/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error fetching tags:", errorData.message);
      throw new Error(errorData.message);
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error fetching tags:", response.statusText);
      throw new Error("Failed to fetch tags");
    }
  }
  const data = (await response.json()) as Tag[];
  return data;
};

export const createTag = async (tagData: Partial<Tag>): Promise<Tag> => {
  const token = sessionStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(tagData),
  });

  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error creating tag:", errorData.message);
      throw new Error(errorData.message);
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error creating tag:", response.statusText);
      throw new Error("Failed to create tag");
    }
  }

  const data = (await response.json()) as Tag;
  return data;
};

export const updateTag = async (
  tagId: number,
  tagData: Partial<Tag>
): Promise<Tag> => {
  const token = sessionStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tags/${tagId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(tagData),
  });

  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error updating tag:", errorData.message);
      throw new Error(errorData.message);
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error updating tag:", response.statusText);
      throw new Error("Failed to update tag");
    }
  }

  const data = (await response.json()) as Tag;
  return data;
};

export const deleteTag = async (tagId: number): Promise<void> => {
  const token = sessionStorage.getItem("authToken") || undefined;
  const response = await fetch(`${baseUrl}/tags/${tagId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error deleting tag:", errorData.error);
      
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error deleting tag:", response.statusText);
      
    }
  }
};
