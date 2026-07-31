import { useState, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/components/GalleryImage';

interface GalleryCarouselProps {
  id: number;
  imageCount: number;
  alt: string;
  className?: string;
}

export const GalleryCarousel = ({ id, imageCount, alt, className }: GalleryCarouselProps) => {
  const [index, setIndex] = useState(1);

  const goPrev = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev === 1 ? imageCount : prev - 1));
  };

  const goNext = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev === imageCount ? 1 : prev + 1));
  };

  return (
    <div className={`relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 ${className ?? ''}`}>
      <GalleryImage
        id={id}
        index={index}
        alt={alt}
        thumb
        className="h-full w-full object-cover"
      />

      {imageCount > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
            aria-label="이전 이미지"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
            aria-label="다음 이미지"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {Array.from({ length: imageCount }, (_, i) => i + 1).map((n) => (
              <span
                key={n}
                className={`h-1.5 w-1.5 rounded-full ${n === index ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
