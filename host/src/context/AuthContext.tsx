import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: any | null;
  login: (token: string, userData?: any) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  const login = (token: string, userData?: any) => {
    sessionStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    if (userData) {
      setUser(userData);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('authToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const response = await fetch('http://localhost:8080/auth/checkStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
