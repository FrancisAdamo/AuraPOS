export type UserRole = 'owner' | 'vendor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  storeId?: string; // Para multisucursal
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_POS: 'view_pos',
  VIEW_INVENTORY: 'view_inventory',
  VIEW_CLOSING: 'view_closing',
  MANAGE_USERS: 'manage_users',
  MANAGE_STORES: 'manage_stores',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: Object.values(PERMISSIONS),
  vendor: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_POS,
    PERMISSIONS.VIEW_INVENTORY,
  ],
};
