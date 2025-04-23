import React from 'react';
import { X } from 'lucide-react';
import { useBetSlip } from '../../contexts/BetSlipContext';

interface BetCardProps {
  bet: {
    id: string;
    matchId: string;
    teams: string;
    selection: string;
    odds: number;
    type: string;
  };
}

const BetCard: React.FC<BetCardProps> = ({ bet }) => {
  const { removeBet } = useBetSlip();

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-3 relative">
      <button 
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        onClick={() => removeBet(bet.id)}
      >
        <X size={18} />
      </button>
      
      <div className="mb-2 pr-6">
        <div className="text-sm text-gray-400">{bet.type}</div>
        <div className="font-medium">{bet.teams}</div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-green-400">{bet.selection}</span>
        </div>
        <div className="font-semibold text-lg">{bet.odds.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default BetCard;