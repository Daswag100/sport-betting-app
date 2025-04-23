import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionCardProps {
  transaction: {
    id: string;
    type: 'deposit' | 'withdrawal' | 'bet' | 'win';
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    description?: string;
  };
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'deposit':
        return <ArrowDownLeft size={20} className="text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight size={20} className="text-red-500" />;
      case 'bet':
        return <ArrowUpRight size={20} className="text-red-500" />;
      case 'win':
        return <ArrowDownLeft size={20} className="text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700">
      <div className="flex items-center">
        <div className="bg-gray-800 p-2 rounded-full mr-3">
          {getTransactionIcon()}
        </div>
        <div>
          <div className="font-medium">
            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
          </div>
          <div className="text-xs text-gray-400">{transaction.date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-semibold ${
          transaction.type === 'deposit' || transaction.type === 'win' 
            ? 'text-green-500' 
            : 'text-red-500'
        }`}>
          {transaction.type === 'deposit' || transaction.type === 'win' ? '+' : '-'}
          ₦{transaction.amount.toLocaleString()}
        </div>
        <div className={`text-xs ${getStatusColor()}`}>
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;