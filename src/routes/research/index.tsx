import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArticleImage } from '@/components/ArticleImage';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { Pagination } from '@/components/Pagination';
import { stripMarkup } from '@/lib/richTextMarkup';
import { research } from '@/data/research';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/research/')({
  component: ResearchListPage,
});

const PAGE_SIZE = 10;

function ResearchListPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(research.length / PAGE_SIZE);
  const pagedArticles = research.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <MenuHeader title="Research" breadcrumbs={['HOME', 'Research']} />
      <PageNav menu={{ label: 'Research', items: navigation }} />
      <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Research</h2>

        <div className="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
          {pagedArticles.map((article) => {
            const firstBlock = article.blocks[0];
            return (
              <Link
                key={article.slug}
                to="/research/$slug"
                params={{ slug: article.slug }}
                className="flex flex-col items-start gap-6 py-6 sm:flex-row"
              >
                {firstBlock && (
                  <div className="h-[200px] w-full flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 p-4 sm:w-[300px]">
                    <ArticleImage
                      slug={article.slug}
                      index={0}
                      photo={firstBlock.image}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-primary">{article.title}</h3>
                  {firstBlock && (
                    <p className="mt-4 line-clamp-5 text-lg text-gray-500 md:line-clamp-none">
                      {stripMarkup(firstBlock.text).replace(/\s+/g, ' ').trim()}
                    </p>
                  )}
                  <p className="mt-4 text-right text-sm text-gray-400">{article.date}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
