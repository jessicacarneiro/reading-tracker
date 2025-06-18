import React from 'react';

type ButtonProps = {
  title: string;
  onClick?: () => void;
};

function Button({ title, onClick }: ButtonProps) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;