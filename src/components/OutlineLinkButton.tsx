import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

interface OutlineLinkButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const OutlineLinkButton = ({ to, children, className }: OutlineLinkButtonProps) => {
  return (
    <Link
      to={to}
      className={`flex w-24 items-center justify-center rounded-sm border border-gray-300 px-3 py-1 text-sm text-gray-500 ${className ?? ''}`}
    >
      {children}
    </Link>
  );
};
