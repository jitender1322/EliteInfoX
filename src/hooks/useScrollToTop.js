import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/ThemeContext";

export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

// Hook to prevent back navigation after logout
export const usePreventBackNavigation = (isAuthenticated) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      if (!isAuthenticated) {
        // Prevent going back to admin routes if not authenticated
        if (window.location.pathname.startsWith("/admin")) {
          navigate("/admin/login", { replace: true });
        }
      }
    };

    // Also check on page load/visibility change
    const handleVisibilityChange = () => {
      if (!isAuthenticated && window.location.pathname.startsWith("/admin")) {
        navigate("/admin/login", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, navigate]);
};

// Hook to prevent navigation to admin routes when not authenticated
export const useAdminRouteProtection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // If not loading and not authenticated, and trying to access admin routes
    if (
      !loading &&
      !isAuthenticated &&
      location.pathname.startsWith("/admin")
    ) {
      // Don't redirect if already on login page
      if (location.pathname !== "/admin/login") {
        navigate("/admin/login", { replace: true });
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  return { isAuthenticated, loading };
};
