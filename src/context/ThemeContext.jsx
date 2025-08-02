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
      console.log("Checking authentication...");
      const response = await adminAPI.getProfile();
      console.log("Auth check response:", response);
      if (response && response.admin) {
        setAdminProfile(response.admin);
        setIsAuthenticated(true);
        console.log("User is authenticated:", response.admin);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      setAdminProfile(null);
      // Clear any cached authentication data
      localStorage.removeItem("adminAuth");
      sessionStorage.removeItem("adminAuth");
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");
      console.log("User is not authenticated");
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on mount and when window gains focus
  useEffect(() => {
    checkAuth();

    const handleFocus = () => {
      // Re-check authentication when window gains focus
      if (isAuthenticated) {
        checkAuth();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [isAuthenticated]); // Added isAuthenticated to dependencies

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

      // Clear all possible storage locations
      localStorage.removeItem("adminAuth");
      sessionStorage.removeItem("adminAuth");
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");
      localStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("isAuthenticated");

      // Clear any other potential auth-related items
      Object.keys(localStorage).forEach((key) => {
        if (key.includes("admin") || key.includes("auth")) {
          localStorage.removeItem(key);
        }
      });

      Object.keys(sessionStorage).forEach((key) => {
        if (key.includes("admin") || key.includes("auth")) {
          sessionStorage.removeItem(key);
        }
      });
    }
  };

  // Remove duplicate useEffect - checkAuth is already called in the first useEffect

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
