'use client';

import { useEffect, useState } from 'react';
import { TrainerProfile } from './types';
import { ProfileCard } from './components/ProfileCard';
import { useTrainerProfile } from './hooks/useTrainerProfile';
import toast from 'react-hot-toast';

export default function ProfilesPage() {
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [filters, setFilters] = useState({
    location: '',
    specialization: '',
  });
  const { getTrainers, loading, error } = useTrainerProfile();

  useEffect(() => {
    loadTrainers();
  }, [filters]);

  const loadTrainers = async () => {
    try {
      const data = await getTrainers({
        location: filters.location || undefined,
        specialization: filters.specialization || undefined,
      });
      setTrainers(data);
    } catch (err) {
      toast.error(error || 'Failed to load trainers');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({ location: '', specialization: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Trainer</h1>
          <p className="text-gray-600">Discover qualified fitness trainers in your area</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Search by location..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select
                name="specialization"
                value={filters.specialization}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Specializations</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Cardio">Cardio</option>
                <option value="Yoga">Yoga</option>
                <option value="Pilates">Pilates</option>
                <option value="CrossFit">CrossFit</option>
                <option value="Boxing">Boxing</option>
                <option value="HIIT">HIIT</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading trainers...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-semibold">Error loading trainers</p>
            <p>{error}</p>
          </div>
        )}

        {/* Trainers grid */}
        {!loading && trainers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <ProfileCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && trainers.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No trainers found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-500 hover:text-blue-600 font-semibold"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
