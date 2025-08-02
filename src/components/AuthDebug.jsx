import { useEffect } from "react";
import { useAuth } from "../context/ThemeContext";
import { adminAPI } from "../services/api";

const AuthDebug = () => {
  const { isAuthenticated, loading, adminProfile } = useAuth();

  useEffect(() => {
    const testAuth = async () => {
      console.log("=== AUTH DEBUG START ===");
      console.log("Current auth state:", {
        isAuthenticated,
        loading,
        adminProfile,
      });

      try {
        console.log("Testing adminAPI.getProfile()...");
        const response = await adminAPI.getProfile();
        console.log("getProfile response:", response);
      } catch (error) {
        console.log("getProfile error:", error);
      }

      console.log("=== AUTH DEBUG END ===");
    };

    testAuth();
  }, [isAuthenticated, loading, adminProfile]);

  return (
    <div
      style={{
        display:"none",
        position: "fixed",
        top: 10,
        right: 10,
        background: "red",
        color: "white",
        padding: "10px",
        zIndex: 9999,
      }}
    >
      <div>Auth: {isAuthenticated ? "YES" : "NO"}</div>
      <div>Loading: {loading ? "YES" : "NO"}</div>
      <div>Profile: {adminProfile ? "YES" : "NO"}</div>
    </div>
  );
};

export default AuthDebug;
