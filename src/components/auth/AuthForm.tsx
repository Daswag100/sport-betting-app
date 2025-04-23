import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (type === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
      setLoading(false);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {type === 'signup' && (
        <div className="relative">
          <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            required
          />
        </div>
      )}
      
      <div className="relative">
        <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          required
        />
      </div>
      
      <div className="relative">
        <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          required
          minLength={6}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm font-medium">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span>{type === 'login' ? 'Login' : 'Create Account'}</span>
        )}
      </button>
      
      {type === 'login' ? (
        <div className="text-center text-gray-400">
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-green-400 hover:text-green-500 font-medium"
          >
            Sign up
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-green-400 hover:text-green-500 font-medium"
          >
            Login
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;