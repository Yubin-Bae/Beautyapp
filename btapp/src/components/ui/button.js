import React from 'react';

const Button = ({ children, size = 'medium', variant = 'default', ...props }) => {
  const className = `btn ${size} ${variant}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export { Button };
