import React from "react";

const MaintenancePage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-16">
    <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400 animate-fade-in">
      This Page is Under Maintenance
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-delay">
      We're working hard to bring you this content soon. Please check back
      later!
    </p>
    <span className="text-6xl animate-pulse animate-bounce">🚧</span>
    <style jsx>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out;
      }
      .animate-fade-in-delay {
        animation: fadeIn 0.8s ease-out 0.3s both;
      }
    `}</style>
  </div>
);

export default MaintenancePage;
