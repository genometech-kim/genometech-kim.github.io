import { Link } from '@tanstack/react-router';
import type { NavItem as NavItemType } from '@/data/navigation';

interface NavItemProps {
  item: NavItemType;
  className?: string;
  onClick?: () => void;
}

/** 각 메뉴 버튼 */
export const NavItem = ({ item, className, onClick }: NavItemProps) => {
  if (item.children && item.children.length > 0) {
    return (
      <div className="group relative h-full">
        <Link to={item.href} onClick={onClick} className={className}>
          {item.label}
        </Link>
        <ul className="absolute left-0 top-full z-20 hidden w-full overflow-hidden rounded-b-md bg-white shadow-md group-hover:block">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                to={child.href}
                className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-primary"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Link to={item.href} onClick={onClick} className={className}>
      {item.label}
    </Link>
  );
};
