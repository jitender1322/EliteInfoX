import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Accessibility = () => {
  const location = useLocation();

  useEffect(() => {
    // Focus management for route changes
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    }
  }, [location]);

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>

      {/* Keyboard navigation instructions */}
      <div
        role="region"
        aria-label="Keyboard navigation instructions"
        className="sr-only"
      >
        <p>
          Use Tab to navigate through the menu items. Press Enter to select an
          item. Use Escape to close any open menus.
        </p>
      </div>

      {/* Focus trap for modals */}
      <div
        role="alert"
        aria-live="polite"
        className="sr-only"
        id="focus-trap-message"
      >
        Focus is trapped in this modal. Press Escape to close.
      </div>
    </>
  );
};

export default Accessibility;
