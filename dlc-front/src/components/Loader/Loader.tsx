import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 10000); // Espera 1 segundo antes de ocultar el loader
    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    showLoader && (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="border-8 border-blue-500 border-t-transparent rounded-full animate-spin h-16 w-16"></div>
      </div>

    )
  );
};

export default Loader;