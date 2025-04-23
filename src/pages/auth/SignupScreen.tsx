import React from 'react';
import { DollarSign } from 'lucide-react';
import AuthForm from '../../components/auth/AuthForm';

const SignupScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 rounded-full p-3 inline-flex">
              <DollarSign size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-green-500">Create</span>
            <span className="text-white"> Account</span>
          </h1>
          <p className="text-gray-400">Join the winning team today</p>
        </div>
        
        <AuthForm type="signup" />
      </div>
    </div>
  );
};

export default SignupScreen;