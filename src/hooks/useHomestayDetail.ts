import { useState, useEffect } from 'react';
import { homestayService } from '../services/homestayService';
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

        const data = await homestayService.get(id);
        setHomestay(data);
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
