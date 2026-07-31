import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronDown, Home } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface PageNavProps {
  menu: {
    label: string;
    items: NavItem[];
  };
  submenu?: {
    label: string;
    items: NavItem[];
  };
}

export const PageNav = ({ menu, submenu }: PageNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<'menu' | 'submenu' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (target: 'menu' | 'submenu') => {
    setOpenDropdown((prev) => (prev === target ? null : target));
  };

  return (
    <div ref={containerRef} className="flex items-center border-b border-gray-200 bg-white">
      {/* 홈 아이콘 */}
      <Link
        to="/"
        className="flex h-12 items-center border-r border-gray-200 bg-primary px-4 text-white"
      >
        <Home size={18} />
      </Link>

      {/* 메뉴 드롭다운 */}
      <div className="relative">
        <button
          onClick={() => toggle('menu')}
          className="flex h-12 min-w-28 items-center justify-between gap-2 border-r border-gray-200 px-5 text-sm font-medium text-gray-700 hover:text-primary"
        >
          {menu.label}
          <ChevronDown
            size={16}
            className={`transition-transform ${openDropdown === 'menu' ? 'rotate-180' : ''}`}
          />
        </button>
        {openDropdown === 'menu' && (
          <ul className="absolute left-0 top-full z-20 w-full border border-gray-200 bg-white shadow-md">
            {menu.items.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 서브메뉴 드롭다운 */}
      {submenu && (
        <div className="relative">
          <button
            onClick={() => toggle('submenu')}
            className="flex h-12 min-w-28 items-center justify-between gap-2 border-r border-gray-200 px-5 text-sm font-medium text-gray-700 hover:text-primary"
          >
            {submenu.label}
            <ChevronDown
              size={16}
              className={`transition-transform ${openDropdown === 'submenu' ? 'rotate-180' : ''}`}
            />
          </button>
          {openDropdown === 'submenu' && (
            <ul className="absolute left-0 top-full z-20 w-full border border-gray-200 bg-white shadow-md">
              {submenu.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
