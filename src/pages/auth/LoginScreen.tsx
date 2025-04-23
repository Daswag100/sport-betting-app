import React from 'react';
import { DollarSign } from 'lucide-react';
import AuthForm from '../../components/auth/AuthForm';

const LoginScreen: React.FC = () => {
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
            <span className="text-green-500">Welcome</span>
            <span className="text-white"> Back</span>
          </h1>
          <p className="text-gray-400">Sign in to continue betting</p>
        </div>
        
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default LoginScreen;