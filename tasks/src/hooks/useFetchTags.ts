import { useEffect, useState } from "react";
import { Tag } from "../interfaces/tag.interface";
import { getAllTagsByOwner } from "../services/Tags.service";

export interface UseFetchTags {
    tags: Tag[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useFetchTags(userId: number): UseFetchTags {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTags = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllTagsByOwner(userId);
            setTags(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar los tags');
            console.error('Error fetching tags:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchTags();
        }
    }, [userId]);

    return { 
        tags, 
        loading, 
        error, 
        refetch: fetchTags 
    };
}