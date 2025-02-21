// src/components/atoms/Avatar.tsx
import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export const Avatar = ({ src, alt, className }: AvatarProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-10 h-10 rounded-full ${className}`}
    />
  );
};