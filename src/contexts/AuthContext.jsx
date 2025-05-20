import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function parseJwt(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("parseJwt error:", err);
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const u = parseJwt(token);
      if (u) {
        setUser(u);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const u = parseJwt(token);
      if (u) {
        setUser(u);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    const u = parseJwt(token);
    if (u) {
      setUser(u);
      setIsLoggedIn(true);
    } else {
      console.warn("Invalid token, logging out");
      localStorage.removeItem("token");
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setCurrentView("login");
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        currentView,
        handleLogin,
        handleLogout,
        handleNavigation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
