# FitLance Pro Hub - Module Development Guide

## Module 1: Trainer Profiles 🎯 (BUILDING NOW)

### Overview
Create and manage trainer profiles with qualifications, specializations, rates, and availability.

### Core Features

1. **Profile Creation**
   - Name, bio, professional photo
   - Certifications and qualifications
   - Specializations (strength, cardio, yoga, etc.)
   - Years of experience
   - Hourly rate
   - Location

2. **Profile Management**
   - Edit profile information
   - Upload profile picture
   - Update availability status
   - Manage specializations

3. **Profile Discovery**
   - Display trainer profiles publicly
   - Search filters (location, specialization, rate)
   - Display ratings and reviews
   - Show session count

### Database Schema (SQL)

```sql
CREATE TABLE trainer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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

ALTER TABLE trainer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trainers can view their own profile" 
  ON trainer_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public profiles" 
  ON trainer_profiles FOR SELECT 
  USING (true);

CREATE POLICY "Trainers can update their own profile" 
  ON trainer_profiles FOR UPDATE 
  USING (auth.uid() = user_id);
```

### API Endpoints

```
GET    /api/trainers                      - List all trainers
GET    /api/trainers/search               - Search trainers
GET    /api/trainers/:id                  - Get trainer profile
POST   /api/trainers                      - Create trainer profile
PUT    /api/trainers/:id                  - Update trainer profile
DELETE /api/trainers/:id                  - Delete trainer profile
```

### Directory Structure
```
app/(modules)/profiles/
├── page.tsx                      # List trainers
├── [id]/
│   └── page.tsx                  # View trainer profile
├── create/
│   └── page.tsx                  # Create profile
├── edit/
│   └── page.tsx                  # Edit profile
├── components/
│   ├── ProfileCard.tsx
│   ├── ProfileForm.tsx
│   └── SpecializationBadges.tsx
├── hooks/
│   └── useTrainerProfile.ts
├── services/
│   └── profileService.ts
├── types/
│   └── index.ts
└── utils/
    └── profileUtils.ts
```

### Implementation Steps

**Phase 1: Foundation**
- [ ] Set up database schema in Supabase
- [ ] Create API endpoint: GET /api/trainers (list)
- [ ] Create API endpoint: POST /api/trainers (create)
- [ ] Create ProfileForm component
- [ ] Create ProfileCard component

**Phase 2: Pages & Features**
- [ ] Create trainer profiles list page
- [ ] Create trainer profile view page
- [ ] Create trainer profile creation page
- [ ] Implement image upload
- [ ] Add search and filters

**Phase 3: Polish & Testing**
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states
- [ ] Unit tests
- [ ] Integration tests

---

## Module 2: Booking System (Planned)
## Module 3: Payments (Planned)

---

## Ready to Start?

Follow the README.md to set up your local environment and let's begin building!
