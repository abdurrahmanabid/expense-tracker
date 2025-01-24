import React from "react";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import backgroundLight from "../../assets/SVG/heroLightSVG.svg";
import background from "../../assets/SVG/heroSVG.svg";
import heroLottie from "./../../assets/lottie/coding.json";

const Hero = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: heroLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const theme = useSelector((state) => state.theme);

  // Set appropriate background image based on theme
  const backgroundImage = theme ? background : backgroundLight;
  const textColor = theme ? "text-white" : "text-gray-800";
  const buttonColor = theme
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-gray-800 hover:bg-gray-900";
  const overlayColor = theme ? "bg-black opacity-40" : "bg-gray-200 opacity-60";

  return (
    <div className="relative w-full h-screen">
      <img
        src={backgroundImage}
        alt="background"
        className="w-full h-screen object-cover"
      />
      <div className={`absolute inset-0 ${overlayColor}`}></div>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${textColor} max-w-5xl w-full px-4`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0">
          {/* Text and Button */}
          <div className="text-center md:text-left md:mr-10">
            <h1 className="md:text-5xl text-3xl font-semibold mb-4 leading-tight">
              Track Your Expenses with Ease!
            </h1>
            <p className="text-lg mb-6 opacity-80">
              Effortlessly manage your finances and stay on top of your spending
              with our intuitive expense tracker.
            </p>
            <Link to="/signup">
              <button
                className={`px-8 py-4 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${buttonColor}`}
              >
                Get Started
              </button>
            </Link>
          </div>

          {/* Lottie Animation */}
          <div className="mt-6 md:mt-0">
            <Lottie options={lottieOptions} height={350} width={350} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
