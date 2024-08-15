import React from 'react';

interface InstrumentCardProps {
  name: string;
  level: number;
  profitPerHour: number;
  upgradeCost: number;
  onUpgrade: () => void;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({
  name,
  level,
  profitPerHour,
  upgradeCost,
  onUpgrade,
}) => {
  return (
    <div className="w-64 rounded-lg bg-white p-4 text-center shadow-lg">
      <div className="text-lg font-bold">{name}</div>
      <div className="mb-2 text-gray-600">LV {level}</div>
      <div className="mb-2 text-xl font-bold">+{profitPerHour} /h</div>
      <button className="mt-2 rounded-lg bg-yellow-500 px-4 py-2 text-white" onClick={onUpgrade}>
        Level up for {upgradeCost} coins
      </button>
    </div>
  );
};

export default InstrumentCard;
