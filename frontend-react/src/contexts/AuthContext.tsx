import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  id: number;
  name: string;
  email: string;
  role_id: number;
  department_id: number;
}

interface AuthContextType {
  userData: UserData | null;
  employees: UserData[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [employees, setEmployees] = useState<UserData[]>([]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
        setEmployees(data.employees || []);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUserData(null);
    setEmployees([]);
  };

  return (
    <AuthContext.Provider value={{ userData, employees, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 