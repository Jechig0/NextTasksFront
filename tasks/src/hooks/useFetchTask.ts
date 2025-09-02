import { useEffect, useState } from "react";
import { Task } from "../interfaces/task.interface";
import { getTaskById } from "../services/Task.service";



export interface UseFetchTask {
    task: Task | null;
    loading: boolean;
    error: string | null;
    refetch : () => Promise<void>;
}


export function useFetchTask (taskId: number): UseFetchTask {
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTask = async () => {
        try {
            const data = await getTaskById(taskId);
            console.log(data);
            setTask(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTask();
    }, [taskId]);

    return { task, loading, error, refetch: fetchTask };
}