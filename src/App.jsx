import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTopHandler from "./components/ScrollToTopHandler";
import AppContent from "./components/AppContent";

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTopHandler />
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
