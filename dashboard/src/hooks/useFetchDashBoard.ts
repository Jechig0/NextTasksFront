import { useEffect, useState } from "react";
import { DashBoard } from "../interfaces/dashboard.interface";
import { getDashBoardData } from "../services/DashBoard.service";

export interface UseFetchDashBoard {
    dashboard: DashBoard | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useFetchDashBoard(): UseFetchDashBoard {
    const [dashboard, setDashboard] = useState<DashBoard | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getDashBoardData();
            console.log('Dashboard data fetched:', data);
            setDashboard(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar los datos del dashboard');
            console.error('Error fetching dashboard:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return { 
        dashboard, 
        loading, 
        error, 
        refetch: fetchDashboard 
    };
}