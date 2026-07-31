import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { MenuHeader } from '@/components/MenuHeader';
import { NewsImage } from '@/components/NewsImage';
import { PageNav } from '@/components/PageNav';
import { Pagination } from '@/components/Pagination';
import { stripMarkup } from '@/lib/richTextMarkup';
import { news } from '@/data/news';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/news/')({
  component: NewsListPage,
});

const PAGE_SIZE = 10;

function NewsListPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(news.length / PAGE_SIZE);
  const pagedArticles = news.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <MenuHeader title="News" breadcrumbs={['HOME', 'News']} />
      <PageNav menu={{ label: 'News', items: navigation }} />
      <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-6 py-16">
        <div className="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
          {pagedArticles.map((article) => {
            const year = article.newsDate.slice(0, 4);
            const yearMonth = article.newsDate.slice(0, 7);
            return (
              <Link
                key={article.id}
                to="/news/$id"
                params={{ id: String(article.id) }}
                className="flex flex-col items-start gap-6 py-6 sm:flex-row"
              >
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold text-white">
                    {year}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-primary">
                    [{yearMonth}] {article.title}
                  </h3>
                  <p className="mt-4 line-clamp-5 text-lg text-gray-500">
                    {stripMarkup(article.content).replace(/\s+/g, ' ').trim()}
                  </p>
                  <p className="mt-4 text-sm text-gray-400">{article.uploadDate}</p>
                </div>
                <NewsImage
                  id={article.id}
                  photo={article.image}
                  alt={article.title}
                  containerClassName="h-[200px] w-full flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 p-4 sm:w-[300px]"
                  className="h-full w-full object-contain"
                />
              </Link>
            );
          })}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
