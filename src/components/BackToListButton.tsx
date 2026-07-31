import { OutlineLinkButton } from '@/components/OutlineLinkButton';

interface BackToListButtonProps {
  to: string;
  className?: string;
}

export const BackToListButton = ({ to, className }: BackToListButtonProps) => {
  return (
    <OutlineLinkButton to={to} className={className}>
      목록
    </OutlineLinkButton>
  );
};
