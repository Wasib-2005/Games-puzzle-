import React from "react";
import { Link } from "react-router-dom";

const ErrorCommingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {/* Big Glowy Title */}
      <h1 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-[0_0_15px_#00f7ff]">
        🚧 Coming Soon 🚧
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-2xl text-gray-300 mt-4">
        This page is under construction...  
        <br />
        Check back later for more awesome games!
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default ErrorCommingSoon;
