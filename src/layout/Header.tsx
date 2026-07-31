import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import logo from '@/assets/main_logo.png';
import { navigation } from '@/data/navigation';
import { NavItem } from '@/components/NavItem';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** 모바일 메뉴 열기 함수 */
  const openMobileMenu = () => {
    setIsMenuOpen(true);
  };
  /** 모바일 메뉴 닫기 함수 */
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="w-full bg-white h-25">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-6">
          {/* 연구실 로고 이미지 */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="laboratory of genome technology main logo" />
          </Link>

          {/* 데스크탑 메뉴 - 메뉴 추가, 수정은 /src/data/navigation.ts 파일에서 합니다. */}
          <nav className="hidden md:flex items-center h-full text-[18px] font-[600]">
            {navigation.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                className="flex h-full items-center px-6 border-b-2 border-transparent hover:border-primary hover:text-primary"
              />
            ))}
          </nav>

          {/* 모바일 더보기 아이콘 */}
          <button className="md:hidden" onClick={openMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMobileMenu} />
    </>
  );
};
