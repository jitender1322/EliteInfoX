import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS
AOS.init({
  duration: 800, // animation duration
  easing: "ease-in-out", // smoothness
  once: true, // animate only once
});

// Create root and render app
const root = createRoot(document.getElementById("root"));
root.render(<App />);
