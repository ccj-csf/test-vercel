'use client';

import Image from 'next/image';
import React from 'react';

interface LogoProps {
  size?: number;
}

const LogoIcon: React.FC<LogoProps> = ({ size = 48 }) => {
  return <Image src="/icons/logo.svg" alt="Logo" width={size} height={size} />;
};

export { LogoIcon };
