import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { Pagination } from '@/components/Pagination';
import { ExternalLinkButton } from '@/components/ExternalLinkButton';
import { navigation } from '@/data/navigation';
import { publications, BOLD_AUTHORS } from '@/data/publication';

export const Route = createFileRoute('/publication/')({
  component: PublicationPage,
});

const PAGE_SIZE = 8;

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function AuthorsText({ authors }: { authors: string }) {
  const names = [...BOLD_AUTHORS].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${names.map(escapeRegExp).join('|')})`, 'g');
  const parts = authors.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        BOLD_AUTHORS.includes(part) ? (
          <strong key={index} className="font-bold text-gray-900">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function PublicationPage() {
  const [page, setPage] = useState(1);
  const total = publications.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const pagedPublications = publications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <MenuHeader title="Publication" breadcrumbs={['HOME', 'Publication']} />
      <PageNav menu={{ label: 'Publication', items: navigation }} />
      <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Publication</h2>

        <div className="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
          {pagedPublications.map((publication, i) => {
            const number = total - ((page - 1) * PAGE_SIZE + i);
            return (
              <div
                key={`${publication.title}-${publication.year}`}
                className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center"
              >
                <span className="w-10 flex-shrink-0 text-lg font-bold text-primary">
                  {number}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{publication.title}</h3>
                  <p className="mt-1 text-base text-gray-500">
                    {publication.journal} · {publication.year}
                  </p>
                  <p className="mt-2 text-base text-gray-600">
                    <AuthorsText authors={publication.authors} />
                  </p>
                </div>
                <ExternalLinkButton href={publication.url} className="flex-shrink-0">
                  Link
                </ExternalLinkButton>
              </div>
            );
          })}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
