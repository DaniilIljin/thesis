import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for the context
interface JwtContextType {
  token: string | null;
  setJwtToken: (token: string) => void;
  clearJwtToken: () => void;
}

// Create the context with a default value of `null` for the token
const JwtContext = createContext<JwtContextType | undefined>(undefined);

// Define the provider component
interface JwtProviderProps {
  children: ReactNode;
}

export const JwtProvider: React.FC<JwtProviderProps> = ({ children }) => {
  // State to hold the JWT token
  const [token, setToken] = useState<string | null>(null);

  // Load token from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to set JWT token and store it in localStorage
  const setJwtToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
  };

  // Function to clear JWT token from state and localStorage
  const clearJwtToken = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
  };

  // Provide the context values
  return (
      <JwtContext.Provider value={{ token, setJwtToken, clearJwtToken }}>
        {children}
      </JwtContext.Provider>
  );
};

// Custom hook to use the JWT context
export const useJwt = (): JwtContextType => {
  const context = useContext(JwtContext);
  if (!context) {
    throw new Error('useJwt must be used within a JwtProvider');
  }
  return context;
};
