-- Create trainer_profiles table
CREATE TABLE IF NOT EXISTS trainer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  bio TEXT,
  profile_image_url VARCHAR(500),
  hourly_rate DECIMAL(10, 2) NOT NULL,
  specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
  certifications TEXT[] DEFAULT ARRAY[]::TEXT[],
  years_experience INTEGER,
  location VARCHAR(200),
  is_available BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2, 1) DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_user_profile UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE trainer_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Trainers can view their own profile" 
  ON trainer_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public profiles" 
  ON trainer_profiles FOR SELECT 
  USING (true);

CREATE POLICY "Trainers can update their own profile" 
  ON trainer_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Trainers can insert their own profile" 
  ON trainer_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Trainers can delete their own profile" 
  ON trainer_profiles FOR DELETE 
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_trainer_profiles_user_id ON trainer_profiles(user_id);
CREATE INDEX idx_trainer_profiles_is_available ON trainer_profiles(is_available);
CREATE INDEX idx_trainer_profiles_created_at ON trainer_profiles(created_at DESC);
CREATE INDEX idx_trainer_profiles_location ON trainer_profiles(location);

-- Create trigger for updated_at column
CREATE OR REPLACE FUNCTION update_trainer_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trainer_profiles_updated_at_trigger
BEFORE UPDATE ON trainer_profiles
FOR EACH ROW
EXECUTE FUNCTION update_trainer_profiles_updated_at();
