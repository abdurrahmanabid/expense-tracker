import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import notFoundLottie from "../assets/lottie/404 Error Page.json";

const NotFound = () => {
  const navigate = useNavigate();
    const lottieOptions = {
      loop: true,
      autoplay: true,
      animationData: notFoundLottie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-gray-700 dark:text-gray-200">
      {/* Lottie Animation */}
      <div className="w-2/3 max-w-md mb-8">
        <Lottie options={lottieOptions} height={350} width={350} />
      </div>

      {/* Error Message */}
      <h1 className="text-4xl font-bold mb-4 text-center">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-center mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Go Back Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
      >
        Go Back to Homepage
      </button>
    </div>
  );
};

export default NotFound;
