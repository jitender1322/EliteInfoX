import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/ThemeContext";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const intervalRef = useRef(null);

  console.log(
    "useAuthGuard - isAuthenticated:",
    isAuthenticated,
    "loading:",
    loading,
    "pathname:",
    location.pathname
  );

  useEffect(() => {
    console.log(
      "useAuthGuard useEffect - isAuthenticated:",
      isAuthenticated,
      "loading:",
      loading
    );

    // Check authentication immediately
    if (
      !loading &&
      !isAuthenticated &&
      location.pathname.startsWith("/admin")
    ) {
      console.log("useAuthGuard - redirecting to login immediately");
      navigate("/admin/login", { replace: true });
      return;
    }

    // Set up periodic authentication checks when authenticated
    if (isAuthenticated && location.pathname.startsWith("/admin")) {
      intervalRef.current = setInterval(() => {
        checkAuth();
      }, 30000); // Check every 30 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, loading, location.pathname, navigate, checkAuth]);

  // Handle visibility change (when user switches tabs or comes back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        !document.hidden &&
        isAuthenticated &&
        location.pathname.startsWith("/admin")
      ) {
        checkAuth();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isAuthenticated, location.pathname, checkAuth]);

  return { isAuthenticated, loading };
};
