import React from 'react';
import { Link } from 'react-router-dom';

interface HotButtonProps {
  link: string;
  children: React.ReactNode;
  text: string;
}

const HotButton: React.FC<HotButtonProps & { onClick: () => void }> = ({ link, children, onClick }) => {
  return (
    <Link to={link}>
      <div className="flex flex-col items-center justify-center bg-black text-white rounded-full shadow-lg md:shadow-xl px-4 hover:bg-gray-700 hover:text-white dark:bg-blue-700" onClick={onClick}>
        <h3 className="text-lg font-normal my-2 rounded rounded-2xl hover:text-white">{children}</h3>
      </div>
    </Link>
  );
};

export default HotButton;
