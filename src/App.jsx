import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CategoriesPage from "./pages/CategoriesPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { articles } from "./data/articles";
import { categories } from "./data/categories";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { darkMode } = useTheme();

  // Filter articles based on category and search
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? article.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
        <div className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    articles={filteredArticles}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />
              <Route
                path="/categories"
                element={
                  <CategoriesPage
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />
              <Route
                path="/articles"
                element={
                  <ArticlesPage
                    articles={filteredArticles}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
