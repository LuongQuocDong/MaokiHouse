import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';
import type { Homestay } from '../types';

export const useHomestayDetail = (id: string | undefined) => {
  const [homestay, setHomestay] = useState<Homestay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        if (!id) {
          setError(new Error('No homestay ID provided'));
          return;
        }
        
        const homestayRef = ref(database, `homestays/${id}`);
        const snapshot = await get(homestayRef);
        
        if (snapshot.exists()) {
          setHomestay({ id: snapshot.key as string, ...snapshot.val() } as Homestay);
        } else {
          setError(new Error('Homestay not found'));
        }
      } catch (error) {
        console.error('Error fetching homestay:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch homestay'));
      } finally {
        setLoading(false);
      }
    };

    fetchHomestay();
  }, [id]);

  return { homestay, loading, error };
}; 