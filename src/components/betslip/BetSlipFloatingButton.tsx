import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt } from 'lucide-react';
import { useBetSlip } from '../../contexts/BetSlipContext';

const BetSlipFloatingButton: React.FC = () => {
  const navigate = useNavigate();
  const { bets } = useBetSlip();
  
  return (
    <button
      onClick={() => navigate('/app/betslip')}
      className="fixed bottom-20 right-4 bg-green-500 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
    >
      <Receipt size={20} className="mr-2" />
      <span className="font-semibold">Bet Slip ({bets.length})</span>
    </button>
  );
};

export default BetSlipFloatingButton;