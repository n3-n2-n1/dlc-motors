import React from 'react';

interface ArrowIconProps {
  color?: string;
  className?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ color = '#3B4758', className }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <mask
      id="mask0_4_4930"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="30"
      height="30"
    >
      <rect width="30" height="30" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_4_4930)">
      <path
        d="M5.5 24.2811C5.08333 24.4478 4.6875 24.4111 4.3125 24.1711C3.9375 23.932 3.75 23.5832 3.75 23.1249V18.4686C3.75 18.177 3.83333 17.9166 4 17.6874C4.16667 17.4582 4.39583 17.3124 4.6875 17.2499L13.75 14.9999L4.6875 12.7499C4.39583 12.6874 4.16667 12.5416 4 12.3124C3.83333 12.0832 3.75 11.8228 3.75 11.5311V6.87489C3.75 6.41655 3.9375 6.06739 4.3125 5.82739C4.6875 5.58822 5.08333 5.55197 5.5 5.71864L24.75 13.8436C25.2708 14.0728 25.5312 14.4582 25.5312 14.9999C25.5312 15.5416 25.2708 15.927 24.75 16.1561L5.5 24.2811Z"
        fill={color}
      />
    </g>
  </svg>
);

export default ArrowIcon;