import type { ReactNode } from 'react';
import sectionTitleCircle from '@/assets/section_title_circle.png';

interface ProfileSectionProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export const ProfileSection = ({ title, children, className }: ProfileSectionProps) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <img src={sectionTitleCircle} alt="" loading="lazy" />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
};
