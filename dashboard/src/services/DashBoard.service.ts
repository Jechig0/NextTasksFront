import { DashBoard } from "../interfaces/dashboard.interface";
import { ErrorResponse } from "../interfaces/errorResponse.interface";

const baseURL = 'http://localhost:8080';

export const getDashBoardData = async (): Promise<DashBoard> => {
    // Simular un delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data para el dashboard
    const mockDashboard: DashBoard = {
        totalBoards: 5,
        totalTasks: 24,
        completedTasks: 18,
        pendingTasks: 4,
        overdueTasks: 2,
        productivityRate: 75 // (18/24) * 100
    };

    return mockDashboard;

    // Código comentado para cuando se conecte al backend real
    // const response = await fetch(`${baseURL}/dashboard`);
    // if (!response.ok) {
    //     try {
    //         // Intentar obtener el mensaje de error del backend
    //         const errorData: ErrorResponse = await response.json();
    //         console.log("Error fetching task:", errorData.message);
    //         throw new Error(errorData.message);
    //     } catch (parseError) {
    //         // Si no se puede parsear la respuesta, usar el statusText
    //         console.log("Error fetching task:", response.statusText);
    //         throw new Error("Failed to fetch task");
    //     }
    // }
    // return response.json() as Promise<DashBoard>;
}