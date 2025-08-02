import { createContext, useContext, useState, useEffect } from "react";
import { adminAPI } from "../services/api";

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Authentication Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await adminAPI.getProfile();
      setAdminProfile(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      setAdminProfile(null);
      // Clear any cached authentication data
      localStorage.removeItem("adminAuth");
      sessionStorage.removeItem("adminAuth");
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await adminAPI.login(credentials);
      if (response.success) {
        await checkAuth();
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await adminAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear authentication state regardless of API response
      setIsAuthenticated(false);
      setAdminProfile(null);
      localStorage.removeItem("adminAuth");
      sessionStorage.removeItem("adminAuth");
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminProfile,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
