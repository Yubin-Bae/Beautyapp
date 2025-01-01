import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children }) => {
  return <h2 className="card-title">{children}</h2>;
};

export { Card, CardHeader, CardContent, CardTitle };
