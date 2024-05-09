import React from 'react';
import HotButton from '../HotButton/hotButton';

interface ButtonInfo {
  text: string;
  action: () => void;
  link: string;
  isActive: boolean;
}

const Dashcards: React.FC<{ buttons: ButtonInfo[] }> = ({ buttons }) => {
  return (
    <>
      {buttons.map((button, index) => (
        <HotButton
          key={index}
          link={button.link}
          onClick={button.action}
          isActive={button.isActive}
        >
          {button.text}
        </HotButton>
      ))}
    </>
  );
};

export default Dashcards;
