import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { GalleryImage } from '@/components/GalleryImage';
import { gallery } from '@/data/gallery';

const AUTO_PLAY_INTERVAL = 4000;

export const HomeGallerySection = () => {
  const posts = gallery.slice(0, 5);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (posts.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [posts.length]);

  if (posts.length === 0) return null;

  const goPrev = () => setIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  const goNext = () => setIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  const current = posts[index];

  return (
    <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold">Gallery</h3>
        <Link
          to="/gallery"
          aria-label="Gallery 더보기"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:opacity-90"
        >
          <Plus size={20} />
        </Link>
      </div>

      <hr className="mt-4 hidden border-t border-gray-200 sm:block" />

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          aria-label="이전 게시물"
          className="hidden flex-shrink-0 text-gray-400 hover:text-primary sm:block"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="w-full sm:w-[80%]">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                to="/gallery/$id"
                params={{ id: String(post.id) }}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
              >
                <GalleryImage
                  id={post.id}
                  index={1}
                  alt={post.title}
                  thumb
                  className="h-full w-full object-cover"
                />
              </Link>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-lg font-bold text-gray-700 sm:truncate">{current.title}</p>
            <span className="hidden flex-shrink-0 text-base text-gray-400 sm:block">
              {current.uploadDate}
            </span>
          </div>
        </div>

        <button
          onClick={goNext}
          aria-label="다음 게시물"
          className="hidden flex-shrink-0 text-gray-400 hover:text-primary sm:block"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        {posts.map((post, i) => (
          <button
            key={post.id}
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}번째 게시물`}
            className={`h-2 cursor-pointer rounded-full transition-all ${i === index ? 'w-8 bg-primary' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};
