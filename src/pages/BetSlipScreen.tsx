import React, { useState } from 'react';
import BetCard from '../components/betslip/BetCard';
import { useBetSlip } from '../contexts/BetSlipContext';
import { AlertCircle } from 'lucide-react';

const BetSlipScreen: React.FC = () => {
  const { 
    bets, 
    isSingleMode, 
    stake,
    estimatedReturn,
    toggleBetMode, 
    updateStake,
    placeBet
  } = useBetSlip();
  
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);

  const handleStakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      updateStake(value);
    }
  };

  const handlePlaceBet = async () => {
    setIsPlacingBet(true);
    
    try {
      await placeBet();
      setBetPlaced(true);
      
      // Reset UI after showing success
      setTimeout(() => {
        setBetPlaced(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPlacingBet(false);
      setShowConfirmation(false);
    }
  };

  if (bets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="bg-gray-800 p-4 rounded-full mb-4">
          <AlertCircle size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Your bet slip is empty</h3>
        <p className="text-gray-400 mb-6">Select some bets to add them to your slip</p>
      </div>
    );
  }

  if (betPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="bg-green-500 p-4 rounded-full mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Bet Placed Successfully!</h3>
        <p className="text-gray-400">You can view your bets in the My Bets section</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Bet Mode Toggle */}
      <div className="bg-gray-800 rounded-lg p-2 flex mb-4">
        <button
          className={`flex-1 py-2 rounded-md transition-colors ${
            isSingleMode 
              ? 'bg-green-500 text-white' 
              : 'text-gray-400'
          }`}
          onClick={() => isSingleMode ? null : toggleBetMode()}
        >
          Single
        </button>
        <button
          className={`flex-1 py-2 rounded-md transition-colors ${
            !isSingleMode 
              ? 'bg-green-500 text-white' 
              : 'text-gray-400'
          }`}
          onClick={() => isSingleMode ? toggleBetMode() : null}
        >
          Parlay
        </button>
      </div>
      
      {/* Bet Cards */}
      <div className="mb-4">
        {bets.map(bet => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
      
      {/* Bet Slip Summary */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Stake (NGN)</label>
          <input
            type="number"
            min="100"
            value={stake}
            onChange={handleStakeChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Type</span>
            <span>{isSingleMode ? 'Single' : 'Parlay'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Number of Selections</span>
            <span>{bets.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Odds</span>
            <span>
              {isSingleMode 
                ? 'Multiple' 
                : bets.reduce((total, bet) => total * bet.odds, 1).toFixed(2)
              }
            </span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Potential Winnings</span>
            <span className="text-green-400">₦{estimatedReturn.toLocaleString()}</span>
          </div>
        </div>
        
        <button
          onClick={() => setShowConfirmation(true)}
          disabled={isPlacingBet}
          className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors ${
            isPlacingBet ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isPlacingBet ? 'Placing Bet...' : 'Place Bet'}
        </button>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Your Bet</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Stake:</span>
                <span>₦{stake.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Potential Winnings:</span>
                <span className="text-green-400">₦{estimatedReturn.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceBet}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BetSlipScreen;