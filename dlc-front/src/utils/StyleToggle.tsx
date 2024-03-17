import React, { useState, useEffect } from 'react';

const ThemeToggleButton: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)} className='rounded-full bg-black dark:bg-gray-100 dark:text-gray-700 p-4 text-white text-sm pt-4 hover:bg-blue-700'>
      {darkMode ? 'Go Light Mode' : 'Go Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
