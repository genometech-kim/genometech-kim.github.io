import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { news } from '@/data/news';
import { stripMarkup } from '@/lib/richTextMarkup';

export const HomeNewsSection = () => {
  const [featured, ...rest] = news.slice(0, 4);

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold">News</h3>
        <Link
          to="/news"
          aria-label="News 더보기"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:opacity-90"
        >
          <Plus size={20} />
        </Link>
      </div>

      <hr className="mt-4 hidden border-t border-gray-200 sm:block" />

      {featured && (
        <Link
          to="/news/$id"
          params={{ id: String(featured.id) }}
          className="mt-8 flex items-center gap-4 border-b border-gray-200 pb-6"
        >
          <div className="flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center rounded-full border-8 border-primary/10 bg-white text-primary">
            <span className="text-2xl font-bold leading-none">{featured.uploadDate.slice(8, 10)}</span>
            <span className="mt-1 text-sm leading-none">{featured.uploadDate.slice(0, 7)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-gray-900 sm:truncate">
              [{featured.newsDate.slice(0, 7)}] {featured.title}
            </p>
            <p className="mt-2 line-clamp-2 text-sm text-gray-500">
              {stripMarkup(featured.content).replace(/\s+/g, ' ').trim()}
            </p>
          </div>
        </Link>
      )}

      <ul className="mt-2 flex flex-col">
        {rest.map((item) => (
          <li key={item.id}>
            <Link
              to="/news/$id"
              params={{ id: String(item.id) }}
              className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <span className="min-w-0 text-gray-900 sm:truncate">
                [{item.newsDate.slice(0, 7)}] {item.title}
              </span>
              <span className="hidden flex-shrink-0 text-sm text-gray-400 sm:block">
                {item.uploadDate}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
