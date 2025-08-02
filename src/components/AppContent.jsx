import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAdminRouteProtection } from "../hooks/useScrollToTop";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import AuthDebug from "./AuthDebug";

// Lazy load all page components
const HomePage = lazy(() => import("../pages/HomePage"));
const ArticlesPage = lazy(() => import("../pages/ArticlesPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const CategoriesPage = lazy(() => import("../pages/CategoriesPage"));
const MaintenancePage = lazy(() => import("../pages/MaintenancePage"));
const CategoryDetailPage = lazy(() => import("../pages/CategoryDetailPage"));
const ArticlePage = lazy(() => import("../pages/ArticlePage"));
const AdminLoginPage = lazy(() => import("../pages/AdminLoginPage"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const AppContent = () => {
  const { darkMode } = useTheme();
  const location = useLocation();

  // Use admin route protection hook
  useAdminRouteProtection();

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <AuthDebug />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {!isAdminRoute && <Navigation />}
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<MaintenancePage />} />
              <Route path="/careers" element={<MaintenancePage />} />
              <Route path="/resources" element={<MaintenancePage />} />
              <Route path="/privacy" element={<MaintenancePage />} />
              <Route path="/terms" element={<MaintenancePage />} />
              <Route
                path="/categories/:categoryName"
                element={<CategoryDetailPage />}
              />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
};

export default AppContent;
