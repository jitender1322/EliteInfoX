import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    {
      id: "travel",
      name: "Travel",
      color: "text-pink-500",
      bgColor: "bg-pink-100",
      icon: () => <span>✈️</span>,
    },
    {
      id: "fitness",
      name: "Fitness",
      color: "text-green-500",
      bgColor: "bg-green-100",
      icon: () => <span>💪</span>,
    },
    {
      id: "politics",
      name: "Politics",
      color: "text-red-500",
      bgColor: "bg-red-100",
      icon: () => <span>🏛️</span>,
    },
    {
      id: "technology",
      name: "Technology",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      icon: () => <span>💻</span>,
    },
  ];

  const articles = [
    {
      id: 1,
      title: "Exploring the Alps",
      category: "travel",
      image: "🏔️",
      excerpt: "A quick guide to the most scenic spots in the Alps.",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: "5-Minute Home Workouts",
      category: "fitness",
      image: "🏋️",
      excerpt: "Get fit fast with these simple home exercises.",
      readTime: "2 min read",
    },
    {
      id: 3,
      title: "The Future of AI",
      category: "technology",
      image: "🤖",
      excerpt: "What's next for artificial intelligence?",
      readTime: "4 min read",
    },
  ];

  // 🔎 Filter articles based on category and search
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ✅ Fix for bug: safely handle category-based navigation
  useEffect(() => {
    if (["travel", "fitness", "politics", "technology"].includes(currentPage)) {
      setSelectedCategory(currentPage);
      setCurrentPage("articles");
    }
  }, [currentPage]);

  // 🔄 Render the correct page based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            darkMode={darkMode}
            categories={categories}
            articles={articles}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
        );
      case "about":
        return <AboutPage darkMode={darkMode} />;
      case "contact":
        return <ContactPage darkMode={darkMode} />;
      case "articles":
        return (
          <ArticlesPage
            darkMode={darkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            articles={filteredArticles}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return (
          <HomePage
            darkMode={darkMode}
            categories={categories}
            articles={articles}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default App;
