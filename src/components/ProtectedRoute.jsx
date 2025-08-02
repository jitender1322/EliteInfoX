import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ThemeContext";
import { useAuthGuard } from "../hooks/useAuthGuard";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(
    "ProtectedRoute - isAuthenticated:",
    isAuthenticated,
    "loading:",
    loading,
    "pathname:",
    location.pathname
  );

  // Use the auth guard for additional protection
  useAuthGuard();

  // Handle browser back button and authentication checks
  useEffect(() => {
    console.log(
      "ProtectedRoute useEffect - isAuthenticated:",
      isAuthenticated,
      "loading:",
      loading
    );

    const handlePopState = () => {
      console.log("PopState event - isAuthenticated:", isAuthenticated);
      if (!isAuthenticated) {
        console.log("Redirecting to login due to popstate");
        navigate("/admin/login", { replace: true });
      }
    };

    const handleVisibilityChange = () => {
      console.log("Visibility change - isAuthenticated:", isAuthenticated);
      if (!isAuthenticated && location.pathname.startsWith("/admin")) {
        console.log("Redirecting to login due to visibility change");
        navigate("/admin/login", { replace: true });
      }
    };

    // Check authentication on mount
    if (!loading && !isAuthenticated) {
      console.log("Redirecting to login on mount - not authenticated");
      navigate("/admin/login", { replace: true });
    }

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
