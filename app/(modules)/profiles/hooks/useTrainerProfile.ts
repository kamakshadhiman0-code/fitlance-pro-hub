'use client';

import { useState, useCallback } from 'react';
import { TrainerProfile, CreateTrainerProfileInput, UpdateTrainerProfileInput } from '../types';
import { profileService } from '../services/profileService';

export const useTrainerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTrainers = useCallback(
    async (filters?: { location?: string; specialization?: string; minRate?: number; maxRate?: number }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await profileService.getTrainers(filters);
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getTrainerById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getTrainerById(id);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTrainer = useCallback(async (input: CreateTrainerProfileInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.createTrainer(input);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTrainer = useCallback(
    async (id: string, input: UpdateTrainerProfileInput) => {
      setLoading(true);
      setError(null);
      try {
        const data = await profileService.updateTrainer(id, input);
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteTrainer = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await profileService.deleteTrainer(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer,
  };
};
