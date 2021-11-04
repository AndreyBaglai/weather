import React from 'react';

interface IProps {
  handler?: any;
  classBtn: string;
  id?: string;
}

const Button: React.FC<IProps> = ({ handler, classBtn, children }) => {
  return (
    <button className={classBtn} onClick={handler}>
      {children}
    </button>
  );
};

export default Button;
