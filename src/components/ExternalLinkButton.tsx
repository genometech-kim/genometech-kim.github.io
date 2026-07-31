import type { ReactNode } from 'react';

interface ExternalLinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const ExternalLinkButton = ({ href, children, className }: ExternalLinkButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex w-24 items-center justify-center rounded-sm border border-gray-300 px-3 py-1 text-sm text-gray-500 hover:border-primary hover:text-primary ${className ?? ''}`}
    >
      {children}
    </a>
  );
};
