import React, { useState } from 'react';
import MatchCard from '../components/matches/MatchCard';
import { Wallpaper as SoccerBall, Dribbble as DribbbleLogo, Trophy } from 'lucide-react';

// Mock data for upcoming matches
const footballMatches = [
  {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    startTime: 'Today, 20:00',
    homeOdds: 2.7,
    drawOdds: 3.4,
    awayOdds: 2.5
  },
  {
    id: '2',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    league: 'La Liga',
    startTime: 'Tomorrow, 19:45',
    homeOdds: 1.9,
    drawOdds: 3.5,
    awayOdds: 3.8
  },
  {
    id: '3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    league: 'Bundesliga',
    startTime: 'Tomorrow, 17:30',
    homeOdds: 1.6,
    drawOdds: 4.0,
    awayOdds: 5.0
  },
  {
    id: '4',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    league: 'Ligue 1',
    startTime: 'Sat, 20:00',
    homeOdds: 1.4,
    drawOdds: 4.5,
    awayOdds: 7.0
  }
];

const basketballMatches = [
  {
    id: '5',
    homeTeam: 'LA Lakers',
    awayTeam: 'Golden State Warriors',
    league: 'NBA',
    startTime: 'Today, 22:00',
    homeOdds: 2.2,
    drawOdds: 15.0,
    awayOdds: 1.7
  },
  {
    id: '6',
    homeTeam: 'Boston Celtics',
    awayTeam: 'Miami Heat',
    league: 'NBA',
    startTime: 'Tomorrow, 01:30',
    homeOdds: 1.6,
    drawOdds: 15.0,
    awayOdds: 2.4
  }
];

const tennisMatches = [
  {
    id: '7',
    homeTeam: 'Novak Djokovic',
    awayTeam: 'Rafael Nadal',
    league: 'ATP Masters',
    startTime: 'Sat, 14:00',
    homeOdds: 1.8,
    drawOdds: 12.0,
    awayOdds: 2.0
  },
  {
    id: '8',
    homeTeam: 'Serena Williams',
    awayTeam: 'Naomi Osaka',
    league: 'WTA Tour',
    startTime: 'Sun, 16:30',
    homeOdds: 2.2,
    drawOdds: 12.0,
    awayOdds: 1.7
  }
];

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('football');
  
  return (
    <div className="p-4">
      {/* Sports Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-4 mb-4">
        <button
          className={`flex items-center px-4 py-2 rounded-full flex-shrink-0 ${
            activeTab === 'football' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-800 text-gray-300'
          }`}
          onClick={() => setActiveTab('football')}
        >
          <SoccerBall size={16} className="mr-2" />
          <span>Football</span>
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-full flex-shrink-0 ${
            activeTab === 'basketball' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-800 text-gray-300'
          }`}
          onClick={() => setActiveTab('basketball')}
        >
          <DribbbleLogo size={16} className="mr-2" />
          <span>Basketball</span>
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-full flex-shrink-0 ${
            activeTab === 'tennis' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-800 text-gray-300'
          }`}
          onClick={() => setActiveTab('tennis')}
        >
          <Trophy size={16} className="mr-2" />
          <span>Tennis</span>
        </button>
      </div>
      
      {/* Featured Games */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Featured Games</h2>
        <div className="bg-gradient-to-r from-green-600 to-green-400 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-green-100">Champions League • Tomorrow, 20:45</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-white">Man City</span>
              <span className="text-xl font-bold mt-2">1.85</span>
            </div>
            <div className="text-center">
              <span className="text-sm text-white opacity-80">Draw</span>
              <div className="text-xl font-bold mt-2">3.50</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-white">Chelsea</span>
              <span className="text-xl font-bold mt-2">4.20</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Matches */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Upcoming Matches</h2>
        
        {activeTab === 'football' && (
          <div>
            {footballMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
        
        {activeTab === 'basketball' && (
          <div>
            {basketballMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
        
        {activeTab === 'tennis' && (
          <div>
            {tennisMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;