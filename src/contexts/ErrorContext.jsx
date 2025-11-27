import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Show error with auto-clear
  const showError = (message, duration = 5000) => {
    setError(message);
    setSuccess(null); // Clear success when showing error
    if (duration) {
      setTimeout(() => setError(null), duration);
    }
  };

  // Show success with auto-clear
  const showSuccess = (message, duration = 3000) => {
    setSuccess(message);
    setError(null); // Clear error when showing success
    if (duration) {
      setTimeout(() => setSuccess(null), duration);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  const value = {
    error,
    success,
    setError: showError,
    setSuccess: showSuccess,
    clearError,
    clearSuccess,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};
