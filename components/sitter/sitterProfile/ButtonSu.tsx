import React, { useState } from 'react';

const ButtonAnimation = () => {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
      setTimeout(() => {
        // Perform any additional actions here
      }, 1250);
    }, 2250);
  };

  const buttonClass = `buttonSub ${isActive ? 'onclic' : ''} ${isActive ? 'validate' : ''} `;

  return (
    <div className='containerSub'>  
      <button id="buttonSub" className={buttonClass} onClick={handleButtonClick}>
      </button>
    </div>
  );
};

export default ButtonAnimation;