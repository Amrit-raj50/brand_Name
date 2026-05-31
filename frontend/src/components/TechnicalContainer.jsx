import React from 'react';

const TechnicalContainer = ({ children, className = '' }) => {
  return (
    <div className={`relative border border-sage-light/30 ${className}`}>
      {/* Corner crosshairs */}
      <div className="absolute -top-1.5 -left-1.5 text-mint-white text-xs font-technical leading-none z-10 select-none">+</div>
      <div className="absolute -top-1.5 -right-1.5 text-mint-white text-xs font-technical leading-none z-10 select-none">+</div>
      <div className="absolute -bottom-1.5 -left-1.5 text-mint-white text-xs font-technical leading-none z-10 select-none">+</div>
      <div className="absolute -bottom-1.5 -right-1.5 text-mint-white text-xs font-technical leading-none z-10 select-none">+</div>
      {children}
    </div>
  );
};

export default TechnicalContainer;
