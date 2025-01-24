import { Menu, Moon, Sun, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../feature/theme/themeSlice";
import { checkLogin } from "../feature/user/userSlice";
import getNavbarOptions from "../objStore/nabData";

const ExpenseNavbar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme); // Adjust if your state structure is different.

  const [activeDropdown, setActiveDropdown] = useState(null); // For dropdown
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // For mobile drawer
  const navbarOptions = getNavbarOptions()

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  const handleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id)); // Toggle dropdown
  };

  return (
    <div className={`${isDarkMode && "dark"}`}>
      {/* Navbar */}
      <nav className="relative z-50 bg-blue-600 text-white shadow-md dark:bg-gray-800 dark:text-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">
              Expense
              <span className="text-yellow-300 dark:text-yellow-500">
                Tracker
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-6">
            {navbarOptions.map((option) => (
              <li
                key={option.id}
                className="relative"
                onMouseEnter={() => handleDropdown(option.id)}
                onMouseLeave={() => handleDropdown(null)}
                // onClick={option.action??option.action}
              >
                <Link
                  to={option.path}
                  className="flex items-center space-x-2 hover:text-yellow-300 dark:hover:text-yellow-500"
                >
                  <option.icon className="h-5 w-5" />
                  <span>{option.label}</span>
                </Link>

                {/* Dropdown Menu */}
                {option.dropdown && activeDropdown === option.id && (
                  <ul className="absolute left-0 top-full mt-2 bg-white dark:bg-gray-700 shadow-md rounded-md z-50" onClick={() => setActiveDropdown(null)}>
                    {option.dropdown.map((drop) => (
                      <li
                        key={drop.id}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <Link to={drop.path}>{drop.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <button
            className="ml-4 p-2 rounded-full bg-yellow-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-gray-500"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="text-gray-800 dark:text-yellow-300 h-6 w-6" />
            ) : (
              <Moon className="text-gray-800 dark:text-yellow-300 h-6 w-6" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <Menu className="h-6 w-6 text-white dark:text-gray-200" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full bg-blue-600 text-white dark:bg-gray-800 dark:text-gray-200 shadow-lg w-64 transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <div className="text-2xl font-bold">
            Expense
            <span className="text-yellow-300 dark:text-yellow-500">
              Tracker
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <ul className="mt-4 space-y-4 px-4">
          {navbarOptions.map((option) => (
            <li key={option.id}>
              <Link
                to={option.path}
                className="flex items-center space-x-2 hover:text-yellow-300 dark:hover:text-yellow-500"
                onClick={() => setIsDrawerOpen(false)}
              >
                <option.icon className="h-5 w-5" />
                <span>{option.label}</span>
              </Link>

              {/* Dropdown Menu */}
              {option.dropdown && (
                <ul className="ml-6 space-y-2 mt-2">
                  {option.dropdown.map((drop) => (
                    <li key={drop.id}>
                      <Link
                        to={drop.path}
                        className="hover:text-yellow-300 dark:hover:text-yellow-500"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        {drop.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseNavbar;
