import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { useError } from './ErrorContext'; // Import global error context

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with true to check auth on mount
  const { setError } = useError(); // Global error setter

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // If token exists, set user as authenticated
      setUser({ token, isAuthenticated: true });
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    
    try {
      const response = await authService.register(userData);
      
      // Set user data from response
      setUser({
        ...response.user,
        email: userData.email,
        username: userData.username,
        full_name: userData.full_name,
        token: response.access_token,
        isAuthenticated: true
      });
      
      return response;
    } catch (err) {
      // Set global error
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    
    try {
      const response = await authService.login(loginData);
      
      // Set user data from response
      setUser({
        ...response.user,
        email: loginData.email,
        token: response.access_token,
        isAuthenticated: true
      });
      
      return response;
    } catch (err) {
      // Set global error
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
    setError(null); // Clear errors on logout
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
