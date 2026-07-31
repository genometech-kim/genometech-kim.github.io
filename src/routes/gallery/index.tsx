import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { GalleryCarousel } from '@/components/GalleryCarousel';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { Pagination } from '@/components/Pagination';
import { gallery } from '@/data/gallery';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/gallery/')({
  component: GalleryListPage,
});

const PAGE_SIZE = 10;

function GalleryListPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(gallery.length / PAGE_SIZE);
  const pagedPosts = gallery.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <MenuHeader title="Gallery" breadcrumbs={['HOME', 'Gallery']} />
      <PageNav menu={{ label: 'Gallery', items: navigation }} />
      <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-6 py-16">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {pagedPosts.map((post) => (
            <Link
              key={post.id}
              to="/gallery/$id"
              params={{ id: String(post.id) }}
              className="flex flex-col gap-3"
            >
              <GalleryCarousel
                id={post.id}
                imageCount={post.imageCount}
                alt={post.title}
                className="aspect-square w-full"
              />
              <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
              <p className="text-sm text-gray-400">{post.uploadDate}</p>
            </Link>
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
