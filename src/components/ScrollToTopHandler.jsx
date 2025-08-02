import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ThemeContext";

const ScrollToTopHandler = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle browser back button for admin routes
  useEffect(() => {
    const handlePopState = (event) => {
      // If user is not authenticated and trying to access admin routes
      if (!isAuthenticated && pathname.startsWith("/admin")) {
        // Prevent going back to admin routes
        navigate("/admin/login", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isAuthenticated, pathname, navigate]);

  return null;
};

export default ScrollToTopHandler;
