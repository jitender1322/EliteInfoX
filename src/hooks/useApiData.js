import { useState, useEffect } from "react";
import { categoriesAPI, articlesAPI } from "../services/api";
import { categories as localCategories } from "../data/categories";
import { articles as localArticles } from "../data/articles";

// Custom hook for categories
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesAPI.getAll();
        setCategories(response.data);
      } catch (err) {
        console.warn(
          "Failed to fetch categories from API, using local data:",
          err.message
        );
        // Fallback to local data
        setCategories(localCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Custom hook for articles
export const useArticles = (categoryFilter = null) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        let response;

        if (categoryFilter) {
          response = await articlesAPI.getByCategory(categoryFilter);
        } else {
          response = await articlesAPI.getAll();
        }

        setArticles(response.data);
      } catch (err) {
        console.warn(
          "Failed to fetch articles from API, using local data:",
          err.message
        );
        // Fallback to local data with filtering
        let filteredArticles = localArticles;
        if (categoryFilter) {
          filteredArticles = localArticles.filter(
            (article) => article.category === categoryFilter
          );
        }
        setArticles(filteredArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryFilter]);

  return { articles, loading, error };
};

// Custom hook for single article
export const useArticle = (id) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await articlesAPI.getById(id);
        setArticle(response.data);
      } catch (err) {
        console.warn(
          "Failed to fetch article from API, using local data:",
          err.message
        );
        // Fallback to local data
        const localArticle = localArticles.find(
          (article) => article.id === parseInt(id)
        );
        setArticle(localArticle || null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
};

// Custom hook for single category
export const useCategory = (id) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await categoriesAPI.getById(id);
        setCategory(response.data);
      } catch (err) {
        console.warn(
          "Failed to fetch category from API, using local data:",
          err.message
        );
        // Fallback to local data
        const localCategory = localCategories.find(
          (category) => category.id === id
        );
        setCategory(localCategory || null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  return { category, loading, error };
};
