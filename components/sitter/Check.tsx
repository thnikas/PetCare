import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type Props = {
  checked: boolean,
  label: string,
  icon: string,
  classC: string,
  setState: (value: string) => void,
  size: string,
  object: any,
  iconsSize: number,
  textStyle: string
}

const Check = ({ checked, label, icon, classC, setState, size, object, iconsSize, textStyle }: Props) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    // Accessing window object in useEffect to ensure it runs on the client side
    if (typeof window !== 'undefined') {
      // Your code that depends on the window object can go here
      // Example: const windowWidth = window.innerWidth;
    }
  }, []);

  const change = () => {
    if (isChecked) {
      setIsChecked(false);
      setState({ ...object, [size]: false });
    } else {
      setIsChecked(true);
      setState({ ...object, [size]: true });
    }
  };

  return (
    <div className={classC}>
      <div className="checkbox-wrapper">
        <input
          className={isChecked ? 'checked' : ''}
          type="checkbox"
          checked={isChecked}
          onChange={() => change()}
        />
      </div>
      <Image
        src={icon}
        width={typeof window !== 'undefined' ? window.innerWidth / iconsSize + 7 : 35}
        height={typeof window !== 'undefined' ? window.innerWidth / iconsSize + 7 : 35}
        alt="sDog"
      />
      <h4 className={textStyle}>{label}</h4>
    </div>
  );
};

export default Check;
