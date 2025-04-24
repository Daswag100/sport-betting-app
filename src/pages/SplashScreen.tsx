import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DollarSign } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      navigate('/app');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <div className="bg-green-500 rounded-full p-4 inline-flex mb-4">
          <DollarSign size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-green-500">EgbonAdugbo</span>
          <span className="text-white">Bet</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          The ultimate sports betting experience. Place bets on your favorite sports and win big!
        </p>
      </div>
      
      <button
        onClick={() => navigate('/login')}
        className="w-full max-w-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg mb-4 transition-colors"
      >
        Get Started
      </button>
      
      <div className="text-center text-gray-500 text-sm">
        <p>By continuing, you agree to our</p>
        <p>
          <a href="#" className="text-green-400 hover:text-green-500">Terms of Service</a>
          {' & '}
          <a href="#" className="text-green-400 hover:text-green-500">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
