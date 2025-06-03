import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  width = 200, 
  height = 80 
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/images/bbps-logo2.jpg"
        alt="Big Brother Property Solutions Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo; 