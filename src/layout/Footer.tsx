import logo from '@/assets/main_logo_gray.png';

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-neutral-800">
      <div className="mx-auto max-w-screen-xl px-5 py-10 sm:py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:gap-10 md:items-center">
          {/* 연락처 */}
          <address className="not-italic text-sm text-gray-400 leading-7 text-center md:text-left">
            <p>서울시 성동구 왕십리로 222 자연과학관 521호</p>
            <p className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 md:justify-start">
              <span>TEL : 02-2220-0955</span>
              <span>E-mail : heonseokkim@hanyang.ac.kr</span>
            </p>
            <p className="text-gray-600">
              COPYRIGHT BY HANYANG. ALL RIGHTS RESERVED. v{__APP_VERSION__}
            </p>
          </address>

          {/* 로고 */}
          <div className="hidden md:flex items-center justify-center md:justify-end">
            <img
              src={logo}
              alt="laboratory of genome technology gray logo"
              className="h-10 object-contain sm:h-12"
              style={{ width: 'auto' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
