import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface BetHistoryCardProps {
  bet: {
    id: string;
    date: string;
    teams: string[];
    selections: string[];
    odds: number[];
    type: 'Single' | 'Parlay';
    stake: number;
    potentialWin: number;
    status: 'Won' | 'Lost' | 'Active';
  };
}

const BetHistoryCard: React.FC<BetHistoryCardProps> = ({ bet }) => {
  // Calculate total odds for parlay
  const totalOdds = bet.type === 'Parlay' 
    ? bet.odds.reduce((acc, odd) => acc * odd, 1) 
    : bet.odds[0];

  return (
    <div className={`bg-gray-800 rounded-lg p-4 mb-3 border-l-4 ${
      bet.status === 'Won' 
        ? 'border-green-500' 
        : bet.status === 'Lost' 
          ? 'border-red-500' 
          : 'border-yellow-500'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-gray-400">{bet.date}</div>
          <div className="font-medium text-lg">{bet.type} Bet</div>
        </div>
        <div className="flex items-center">
          {bet.status === 'Won' && (
            <CheckCircle size={20} className="text-green-500 mr-1" />
          )}
          {bet.status === 'Lost' && (
            <XCircle size={20} className="text-red-500 mr-1" />
          )}
          <span className={`font-medium ${
            bet.status === 'Won' 
              ? 'text-green-500' 
              : bet.status === 'Lost' 
                ? 'text-red-500' 
                : 'text-yellow-500'
          }`}>
            {bet.status}
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        {bet.teams.map((team, index) => (
          <div key={index} className="mb-1">
            <div className="text-sm">{team}</div>
            <div className="flex justify-between text-sm">
              <span className="text-green-400">{bet.selections[index]}</span>
              <span>{bet.odds[index].toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <div className="text-gray-400">Stake</div>
            <div className="font-medium">₦{bet.stake.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400">Odds</div>
            <div className="font-medium">{totalOdds.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-gray-400">To Win</div>
            <div className="font-medium">₦{bet.potentialWin.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetHistoryCard;