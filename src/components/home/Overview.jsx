import React from "react";
import lowerSvg from "../../assets/SVG/belowSVG.svg";

const Overview = () => {
  return (
    <section className="relative w-full py-16 bg-gray-100 dark:bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-x-0 bottom-0">
        <img
          src={lowerSvg}
          alt="Background Decoration"
          className="w-full object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-semibold text-center text-gray-800 dark:text-white mb-8">
          Overview of Your Expense Tracker
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Our expense tracker is designed to help you effortlessly manage your
          finances and gain insights into your spending habits. With an
          easy-to-use interface, you can track your expenses, categorize your
          transactions, and set budgeting goals to stay on top of your financial
          health.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Whether you're saving for a specific goal or simply need to keep track
          of daily expenses, our app provides the tools you need to monitor your
          finances effectively. Start today and take control of your financial
          future.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center">
          <a
            href="#features"
            className="px-8 py-4 bg-black hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Overview;
