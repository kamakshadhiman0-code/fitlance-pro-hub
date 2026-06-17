'use client';

import { useState } from 'react';
import { CreateTrainerProfileInput } from '../types';
import toast from 'react-hot-toast';

interface ProfileFormProps {
  onSubmit: (data: CreateTrainerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

const SPECIALIZATIONS = [
  'Strength Training',
  'Cardio',
  'Yoga',
  'Pilates',
  'CrossFit',
  'Boxing',
  'HIIT',
  'Weight Loss',
  'Muscle Gain',
  'Flexibility',
];

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<CreateTrainerProfileInput>({
    first_name: '',
    last_name: '',
    bio: '',
    hourly_rate: 0,
    specializations: [],
    certifications: [],
    years_experience: 0,
    location: '',
  });

  const [certInput, setCertInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'hourly_rate' || name === 'years_experience' ? parseFloat(value) || 0 : value,
    }));
  };

  const toggleSpecialization = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations?.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...(prev.specializations || []), spec],
    }));
  };

  const addCertification = () => {
    if (certInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...(prev.certifications || []), certInput],
      }));
      setCertInput('');
    }
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.hourly_rate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await onSubmit(formData);
      toast.success('Profile created successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        bio: '',
        hourly_rate: 0,
        specializations: [],
        certifications: [],
        years_experience: 0,
        location: '',
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Trainer Profile</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (₹) *</label>
          <input
            type="number"
            name="hourly_rate"
            value={formData.hourly_rate}
            onChange={handleChange}
            min="0"
            step="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
          <input
            type="number"
            name="years_experience"
            value={formData.years_experience}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
          placeholder="City, State"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">Specializations</label>
        <div className="grid grid-cols-2 gap-2">
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => toggleSpecialization(spec)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                formData.specializations?.includes(spec)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={isLoading}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
            placeholder="Add certification and press Enter"
          />
          <button
            type="button"
            onClick={addCertification}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading || !certInput.trim()}
          >
            Add
          </button>
        </div>
        {formData.certifications && formData.certifications.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.certifications.map((cert, index) => (
              <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {cert}
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-green-600 hover:text-green-800 font-bold"
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
      >
        {isLoading ? 'Creating Profile...' : 'Create Profile'}
      </button>
    </form>
  );
};
