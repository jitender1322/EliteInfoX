import React, { useState } from "react";
import {
  Search,
  Menu,
  X,
  Plane,
  Dumbbell,
  Building,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon,
} from "lucide-react";

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles = [
    {
      id: 1,
      title: "Top 10 Hidden Travel Destinations for 2025",
      category: "travel",
      excerpt:
        "Discover breathtaking locations off the beaten path that offer unique experiences and unforgettable memories.",
      image: "🏝️",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Complete Home Workout Guide",
      category: "fitness",
      excerpt:
        "Stay fit and healthy with these effective exercises you can do anywhere, anytime without equipment.",
      image: "💪",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Understanding Modern Political Landscapes",
      category: "politics",
      excerpt:
        "Navigate the complex world of contemporary politics with clear, unbiased insights and analysis.",
      image: "🏛️",
      readTime: "12 min read",
    },
    {
      id: 4,
      title: "AI Revolution: What's Next in 2025",
      category: "technology",
      excerpt:
        "Explore the latest technological innovations and their impact on our daily lives and future society.",
      image: "🤖",
      readTime: "10 min read",
    },
    {
      id: 5,
      title: "Sustainable Travel Tips",
      category: "travel",
      excerpt:
        "Learn how to explore the world responsibly while minimizing your environmental footprint.",
      image: "🌱",
      readTime: "6 min read",
    },
    {
      id: 6,
      title: "Mental Health & Fitness Connection",
      category: "fitness",
      excerpt:
        "Understand the powerful link between physical activity and mental wellbeing for a healthier life.",
      image: "🧠",
      readTime: "7 min read",
    },
  ];

  const categories = [
    {
      id: "travel",
      name: "Travel",
      icon: Plane,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: "fitness",
      name: "Fitness",
      icon: Dumbbell,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: "politics",
      name: "Politics",
      icon: Building,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "technology",
      name: "Technology",
      icon: Smartphone,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const Navigation = () => (
    <nav
      className={`sticky top-0 z-50 ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      } border-b transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className={`text-2xl font-bold cursor-pointer ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
              onClick={() => setCurrentPage("home")}
            >
              EliteInfoX
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {[
                "Home",
                "Travel",
                "Fitness",
                "Politics",
                "Technology",
                "About",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item.toLowerCase())}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.toLowerCase()
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-md ${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                "Home",
                "Travel",
                "Fitness",
                "Politics",
                "Technology",
                "About",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentPage(item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    currentPage === item.toLowerCase()
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      <div
        className={`${darkMode ? "bg-gray-800" : "bg-white"} transition-colors`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Bite-sized info,
              <br />
              on demand.
            </h1>
            <p
              className={`text-xl mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Quick, snappy insights across various topics.
            </p>
            <button
              onClick={() => {
                const randomCategory =
                  categories[Math.floor(Math.random() * categories.length)];
                setSelectedCategory(randomCategory.id);
                setCurrentPage("articles");
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>💎</span>
              <span>Surprise Me!</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage("articles");
                }}
                className={`${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } rounded-lg p-6 cursor-pointer transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md`}
              >
                <div
                  className={`${category.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                >
                  <IconComponent className={`h-6 w-6 ${category.color}`} />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category.name}
                </h3>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {category.id === "travel" &&
                    "Get tips and inspiration for your next adventure."}
                  {category.id === "fitness" &&
                    "Discover ways to stay fit and healthy"}
                  {category.id === "politics" &&
                    "Stay updated with the latest politics"}
                  {category.id === "technology" &&
                    "Learn about the newest tech trends and innovations"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2
          className={`text-3xl font-bold mb-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => setCurrentPage("article-" + article.id)}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{article.image}</div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {article.title}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4`}
                >
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {article.readTime}
                  </span>
                  <span
                    className={`text-sm font-medium capitalize ${
                      categories.find((cat) => cat.id === article.category)
                        ?.color || "text-gray-500"
                    }`}
                  >
                    {article.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ArticlesPage = () => (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => setCurrentPage("article-" + article.id)}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{article.image}</div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {article.title}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4`}
                >
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {article.readTime}
                  </span>
                  <span
                    className={`text-sm font-medium capitalize ${
                      categories.find((cat) => cat.id === article.category)
                        ?.color || "text-gray-500"
                    }`}
                  >
                    {article.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No articles found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const AboutPage = () => (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-8`}
        >
          <h1
            className={`text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About EliteInfoX
          </h1>
          <div
            className={`prose max-w-none ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <p className="text-lg mb-6">
              EliteInfoX is your go-to destination for bite-sized, digestible
              information across various topics. We believe that learning should
              be accessible, engaging, and efficient.
            </p>
            <h2
              className={`text-2xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Mission
            </h2>
            <p className="mb-6">
              To provide quick, accurate, and engaging insights that help you
              stay informed and make better decisions in your daily life.
              Whether you're looking for travel inspiration, fitness tips,
              political updates, or technology trends, we've got you covered.
            </p>
            <h2
              className={`text-2xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What We Offer
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Curated content across multiple categories</li>
              <li>Quick reads designed for busy lifestyles</li>
              <li>Expert insights and practical advice</li>
              <li>Regular updates on trending topics</li>
              <li>Mobile-friendly reading experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-8`}
        >
          <h1
            className={`text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Contact Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2
                className={`text-2xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Get In Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail
                    className={`h-5 w-5 ${
                      darkMode ? "text-blue-400" : "text-blue-500"
                    }`}
                  />
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    hello@EliteInfoX.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone
                    className={`h-5 w-5 ${
                      darkMode ? "text-blue-400" : "text-blue-500"
                    }`}
                  />
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin
                    className={`h-5 w-5 ${
                      darkMode ? "text-blue-400" : "text-blue-500"
                    }`}
                  />
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    123 Information Street, Data City, DC 12345
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  ></textarea>
                </div>
                <button
                  onClick={() => alert("Message sent! (This is a demo)")}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-t transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              EliteInfoX
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Bite-sized info, on demand.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className={`${
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`${
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors`}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className={`${
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors`}
            >
              Newsletter
            </a>
          </div>
        </div>
        <div
          className={`mt-6 pt-6 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } text-center`}
        >
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © 2025 EliteInfoX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    if (currentPage === "home") return <HomePage />;
    if (currentPage === "about") return <AboutPage />;
    if (currentPage === "contact") return <ContactPage />;
    if (["travel", "fitness", "politics", "technology"].includes(currentPage)) {
      setSelectedCategory(currentPage);
      setCurrentPage("articles");
      return <ArticlesPage />;
    }
    return <ArticlesPage />;
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      <Navigation />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default Navbar;
