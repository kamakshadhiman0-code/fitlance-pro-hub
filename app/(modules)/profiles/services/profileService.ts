import {
  TrainerProfile,
  CreateTrainerProfileInput,
  UpdateTrainerProfileInput,
} from '../types';

const API_BASE = '/api/trainers';

export const profileService = {
  // Get all trainers with optional filters
  async getTrainers(filters?: {
    location?: string;
    specialization?: string;
    minRate?: number;
    maxRate?: number;
  }): Promise<TrainerProfile[]> {
    const params = new URLSearchParams();
    if (filters?.location) params.append('location', filters.location);
    if (filters?.specialization) params.append('specialization', filters.specialization);
    if (filters?.minRate) params.append('minRate', filters.minRate.toString());
    if (filters?.maxRate) params.append('maxRate', filters.maxRate.toString());

    const response = await fetch(`${API_BASE}?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch trainers');
    return response.json();
  },

  // Get single trainer profile
  async getTrainerById(id: string): Promise<TrainerProfile> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch trainer');
    return response.json();
  },

  // Create new trainer profile
  async createTrainer(input: CreateTrainerProfileInput): Promise<TrainerProfile> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error('Failed to create trainer profile');
    return response.json();
  },

  // Update trainer profile
  async updateTrainer(id: string, input: UpdateTrainerProfileInput): Promise<TrainerProfile> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error('Failed to update trainer profile');
    return response.json();
  },

  // Delete trainer profile
  async deleteTrainer(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete trainer profile');
  },
};
