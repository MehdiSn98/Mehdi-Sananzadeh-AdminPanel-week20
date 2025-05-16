import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  const handleLogin = async (token) => {
    localStorage.setItem("token", token);
    try {
      const res = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setIsLoggedIn(true);
    } catch {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUser(null);
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
