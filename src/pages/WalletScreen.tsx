import React from 'react';
import { Wallet as WalletIcon, Plus, ArrowDown } from 'lucide-react';
import TransactionCard from '../components/wallet/TransactionCard';
import { useAuth } from '../contexts/AuthContext';

// Mock data for transactions
const transactions = [
  {
    id: '1',
    type: 'deposit' as const,
    amount: 10000,
    date: '2025-02-01 10:23',
    status: 'completed' as const,
    description: 'Bank Transfer'
  },
  {
    id: '2',
    type: 'bet' as const,
    amount: 2000,
    date: '2025-02-01 12:45',
    status: 'completed' as const,
    description: 'Bet ID: 1004'
  },
  {
    id: '3',
    type: 'win' as const,
    amount: 6400,
    date: '2025-01-28 19:35',
    status: 'completed' as const,
    description: 'Bet ID: 1003'
  },
  {
    id: '4',
    type: 'withdrawal' as const,
    amount: 5000,
    date: '2025-01-25 14:10',
    status: 'completed' as const,
    description: 'Bank Transfer'
  },
  {
    id: '5',
    type: 'deposit' as const,
    amount: 20000,
    date: '2025-01-20 09:15',
    status: 'completed' as const,
    description: 'Credit Card'
  }
];

const WalletScreen: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-4">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white bg-opacity-20 p-2 rounded-full">
            <WalletIcon size={24} className="text-white" />
          </div>
          <div className="text-sm text-white text-opacity-80">Available Balance</div>
        </div>
        <div className="text-3xl font-bold text-white mb-6">
          ₦{user?.balance.toLocaleString() || '0'}
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 bg-white text-green-600 font-semibold py-2 rounded-lg flex items-center justify-center">
            <Plus size={18} className="mr-1" />
            <span>Deposit</span>
          </button>
          <button className="flex-1 bg-white bg-opacity-20 text-white font-semibold py-2 rounded-lg flex items-center justify-center">
            <ArrowDown size={18} className="mr-1" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>
      
      {/* Transactions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
        
        <div className="bg-gray-800 rounded-lg p-4">
          {transactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletScreen;