import React, { createContext, useState, useCallback } from "react";
import * as authService from "../services/auth";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password);
    setUser(result.user || null);
    setToken(result.token || null);
    return result;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
