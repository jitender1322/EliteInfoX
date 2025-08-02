import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, AuthProvider } from "./context/ThemeContext";
import ScrollToTopHandler from "./components/ScrollToTopHandler";
import AppContent from "./components/AppContent";

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ScrollToTopHandler />
            <AppContent />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
