import { createFileRoute, Link } from '@tanstack/react-router';
import { ArticleImage } from '@/components/ArticleImage';
import { HomeGallerySection } from '@/components/HomeGallerySection';
import { HomeMenuHeader } from '@/components/HomeMenuHeader';
import { HomeNewsSection } from '@/components/HomeNewsSection';
import { research } from '@/data/research';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const previewArticles = research.slice(0, 3);

  return (
    <div>
      <HomeMenuHeader />

      <section className="mx-auto max-w-screen-xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Research</h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {previewArticles.map((article) => {
            const firstBlock = article.blocks[0];
            return (
              <Link
                key={article.slug}
                to="/research/$slug"
                params={{ slug: article.slug }}
                className="flex flex-col overflow-hidden rounded-lg border border-gray-200"
              >
                {firstBlock && (
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <ArticleImage
                      slug={article.slug}
                      index={0}
                      photo={firstBlock.image}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-center gap-2 bg-primary p-4">
                  <h3 className="line-clamp-2 text-center text-xl text-white sm:text-[clamp(0.875rem,1.4vw,1.25rem)]">
                    {article.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-primary/10 px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          <HomeNewsSection />
          <HomeGallerySection />
        </div>
      </section>
    </div>
  );
}
