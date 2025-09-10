import { AuthResponse } from "../interfaces/auth.interface";
import { ErrorResponse } from "../interfaces/errorResponse.interface";

const baseUrl = 'http://localhost:8080';

export interface CheckStatusRequest {
    token: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        try {
            // Intentar obtener el mensaje de error del backend
            const errorData: ErrorResponse = await response.json();
            console.log("Error fetching task:", errorData.message);
            throw new Error(errorData.message);
        } catch (parseError) {
            // Si no se puede parsear la respuesta, usar el statusText
            console.log("Error fetching task:", response.statusText);
            throw new Error("Failed to fetch task");
        }
    }
    const data = await response.json() as AuthResponse;
    return data;
};


export const register = async (username: string, email: string, password: string, fullName: string): Promise<AuthResponse> => {
    const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, fullName }),
    });
    if (!response.ok) {
        try {
            // Intentar obtener el mensaje de error del backend
            const errorData: ErrorResponse = await response.json();
            console.log("Error fetching task:", errorData.message);
            throw new Error(errorData.message);
        } catch (parseError) {
            // Si no se puede parsear la respuesta, usar el statusText
            console.log("Error fetching task:", response.statusText);
            throw new Error("Failed to fetch task");
        }
    }
    const data = await response.json() as AuthResponse;
    return data;
};