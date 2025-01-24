import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Branding */}
        <div className="text-2xl font-bold mb-4">
          Expense
          <span className="text-yellow-300 dark:text-yellow-500">Tracker</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-4 text-gray-600 dark:text-gray-300 text-sm mb-4">
          <a
            href="#about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            About
          </a>
          <a
            href="#features"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </a>
        </div>

        {/* Copyright and Socials */}
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <i className="fab fa-facebook text-lg"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <i className="fab fa-twitter text-lg"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <i className="fab fa-linkedin text-lg"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <i className="fab fa-github text-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
