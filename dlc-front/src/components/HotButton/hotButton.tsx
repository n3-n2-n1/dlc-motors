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
      <div className="flex flex-col items-center justify-center bg-white rounded-full shadow-lg md:shadow-xl px-4 hover:bg-blue-500 hover:text-white" onClick={onClick}>
        <h3 className="text-xl font-semibold my-3 rounded rounded-2xl hover:text-white">{children}</h3>
      </div>
    </Link>
  );
};

export default HotButton;
