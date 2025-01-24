module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Include only the necessary files in your project
    "!./node_modules/**/*", // Exclude node_modules to improve performance
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
