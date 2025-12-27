import { createContext, useContext, useEffect, useState } from "react";
import { apiLogin, apiMe } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  async function refreshMe() {
    try {
      const { user } = await apiMe();
      setCurrentUser(user);
    } catch {
      localStorage.removeItem("token");
      setCurrentUser(null);
    }
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) await refreshMe();
      setInitializing(false);
    })();
  }, []);

  const login = async ({ email, password }) => {
    const { token, user } = await apiLogin(email, password);
    localStorage.setItem("token", token);
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        initializing,
        login,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
