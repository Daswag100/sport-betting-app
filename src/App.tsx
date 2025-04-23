import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BetSlipProvider } from './contexts/BetSlipContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';

// Pages
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/auth/LoginScreen';
import SignupScreen from './pages/auth/SignupScreen';
import HomeScreen from './pages/HomeScreen';
import LiveScreen from './pages/LiveScreen';
import MatchDetailsScreen from './pages/MatchDetailsScreen';
import BetSlipScreen from './pages/BetSlipScreen';
import MyBetsScreen from './pages/MyBetsScreen';
import WalletScreen from './pages/WalletScreen';
import ProfileScreen from './pages/ProfileScreen';

// Layouts
import MainLayout from './layouts/MainLayout';

// Auth protection
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/app" replace /> : <SplashScreen />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/app" replace /> : <LoginScreen />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/app" replace /> : <SignupScreen />} />
      
      {/* Main App Routes */}
      <Route path="/app" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<HomeScreen />} />
        <Route path="live" element={<LiveScreen />} />
        <Route path="match/:id" element={<MatchDetailsScreen />} />
        <Route path="betslip" element={<BetSlipScreen />} />
        <Route path="mybets" element={<MyBetsScreen />} />
        <Route path="wallet" element={<WalletScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BetSlipProvider>
          <Router>
            <AppRoutes />
          </Router>
        </BetSlipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;