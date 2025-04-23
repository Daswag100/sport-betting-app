import React, { useState } from 'react';
import MatchCard from '../components/matches/MatchCard';
import { Wallpaper as SoccerBall, Dribbble as DribbbleLogo, Trophy } from 'lucide-react';

// Mock data for live matches
const liveFootballMatches = [
  {
    id: '101',
    homeTeam: 'Arsenal',
    awayTeam: 'Tottenham',
    league: 'Premier League',
    startTime: 'LIVE',
    homeOdds: 2.2,
    drawOdds: 3.1,
    awayOdds: 3.5,
    isLive: true,
    homeScore: 1,
    awayScore: 1
  },
  {
    id: '102',
    homeTeam: 'Juventus',
    awayTeam: 'AC Milan',
    league: 'Serie A',
    startTime: 'LIVE',
    homeOdds: 1.7,
    drawOdds: 3.5,
    awayOdds: 4.8,
    isLive: true,
    homeScore: 2,
    awayScore: 0
  },
  {
    id: '103',
    homeTeam: 'Lyon',
    awayTeam: 'Monaco',
    league: 'Ligue 1',
    startTime: 'LIVE',
    homeOdds: 2.0,
    drawOdds: 3.3,
    awayOdds: 3.8,
    isLive: true,
    homeScore: 0,
    awayScore: 0
  }
];

const liveBasketballMatches = [
  {
    id: '104',
    homeTeam: 'Chicago Bulls',
    awayTeam: 'Brooklyn Nets',
    league: 'NBA',
    startTime: 'LIVE',
    homeOdds: 1.9,
    drawOdds: 15.0,
    awayOdds: 1.9,
    isLive: true,
    homeScore: 65,
    awayScore: 72
  },
  {
    id: '105',
    homeTeam: 'Dallas Mavericks',
    awayTeam: 'LA Clippers',
    league: 'NBA',
    startTime: 'LIVE',
    homeOdds: 2.1,
    drawOdds: 15.0,
    awayOdds: 1.8,
    isLive: true,
    homeScore: 88,
    awayScore: 82
  }
];

const liveTennisMatches = [
  {
    id: '106',
    homeTeam: 'Roger Federer',
    awayTeam: 'Andy Murray',
    league: 'ATP Masters',
    startTime: 'LIVE',
    homeOdds: 1.5,
    drawOdds: 15.0,
    awayOdds: 2.7,
    isLive: true,
    homeScore: 1,
    awayScore: 0
  }
];

const LiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('football');
  
  return (
    <div className="p-4">
      {/* Live Indicator */}
      <div className="flex items-center mb-4">
        <div className="flex h-3 w-3 relative mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
        <h2 className="text-lg font-semibold">Live Matches</h2>
      </div>
      
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
          <span>Football (3)</span>
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
          <span>Basketball (2)</span>
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
          <span>Tennis (1)</span>
        </button>
      </div>
      
      {/* Live Matches */}
      <div>
        {activeTab === 'football' && (
          <div>
            {liveFootballMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
        
        {activeTab === 'basketball' && (
          <div>
            {liveBasketballMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
        
        {activeTab === 'tennis' && (
          <div>
            {liveTennisMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScreen;