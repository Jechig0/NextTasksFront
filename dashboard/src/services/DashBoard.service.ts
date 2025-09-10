import { DashBoard } from "../interfaces/dashboard.interface";
import { ErrorResponse } from "../interfaces/errorResponse.interface";

const baseURL = "http://localhost:8080";

export const getDashBoardData = async (): Promise<DashBoard> => {
  const token = localStorage.getItem("token") || undefined;

  console.log("Using token:", token); // Verifica que el token se esté obteniendo correctamente

  const algo = {...(token ? { Authorization: `Bearer ${token}` } : {})};
  console.log(algo);


  const response = await fetch(`${baseURL}/dashboard`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  

  if (!response.ok) {
    try {
      // Intentar obtener el mensaje de error del backend
      const errorData: ErrorResponse = await response.json();
      console.log("Error fetching dashboard:", errorData.message);
      throw new Error(errorData.message);
    } catch (parseError) {
      // Si no se puede parsear la respuesta, usar el statusText
      console.log("Error fetching dashboard:", response.statusText);
      throw new Error("Failed to fetch dashboard");
    }
  }
  return response.json() as Promise<DashBoard>;
};
