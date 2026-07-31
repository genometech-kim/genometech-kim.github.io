import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { NavItem } from '@/components/NavItem';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <>
      {/* 배경 오버레이 */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={onClose} />}

      {/* 메뉴 드로어 컨테이너 */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 메뉴 닫기 버튼 */}
        <div className="flex items-center justify-end px-4 h-25">
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* 각 메뉴 버튼 */}
        <nav className="flex flex-col">
          {navigation.map((item) => (
            <div key={item.href}>
              <NavItem
                item={item}
                onClick={onClose}
                className="block px-6 py-4 text-[18px] font-[600] hover:text-primary"
              />
              {item.children && item.children.length > 0 && (
                <div className="flex flex-col">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      onClick={onClose}
                      className="px-10 py-3 text-[15px] text-gray-600 hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};
