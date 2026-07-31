import { createFileRoute } from '@tanstack/react-router';
import { AdjacentPostNav } from '@/components/AdjacentPostNav';
import { BackToListButton } from '@/components/BackToListButton';
import { GalleryImage } from '@/components/GalleryImage';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { RichText } from '@/components/RichText';
import { gallery } from '@/data/gallery';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/gallery/$id')({
  component: GalleryDetailPage,
});

function GalleryDetailPage() {
  const { id } = Route.useParams();
  const postIndex = gallery.findIndex((item) => item.id === Number(id));
  const post = gallery[postIndex];
  const prevPost =
    postIndex >= 0 && postIndex < gallery.length - 1 ? gallery[postIndex + 1] : undefined;
  const nextPost = postIndex > 0 ? gallery[postIndex - 1] : undefined;

  return (
    <div>
      <MenuHeader title="Gallery" breadcrumbs={['HOME', 'Gallery']} />
      <PageNav menu={{ label: 'Gallery', items: navigation }} />
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8 px-6 py-16">
        {post ? (
          <>
            <div className="border-y-2 border-gray-800">
              <div className="border-b border-gray-200 px-2 py-6">
                <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                <p className="mt-2 flex items-center gap-3 text-sm">
                  <span className="font-bold text-gray-600">작성일</span>
                  <span className="text-gray-400">{post.uploadDate}</span>
                </p>
              </div>
              <div className="flex flex-col items-center gap-8 px-2 py-10">
                {Array.from({ length: post.imageCount }, (_, i) => i + 1).map((n) => (
                  <GalleryImage
                    key={n}
                    id={post.id}
                    index={n}
                    alt={post.title}
                    className="max-w-full"
                  />
                ))}
                {post.text && (
                  <RichText
                    text={post.text}
                    className="w-full text-base leading-relaxed text-gray-700"
                  />
                )}
              </div>
            </div>

            <BackToListButton to="/gallery" className="self-center sm:self-end" />

            <AdjacentPostNav
              prevPost={prevPost ? { title: prevPost.title, href: `/gallery/${prevPost.id}` } : undefined}
              nextPost={nextPost ? { title: nextPost.title, href: `/gallery/${nextPost.id}` } : undefined}
            />
          </>
        ) : (
          <>
            <p className="text-center text-gray-500">게시글을 찾을 수 없습니다.</p>
            <BackToListButton to="/gallery" className="mx-auto" />
          </>
        )}
      </div>
    </div>
  );
}
