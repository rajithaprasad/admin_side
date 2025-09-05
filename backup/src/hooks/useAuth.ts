import { useState } from "react";

interface User {
  email: string;
  role: "admin" | "driver" | "user";
  name: string;
}

const mockUsers = {
  "admin@mail.com": { email: "admin@mail.com", password: "123", role: "admin" as const, name: "Admin User" },
  "driver@mail.com": { email: "driver@mail.com", password: "123", role: "driver" as const, name: "Driver User" },
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth-user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string): boolean => {
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    if (mockUser && mockUser.password === password) {
      const userInfo = { email: mockUser.email, role: mockUser.role, name: mockUser.name };
      setUser(userInfo);
      localStorage.setItem("auth-user", JSON.stringify(userInfo));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
  };

  const register = (email: string, password: string, name: string): boolean => {
    // Mock registration - in real app this would call an API
    const userInfo = { email, role: "user" as const, name };
    setUser(userInfo);
    localStorage.setItem("auth-user", JSON.stringify(userInfo));
    return true;
  };

  return { user, login, logout, register };
}