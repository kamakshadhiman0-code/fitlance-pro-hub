'use client';

import { TrainerProfile } from '../types';
import Link from 'next/link';

interface ProfileCardProps {
  trainer: TrainerProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ trainer }) => {
  return (
    <Link href={`/profiles/${trainer.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
        {trainer.profile_image_url && (
          <div className="mb-4 h-48 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={trainer.profile_image_url}
              alt={`${trainer.first_name} ${trainer.last_name}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {trainer.first_name} {trainer.last_name}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{trainer.rating.toFixed(1)}</span>
          </div>
        </div>

        {trainer.location && (
          <p className="text-sm text-gray-600 mb-2">📍 {trainer.location}</p>
        )}

        {trainer.years_experience !== undefined && (
          <p className="text-sm text-gray-600 mb-2">Experience: {trainer.years_experience} years</p>
        )}

        {trainer.bio && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{trainer.bio}</p>
        )}

        {trainer.specializations.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {trainer.specializations.slice(0, 3).map((spec) => (
                <span
                  key={spec}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {spec}
                </span>
              ))}
              {trainer.specializations.length > 3 && (
                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  +{trainer.specializations.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-xl font-bold text-green-600">₹{trainer.hourly_rate}/hr</span>
          <span className="text-sm text-gray-600">{trainer.total_sessions} sessions</span>
        </div>
      </div>
    </Link>
  );
};
