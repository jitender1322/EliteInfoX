const API_BASE_URL = "http://localhost:5000/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }
  return response.json();
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Include cookies for authentication
    ...options,
  };

  const response = await fetch(url, config);
  return handleResponse(response);
};

// Categories API
export const categoriesAPI = {
  // Get all categories (public endpoint for frontend)
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(response);
  },

  // Get single category (public endpoint for frontend)
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    return handleResponse(response);
  },

  // Admin endpoints (require authentication)
  adminGetAll: async () => {
    return apiRequest("/admin/categories");
  },

  adminGetById: async (id) => {
    return apiRequest(`/admin/categories/${id}`);
  },

  adminCreate: async (categoryData) => {
    return apiRequest("/admin/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  },

  adminUpdate: async (id, categoryData) => {
    return apiRequest(`/admin/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  },

  adminDelete: async (id) => {
    return apiRequest(`/admin/categories/${id}`, {
      method: "DELETE",
    });
  },
};

// Articles API
export const articlesAPI = {
  // Get all articles (public endpoint for frontend)
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/articles`);
    return handleResponse(response);
  },

  // Get single article (public endpoint for frontend)
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`);
    return handleResponse(response);
  },

  // Get articles by category (public endpoint for frontend)
  getByCategory: async (category) => {
    const response = await fetch(
      `${API_BASE_URL}/articles?category=${category}`
    );
    return handleResponse(response);
  },

  // Admin endpoints (require authentication)
  adminGetAll: async () => {
    return apiRequest("/admin/articles");
  },

  adminGetById: async (id) => {
    return apiRequest(`/admin/articles/${id}`);
  },

  adminCreate: async (articleData) => {
    const url = `${API_BASE_URL}/admin/articles`;
    const isFormData = articleData instanceof FormData;

    const config = {
      method: "POST",
      credentials: "include",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? articleData : JSON.stringify(articleData),
    };

    const response = await fetch(url, config);
    return handleResponse(response);
  },

  adminUpdate: async (id, articleData) => {
    const url = `${API_BASE_URL}/admin/articles/${id}`;
    const isFormData = articleData instanceof FormData;

    const config = {
      method: "PUT",
      credentials: "include",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? articleData : JSON.stringify(articleData),
    };

    const response = await fetch(url, config);
    return handleResponse(response);
  },

  adminDelete: async (id) => {
    return apiRequest(`/admin/articles/${id}`, {
      method: "DELETE",
    });
  },
};

// Admin authentication API
export const adminAPI = {
  login: async (credentials) => {
    return apiRequest("/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiRequest("/admin/logout", {
      method: "POST",
    });
  },

  getProfile: async () => {
    return apiRequest("/admin/profile");
  },

  getDashboard: async () => {
    return apiRequest("/admin/dashboard");
  },
};
