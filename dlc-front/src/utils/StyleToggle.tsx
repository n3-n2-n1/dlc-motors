import React, { useState, useEffect } from 'react';

const ThemeToggleButton: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className="relative inline-block w-14 h-8 cursor-pointer select-none"
      onClick={handleToggle}
    >
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300 ease-in-out"></div>
      <div
        className={`absolute left-1 top-1 bg-white dark:bg-gray-900 w-6 h-6 rounded-full transition transform duration-300 ease-in-out ${
          darkMode ? 'translate-x-6' : ''
        }`}
      ></div>
    </div>
  );
};

export default ThemeToggleButton;
