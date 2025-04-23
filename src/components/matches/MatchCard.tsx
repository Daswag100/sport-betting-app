import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Activity } from 'lucide-react';
import { useBetSlip } from '../../contexts/BetSlipContext';

interface MatchCardProps {
  match: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    league: string;
    startTime: string;
    homeOdds: number;
    drawOdds: number;
    awayOdds: number;
    isLive?: boolean;
    homeScore?: number;
    awayScore?: number;
  };
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const navigate = useNavigate();
  const { addBet } = useBetSlip();

  const handleCardClick = () => {
    navigate(`/app/match/${match.id}`);
  };

  const handleOddsClick = (
    selection: string,
    odds: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    
    const bet = {
      id: `${match.id}-${selection}`,
      matchId: match.id,
      teams: `${match.homeTeam} vs ${match.awayTeam}`,
      selection,
      odds,
      type: '1X2'
    };
    
    addBet(bet);
  };

  return (
    <div 
      className="bg-gray-800 rounded-lg p-4 mb-3 shadow-md hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-400">{match.league}</div>
        <div className="flex items-center text-sm text-gray-400">
          {match.isLive ? (
            <div className="flex items-center">
              <Activity size={14} className="text-red-500 mr-1" />
              <span className="text-red-500 font-medium">LIVE</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{match.startTime}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-medium">{match.homeTeam}</span>
            {match.isLive && <span className="ml-2 text-white font-bold">{match.homeScore}</span>}
          </div>
          <div className="flex items-center mt-1">
            <span className="font-medium">{match.awayTeam}</span>
            {match.isLive && <span className="ml-2 text-white font-bold">{match.awayScore}</span>}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <OddsButton 
            label="1" 
            odds={match.homeOdds} 
            onClick={(e) => handleOddsClick('Home', match.homeOdds, e)} 
          />
          <OddsButton 
            label="X" 
            odds={match.drawOdds} 
            onClick={(e) => handleOddsClick('Draw', match.drawOdds, e)} 
          />
          <OddsButton 
            label="2" 
            odds={match.awayOdds} 
            onClick={(e) => handleOddsClick('Away', match.awayOdds, e)} 
          />
        </div>
      </div>
    </div>
  );
};

interface OddsButtonProps {
  label: string;
  odds: number;
  onClick: (e: React.MouseEvent) => void;
}

const OddsButton: React.FC<OddsButtonProps> = ({ label, odds, onClick }) => {
  return (
    <button 
      className="bg-gray-700 hover:bg-gray-600 active:bg-green-700 px-4 py-2 rounded-md text-center transition-colors"
      onClick={onClick}
    >
      <div className="text-xs text-gray-300">{label}</div>
      <div className="font-semibold text-white">{odds.toFixed(2)}</div>
    </button>
  );
};

export default MatchCard;