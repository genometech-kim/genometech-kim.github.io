import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = ['/home/cd9eb77e29.jpg', '/home/6f842b5c14.png', '/home/66b1c3abb1.jpg'];
const AUTO_PLAY_INTERVAL = 5000;

export const HomeMenuHeader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () => setIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  const goNext = () => setIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden xs:h-[420px] lg:h-[600px]">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${src})`, opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative flex flex-col items-center gap-6 text-center text-white">
        <h1 className="text-3xl font-bold leading-tight xs:text-5xl">
          Laboratory of
          <br />
          Genome Technology
        </h1>
        <div className="flex items-center gap-4">
          <button onClick={goPrev} aria-label="이전 이미지" className="hover:opacity-70">
            <ChevronLeft size={20} />
          </button>
          <span className="text-md tracking-widest font-bold">
            {String(index + 1).padStart(2, '0')}{' '}
            <span className="font-normal text-gray-300">/ {String(SLIDES.length).padStart(2, '0')}</span>
          </span>
          <button onClick={goNext} aria-label="다음 이미지" className="hover:opacity-70">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
