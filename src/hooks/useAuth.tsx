import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState, AuthContextType, Permission, UserRole } from '../types/auth';
import { ROLE_PERMISSIONS } from '../types/auth';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin Dueño',
    email: 'owner@aurapos.com',
    role: 'owner',
  },
  {
    id: '2',
    name: 'Usuario Vendedor',
    email: 'vendor@aurapos.com',
    role: 'vendor',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('aurapos_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (user && password === 'demo123') {
      localStorage.setItem('aurapos_user', JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = () => {
    localStorage.removeItem('aurapos_user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const hasPermission = (permission: string): boolean => {
    if (!state.user) return false;
    return ROLE_PERMISSIONS[state.user.role].includes(permission as Permission);
  };

  const switchRole = (role: UserRole) => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      localStorage.setItem('aurapos_user', JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    hasPermission,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
