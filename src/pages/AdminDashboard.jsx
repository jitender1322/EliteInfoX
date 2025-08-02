import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiBarChart,
  FiSettings,
  FiX,
  FiSave,
  FiImage,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import { categoriesAPI, articlesAPI } from "../services/api";
import { usePreventBackNavigation } from "../hooks/useScrollToTop";
import { useAuth } from "../context/ThemeContext";
import { renderFormattedContent } from "../utils/contentRenderer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, adminProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalCategories: 0,
    publishedArticles: 0,
    draftArticles: 0,
  });
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    icon: "FiGlobe",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  });

  const [articleForm, setArticleForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    image: null,
    readTime: "",
    date: "",
    status: "published",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const iconOptions = [
    { value: "FiGlobe", label: "Globe" },
    { value: "FiActivity", label: "Activity" },
    { value: "FiTrendingUp", label: "Trending" },
    { value: "FiCpu", label: "CPU" },
    { value: "FiCode", label: "Code" },
    { value: "FiSmartphone", label: "Smartphone" },
    { value: "FiShield", label: "Shield" },
    { value: "FiCloud", label: "Cloud" },
  ];

  const colorOptions = [
    { value: "text-blue-600", bgColor: "bg-blue-100", label: "Blue" },
    { value: "text-green-600", bgColor: "bg-green-100", label: "Green" },
    { value: "text-purple-600", bgColor: "bg-purple-100", label: "Purple" },
    { value: "text-red-600", bgColor: "bg-red-100", label: "Red" },
    { value: "text-yellow-600", bgColor: "bg-yellow-100", label: "Yellow" },
    { value: "text-indigo-600", bgColor: "bg-indigo-100", label: "Indigo" },
  ];

  // Use the hook to prevent back navigation after logout
  usePreventBackNavigation(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load categories
      const categoriesResponse = await categoriesAPI.adminGetAll();
      setCategories(categoriesResponse.data);

      // Load articles
      const articlesResponse = await articlesAPI.adminGetAll();
      setArticles(articlesResponse.data);

      // Calculate stats
      const publishedArticles = articlesResponse.data.filter(
        (article) => article.status === "published"
      );
      const draftArticles = articlesResponse.data.filter(
        (article) => article.status === "draft"
      );

      setStats({
        totalArticles: articlesResponse.data.length,
        totalCategories: categoriesResponse.data.length,
        publishedArticles: publishedArticles.length,
        draftArticles: draftArticles.length,
      });
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      // If unauthorized, redirect to login
      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      // Clear browser history and redirect to login
      navigate("/admin/login", { replace: true });

      // Clear any remaining browser state
      if (window.history && window.history.pushState) {
        // Push a new state to prevent back navigation
        window.history.pushState(null, null, "/admin/login");
        window.history.pushState(null, null, "/admin/login");
        window.history.go(-1);
      }

      // Force a page reload to clear any cached state
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);

      // Even if logout fails, redirect to login and clear history
      navigate("/admin/login", { replace: true });

      // Clear browser state even on error
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, "/admin/login");
        window.history.pushState(null, null, "/admin/login");
        window.history.go(-1);
      }

      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 100);
    }
  };

  // Category functions
  const openCategoryModal = (category = null) => {
    if (category) {
      setEditingItem(category);
      setCategoryForm({
        name: category.name,
        description: category.description || "",
        icon: category.icon || "FiGlobe",
        color: category.color || "text-blue-600",
        bgColor: category.bgColor || "bg-blue-100",
      });
    } else {
      setEditingItem(null);
      setCategoryForm({
        name: "",
        description: "",
        icon: "FiGlobe",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      });
    }
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await categoriesAPI.adminUpdate(editingItem.id, categoryForm);
      } else {
        await categoriesAPI.adminCreate(categoryForm);
      }
      setShowCategoryModal(false);
      loadDashboardData();
    } catch (error) {
      alert("Failed to save category: " + error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await categoriesAPI.adminDelete(id);
        loadDashboardData();
      } catch (error) {
        alert("Failed to delete category: " + error.message);
      }
    }
  };

  // Article functions
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleForm((prev) => ({ ...prev, image: file }));
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const openArticleModal = (article = null) => {
    if (article) {
      setEditingItem(article);
      setArticleForm({
        title: article.title,
        description: article.description || "",
        content: article.content || "",
        category: article.category || "",
        image: null,
        readTime: article.readTime || "",
        date: article.date || new Date().toISOString().split("T")[0],
        status: article.status || "published",
      });
      setImagePreview(article.image || null);
    } else {
      setEditingItem(null);
      setArticleForm({
        title: "",
        description: "",
        content: "",
        category: "",
        image: null,
        readTime: "",
        date: new Date().toISOString().split("T")[0],
        status: "published",
      });
      setImagePreview(null);
    }
    setShowArticleModal(true);
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "content",
      "category",
      "readTime",
      "date",
    ];
    const missingFields = requiredFields.filter((field) => !articleForm[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(articleForm).forEach((key) => {
        if (key === "image" && articleForm[key]) {
          formData.append("image", articleForm[key]);
        } else {
          formData.append(key, articleForm[key]);
        }
      });

      if (editingItem) {
        await articlesAPI.adminUpdate(editingItem.id, formData);
      } else {
        await articlesAPI.adminCreate(formData);
      }
      setShowArticleModal(false);
      loadDashboardData();
    } catch (error) {
      console.error("Article submission error:", error);
      alert(
        "Failed to save article: " + (error.message || "Unknown error occurred")
      );
    }
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await articlesAPI.adminDelete(id);
        loadDashboardData();
      } catch (error) {
        alert("Failed to delete article: " + error.message);
      }
    }
  };

  const viewItem = (item, type) => {
    setViewingItem({ ...item, type });
    setShowViewModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                EliteInfoX Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {adminProfile?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <FiLogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", name: "Overview", icon: FiBarChart },
              { id: "categories", name: "Categories", icon: FiGrid },
              { id: "articles", name: "Articles", icon: FiFileText },
              { id: "settings", name: "Settings", icon: FiSettings },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <FiFileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Articles
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stats.totalArticles}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <FiFileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Published
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stats.publishedArticles}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                      <FiFileText className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Drafts
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stats.draftArticles}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <FiGrid className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Categories
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stats.totalCategories}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Articles */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Articles
                </h3>
                <div className="space-y-4">
                  {articles.slice(0, 5).map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {categories.find((cat) => cat.id === article.category)
                            ?.name || article.category}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            article.status === "published"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {article.status}
                        </span>
                        <button
                          onClick={() => viewItem(article, "article")}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Categories
                </h2>
                <button
                  onClick={() => openCategoryModal()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                >
                  <FiPlus className="h-5 w-5 mr-2" />
                  Add New Category
                </button>
              </div>

              <div className="card">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Articles
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {category.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {category.description}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {
                              articles.filter(
                                (article) => article.category === category.id
                              ).length
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => viewItem(category, "category")}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                              >
                                <FiEye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => openCategoryModal(category)}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                              >
                                <FiEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                                className="text-red-600 hover:text-red-700 dark:text-red-400"
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "articles" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Articles
                </h2>
                <button
                  onClick={() => openArticleModal()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                >
                  <FiPlus className="h-5 w-5 mr-2" />
                  Add New Article
                </button>
              </div>

              <div className="card">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Article
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {articles.map((article) => (
                        <tr key={article.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {article.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {categories.find(
                              (cat) => cat.id === article.category
                            )?.name || article.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                article.status === "published"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }`}
                            >
                              {article.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {article.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => viewItem(article, "article")}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                              >
                                <FiEye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => openArticleModal(article)}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                              >
                                <FiEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(article.id)}
                                className="text-red-600 hover:text-red-700 dark:text-red-400"
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Settings
              </h2>
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Admin Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {adminProfile?.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Role
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {adminProfile?.role}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Member Since
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(adminProfile?.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingItem ? "Edit Category" : "Add Category"}
                </h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) =>
                      setCategoryForm({
                        ...categoryForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Icon
                  </label>
                  <select
                    value={categoryForm.icon}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, icon: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Color Theme
                  </label>
                  <select
                    value={categoryForm.color}
                    onChange={(e) => {
                      const selected = colorOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      setCategoryForm({
                        ...categoryForm,
                        color: e.target.value,
                        bgColor: selected.bgColor,
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <FiSave className="h-4 w-4 mr-2" />
                    {editingItem ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingItem ? "Edit Article" : "Add New Article"}
                </h3>
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleArticleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={articleForm.description}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Content
                  </label>
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => {
                          const textarea =
                            document.getElementById("content-textarea");
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = articleForm.content;
                          const before = text.substring(0, start);
                          const selected = text.substring(start, end);
                          const after = text.substring(end);
                          const newText =
                            before + "**" + selected + "**" + after;
                          setArticleForm({ ...articleForm, content: newText });
                          setTimeout(() => {
                            textarea.focus();
                            textarea.setSelectionRange(start + 2, end + 2);
                          }, 0);
                        }}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                      >
                        Bold
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea =
                            document.getElementById("content-textarea");
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = articleForm.content;
                          const before = text.substring(0, start);
                          const selected = text.substring(start, end);
                          const after = text.substring(end);
                          const newText = before + "*" + selected + "*" + after;
                          setArticleForm({ ...articleForm, content: newText });
                          setTimeout(() => {
                            textarea.focus();
                            textarea.setSelectionRange(start + 1, end + 1);
                          }, 0);
                        }}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                      >
                        Italic
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea =
                            document.getElementById("content-textarea");
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = articleForm.content;
                          const before = text.substring(0, start);
                          const selected = text.substring(start, end);
                          const after = text.substring(end);
                          const newText = before + "`" + selected + "`" + after;
                          setArticleForm({ ...articleForm, content: newText });
                          setTimeout(() => {
                            textarea.focus();
                            textarea.setSelectionRange(start + 1, end + 1);
                          }, 0);
                        }}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                      >
                        Code
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea =
                            document.getElementById("content-textarea");
                          const start = textarea.selectionStart;
                          const text = articleForm.content;
                          const before = text.substring(0, start);
                          const after = text.substring(start);
                          const newText = before + "\n\n---\n\n" + after;
                          setArticleForm({ ...articleForm, content: newText });
                          setTimeout(() => {
                            textarea.focus();
                            textarea.setSelectionRange(start + 6, start + 6);
                          }, 0);
                        }}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                      >
                        Divider
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <p>Formatting Guide:</p>
                      <p>
                        • <strong>**text**</strong> for bold text
                      </p>
                      <p>
                        • <em>*text*</em> for italic text
                      </p>
                      <p>
                        • <code>`code`</code> for inline code
                      </p>
                      <p>
                        • <code>---</code> for horizontal divider
                      </p>
                      <p>• Press Enter twice for new paragraphs</p>
                    </div>
                  </div>
                  <textarea
                    id="content-textarea"
                    value={articleForm.content}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        content: e.target.value,
                      })
                    }
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                    placeholder="Enter article content...

Use formatting:
**Bold text**
*Italic text*
`Code snippet`

Press Enter twice for new paragraphs.

---

Add dividers between sections."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={articleForm.category}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={articleForm.status}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          status: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-32 w-48 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={articleForm.readTime}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          readTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="5 min read"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={articleForm.date}
                      onChange={(e) =>
                        setArticleForm({ ...articleForm, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowArticleModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <FiSave className="h-4 w-4 mr-2" />
                    {editingItem ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  View{" "}
                  {viewingItem.type === "category" ? "Category" : "Article"}
                </h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              {viewingItem.type === "category" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {viewingItem.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {viewingItem.description || "No description"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Icon
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {viewingItem.icon}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Articles Count
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {
                        articles.filter(
                          (article) => article.category === viewingItem.id
                        ).length
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {viewingItem.title}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {viewingItem.description}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Content
                    </label>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                      {viewingItem.content ? (
                        <div className="prose prose-sm max-w-none">
                          {renderFormattedContent(viewingItem.content)}
                        </div>
                      ) : (
                        "No content"
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {categories.find(
                          (cat) => cat.id === viewingItem.category
                        )?.name || viewingItem.category}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </label>
                      <span
                        className={`mt-1 inline-block px-2 py-1 text-xs rounded-full ${
                          viewingItem.status === "published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {viewingItem.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {viewingItem.date}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Read Time
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {viewingItem.readTime}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Image
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {viewingItem.image || "No image"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
