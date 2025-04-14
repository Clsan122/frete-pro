
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser, setCurrentUser, logoutUser } from "@/utils/storage";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  forgotPassword: (email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  setUser: () => {},
  forgotPassword: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in on component mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserState(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from local storage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Find user with matching email and password
      const user = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (user) {
        // Remove password from user object before storing in state
        const { password: _, ...userWithoutPassword } = user;
        
        setUserState(userWithoutPassword);
        setIsAuthenticated(true);
        setCurrentUser(userWithoutPassword);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get users from local storage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user with email already exists
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        return false;
      }
      
      // Create new user
      const newUser = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        name,
        email,
        phone: "", // Add default empty phone to meet User type requirements
        password, // In a real app, this would be hashed
      };
      
      // Add new user to users array
      users.push(newUser);
      
      // Save users array to local storage
      localStorage.setItem("users", JSON.stringify(users));
      
      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUserState(userWithoutPassword);
      setIsAuthenticated(true);
      setCurrentUser(userWithoutPassword);
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      // Get users from local storage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user with email exists
      const existingUser = users.find((u: any) => u.email === email);
      if (!existingUser) {
        return false;
      }
      
      // In a real app, you would send a password reset email here
      console.log(`Password reset requested for email: ${email}`);
      
      return true;
    } catch (error) {
      console.error("Forgot password error:", error);
      return false;
    }
  };

  const logout = () => {
    setUserState(null);
    setIsAuthenticated(false);
    logoutUser();
  };

  const setUser = (updatedUser: User) => {
    setUserState(updatedUser);
    // Also update the user in localStorage to keep it in sync
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        register, 
        logout, 
        setUser,
        forgotPassword 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
