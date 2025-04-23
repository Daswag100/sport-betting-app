import React, { useState } from 'react';
import BetHistoryCard from '../components/bets/BetHistoryCard';

// Mock data for bets
const activeBets = [
  {
    id: '1001',
    date: '2025-02-01 20:45',
    teams: ['Manchester United vs Liverpool'],
    selections: ['Home'],
    odds: [2.7],
    type: 'Single' as const,
    stake: 1000,
    potentialWin: 2700,
    status: 'Active' as const
  },
  {
    id: '1002',
    date: '2025-02-02 18:30',
    teams: ['Barcelona vs Real Madrid', 'Bayern Munich vs Dortmund'],
    selections: ['Draw', 'Home'],
    odds: [3.5, 1.6],
    type: 'Parlay' as const,
    stake: 500,
    potentialWin: 2800,
    status: 'Active' as const
  }
];

const settledBets = [
  {
    id: '1003',
    date: '2025-01-28 19:00',
    teams: ['Arsenal vs Chelsea'],
    selections: ['Away'],
    odds: [3.2],
    type: 'Single' as const,
    stake: 1000,
    potentialWin: 3200,
    status: 'Won' as const
  },
  {
    id: '1004',
    date: '2025-01-25 15:30',
    teams: ['Juventus vs Inter Milan'],
    selections: ['Draw'],
    odds: [3.0],
    type: 'Single' as const,
    stake: 2000,
    potentialWin: 6000,
    status: 'Lost' as const
  },
  {
    id: '1005',
    date: '2025-01-20 18:00',
    teams: ['PSG vs Lyon', 'Milan vs Napoli', 'Atletico vs Sevilla'],
    selections: ['Home', 'Away', 'Home'],
    odds: [1.5, 2.8, 1.9],
    type: 'Parlay' as const,
    stake: 500,
    potentialWin: 3990,
    status: 'Lost' as const
  }
];

const MyBetsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg p-2 flex mb-4">
        <button
          className={`flex-1 py-2 rounded-md transition-colors ${
            activeTab === 'active' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Bets
        </button>
        <button
          className={`flex-1 py-2 rounded-md transition-colors ${
            activeTab === 'settled' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('settled')}
        >
          Settled Bets
        </button>
      </div>
      
      {/* Bet Lists */}
      {activeTab === 'active' && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Active Bets ({activeBets.length})</h2>
          
          {activeBets.length === 0 ? (
            <div className="text-center py-6 bg-gray-800 rounded-lg">
              <p className="text-gray-400">You have no active bets</p>
            </div>
          ) : (
            <div>
              {activeBets.map(bet => (
                <BetHistoryCard key={bet.id} bet={bet} />
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'settled' && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Settled Bets ({settledBets.length})</h2>
          
          {settledBets.length === 0 ? (
            <div className="text-center py-6 bg-gray-800 rounded-lg">
              <p className="text-gray-400">You have no settled bets</p>
            </div>
          ) : (
            <div>
              {settledBets.map(bet => (
                <BetHistoryCard key={bet.id} bet={bet} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBetsScreen;