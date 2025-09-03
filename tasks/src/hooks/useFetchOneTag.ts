import { useEffect, useState } from "react";
import { Tag } from "../interfaces/tag.interface";
import { getTagById } from "../services/Tags.service";

export interface UseFetchOneTag {
    tag: Tag | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useFetchOneTag(tagId: number | null): UseFetchOneTag {
    const [tag, setTag] = useState<Tag | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTag = async () => {
        if (!tagId) return;
        
        try {
            setLoading(true);
            setError(null);
            const data = await getTagById(tagId);
            console.log('Tag fetched:', data);
            setTag(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar el tag');
            console.error('Error fetching tag:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tagId) {
            fetchTag();
        } else {
            setTag(null);
            setLoading(false);
            setError(null);
        }
    }, [tagId]);

    return { 
        tag, 
        loading, 
        error, 
        refetch: fetchTag 
    };
}
