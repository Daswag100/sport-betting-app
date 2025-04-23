import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBetSlip } from '../contexts/BetSlipContext';

// Mock match data
const matchDetails = {
  '1': {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    startTime: 'Today, 20:00',
    homeOdds: 2.7,
    drawOdds: 3.4,
    awayOdds: 2.5,
    stadium: 'Old Trafford',
    homeForm: 'WWDLW',
    awayForm: 'DWWDL',
    markets: {
      '1X2': [
        { name: 'Home', odds: 2.7 },
        { name: 'Draw', odds: 3.4 },
        { name: 'Away', odds: 2.5 }
      ],
      'Double Chance': [
        { name: '1X', odds: 1.5 },
        { name: '12', odds: 1.3 },
        { name: 'X2', odds: 1.4 }
      ],
      'Over/Under 2.5': [
        { name: 'Over', odds: 1.9 },
        { name: 'Under', odds: 1.9 }
      ],
      'Both Teams to Score': [
        { name: 'Yes', odds: 1.8 },
        { name: 'No', odds: 2.0 }
      ]
    }
  },
  '2': {
    id: '2',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    league: 'La Liga',
    startTime: 'Tomorrow, 19:45',
    homeOdds: 1.9,
    drawOdds: 3.5,
    awayOdds: 3.8,
    stadium: 'Camp Nou',
    homeForm: 'WWWDW',
    awayForm: 'WWWLW',
    markets: {
      '1X2': [
        { name: 'Home', odds: 1.9 },
        { name: 'Draw', odds: 3.5 },
        { name: 'Away', odds: 3.8 }
      ],
      'Double Chance': [
        { name: '1X', odds: 1.2 },
        { name: '12', odds: 1.3 },
        { name: 'X2', odds: 1.8 }
      ],
      'Over/Under 2.5': [
        { name: 'Over', odds: 1.7 },
        { name: 'Under', odds: 2.1 }
      ],
      'Both Teams to Score': [
        { name: 'Yes', odds: 1.6 },
        { name: 'No', odds: 2.3 }
      ]
    }
  },
  // Add more matches as needed...
};

const MatchDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addBet } = useBetSlip();
  const [activeTab, setActiveTab] = useState('1X2');
  
  // Get match details based on id
  const match = id ? matchDetails[id as keyof typeof matchDetails] : null;
  
  if (!match) {
    return <div className="p-4 text-center">Match not found</div>;
  }

  const handleBetSelection = (marketName: string, selection: string, odds: number) => {
    const bet = {
      id: `${match.id}-${marketName}-${selection}`,
      matchId: match.id,
      teams: `${match.homeTeam} vs ${match.awayTeam}`,
      selection,
      odds,
      type: marketName
    };
    
    addBet(bet);
  };

  return (
    <div className="p-4">
      {/* Match Header */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-400 mb-1">{match.league} • {match.startTime}</div>
        <div className="text-lg font-semibold mb-1">{match.homeTeam} vs {match.awayTeam}</div>
        <div className="text-sm text-gray-400 mb-3">{match.stadium}</div>
        
        <div className="flex space-x-4 text-sm">
          <div>
            <span className="text-gray-400 mr-2">Home Form:</span>
            <span className="font-medium">{match.homeForm}</span>
          </div>
          <div>
            <span className="text-gray-400 mr-2">Away Form:</span>
            <span className="font-medium">{match.awayForm}</span>
          </div>
        </div>
      </div>
      
      {/* Market Tabs */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex space-x-2">
          {Object.keys(match.markets).map(market => (
            <button
              key={market}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === market 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-800 text-gray-300'
              }`}
              onClick={() => setActiveTab(market)}
            >
              {market}
            </button>
          ))}
        </div>
      </div>
      
      {/* Betting Options */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">{activeTab}</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {match.markets[activeTab as keyof typeof match.markets].map((option, index) => (
            <button
              key={index}
              className="bg-gray-700 hover:bg-gray-600 active:bg-green-700 p-3 rounded-lg transition-colors"
              onClick={() => handleBetSelection(activeTab, option.name, option.odds)}
            >
              <div className="text-sm mb-1">{option.name}</div>
              <div className="text-lg font-semibold">{option.odds.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Market Statistics */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Match Statistics</h3>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Goals Scored (avg per match)</span>
              </div>
              <div className="flex items-center">
                <div className="text-center w-10">{match.homeTeam.substring(0, 3).toUpperCase()}</div>
                <div className="flex-1 mx-2">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="text-center w-10">2.1</div>
              </div>
              <div className="flex items-center mt-2">
                <div className="text-center w-10">{match.awayTeam.substring(0, 3).toUpperCase()}</div>
                <div className="flex-1 mx-2">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
                <div className="text-center w-10">1.7</div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Clean Sheets (%)</span>
              </div>
              <div className="flex items-center">
                <div className="text-center w-10">{match.homeTeam.substring(0, 3).toUpperCase()}</div>
                <div className="flex-1 mx-2">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div className="text-center w-10">40%</div>
              </div>
              <div className="flex items-center mt-2">
                <div className="text-center w-10">{match.awayTeam.substring(0, 3).toUpperCase()}</div>
                <div className="flex-1 mx-2">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="text-center w-10">30%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsScreen;