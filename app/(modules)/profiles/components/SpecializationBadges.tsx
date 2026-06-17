'use client';

interface SpecializationBadgesProps {
  specializations: string[];
  maxDisplay?: number;
}

export const SpecializationBadges: React.FC<SpecializationBadgesProps> = ({
  specializations,
  maxDisplay = 3,
}) => {
  const displayed = specializations.slice(0, maxDisplay);
  const remaining = specializations.length - maxDisplay;

  return (
    <div className="flex flex-wrap gap-2">
      {displayed.map((spec) => (
        <span
          key={spec}
          className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
        >
          {spec}
        </span>
      ))}
      {remaining > 0 && (
        <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          +{remaining}
        </span>
      )}
    </div>
  );
};
