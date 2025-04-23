import React, { createContext, useState, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface Bet {
  id: string;
  matchId: string;
  teams: string;
  selection: string;
  odds: number;
  type: string;
}

interface BetSlipContextType {
  bets: Bet[];
  isSingleMode: boolean;
  stake: number;
  estimatedReturn: number;
  addBet: (bet: Bet) => void;
  removeBet: (id: string) => void;
  toggleBetMode: () => void;
  updateStake: (amount: number) => void;
  clearBetSlip: () => void;
  placeBet: () => Promise<void>;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export const BetSlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [isSingleMode, setIsSingleMode] = useState<boolean>(true);
  const [stake, setStake] = useState<number>(100);
  const { profile } = useAuth();

  const addBet = (bet: Bet) => {
    if (bets.some(existingBet => existingBet.id === bet.id)) {
      setBets(bets.map(existingBet => 
        existingBet.id === bet.id ? bet : existingBet
      ));
    } else {
      setBets([...bets, bet]);
    }
  };

  const removeBet = (id: string) => {
    setBets(bets.filter(bet => bet.id !== id));
  };

  const toggleBetMode = () => {
    setIsSingleMode(!isSingleMode);
  };

  const updateStake = (amount: number) => {
    setStake(amount);
  };

  const clearBetSlip = () => {
    setBets([]);
    setStake(100);
  };

  const calculateEstimatedReturn = (): number => {
    if (bets.length === 0) return 0;

    if (isSingleMode) {
      return bets.reduce((total, bet) => total + (bet.odds * stake), 0);
    } else {
      const totalOdds = bets.reduce((total, bet) => total * bet.odds, 1);
      return totalOdds * stake;
    }
  };

  const estimatedReturn = calculateEstimatedReturn();

  const placeBet = async (): Promise<void> => {
    if (!profile) throw new Error('User not authenticated');
    if (bets.length === 0) throw new Error('No bets selected');
    if (stake <= 0) throw new Error('Invalid stake amount');
    if (stake > (profile.balance || 0)) throw new Error('Insufficient balance');

    const { data: betData, error: betError } = await supabase
      .from('bets')
      .insert({
        user_id: profile.id,
        type: isSingleMode ? 'Single' : 'Parlay',
        stake: stake,
        potential_win: estimatedReturn,
        status: 'Active'
      })
      .select()
      .single();

    if (betError) throw betError;

    // Insert bet selections
    const selections = bets.map(bet => ({
      bet_id: betData.id,
      match_id: bet.matchId,
      selection: bet.selection,
      odds: bet.odds
    }));

    const { error: selectionsError } = await supabase
      .from('bet_selections')
      .insert(selections);

    if (selectionsError) throw selectionsError;

    // Record transaction
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: profile.id,
        type: 'bet',
        amount: stake,
        status: 'completed'
      });

    if (transactionError) throw transactionError;

    clearBetSlip();
  };

  return (
    <BetSlipContext.Provider 
      value={{ 
        bets, 
        isSingleMode, 
        stake, 
        estimatedReturn,
        addBet, 
        removeBet, 
        toggleBetMode, 
        updateStake,
        clearBetSlip,
        placeBet
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlip = (): BetSlipContextType => {
  const context = useContext(BetSlipContext);
  if (context === undefined) {
    throw new Error('useBetSlip must be used within a BetSlipProvider');
  }
  return context;
};