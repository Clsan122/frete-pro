
import React from "react";
import { User } from "@/types";

// Define the shape of the AuthContext
export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; temporaryPassword?: string }>;
  logout: () => void;
  setUser: (user: User) => void;
};

// Create the context with a default empty implementation
export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => ({ success: false }),
  logout: () => {},
  setUser: () => {},
});
