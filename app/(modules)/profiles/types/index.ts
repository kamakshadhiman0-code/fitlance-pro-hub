export interface TrainerProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  bio?: string;
  profile_image_url?: string;
  hourly_rate: number;
  specializations: string[];
  certifications: string[];
  years_experience?: number;
  location?: string;
  is_available: boolean;
  rating: number;
  total_sessions: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTrainerProfileInput {
  first_name: string;
  last_name: string;
  bio?: string;
  hourly_rate: number;
  specializations?: string[];
  certifications?: string[];
  years_experience?: number;
  location?: string;
}

export interface UpdateTrainerProfileInput {
  first_name?: string;
  last_name?: string;
  bio?: string;
  hourly_rate?: number;
  specializations?: string[];
  certifications?: string[];
  years_experience?: number;
  location?: string;
  is_available?: boolean;
  profile_image_url?: string;
}
