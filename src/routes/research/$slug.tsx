import { createFileRoute } from '@tanstack/react-router';
import { AdjacentPostNav } from '@/components/AdjacentPostNav';
import { ArticleImage } from '@/components/ArticleImage';
import { BackToListButton } from '@/components/BackToListButton';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { RichText } from '@/components/RichText';
import { research } from '@/data/research';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/research/$slug')({
  component: ResearchDetailPage,
});

function ResearchDetailPage() {
  const { slug } = Route.useParams();
  const articleIndex = research.findIndex((item) => item.slug === slug);
  const article = research[articleIndex];
  const prevArticle =
    articleIndex >= 0 && articleIndex < research.length - 1
      ? research[articleIndex + 1]
      : undefined;
  const nextArticle = articleIndex > 0 ? research[articleIndex - 1] : undefined;

  return (
    <div>
      <MenuHeader title="Research" breadcrumbs={['HOME', 'Research']} />
      <PageNav menu={{ label: 'Research', items: navigation }} />
      <div className="mx-auto flex max-w-screen-lg flex-col gap-12 px-6 py-16">
        {article ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-center text-3xl font-bold">{article.title}</h2>
              <p className="text-sm text-gray-400">{article.date}</p>
            </div>
            <div className="flex flex-col gap-16">
              {article.blocks.map((block, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <h3 className="flex items-center gap-4 text-2xl font-bold text-primary">
                    <span className="h-6 w-1 bg-primary" />
                    {block.heading}
                  </h3>
                  <ArticleImage
                    slug={article.slug}
                    index={index}
                    photo={block.image}
                    alt={block.heading}
                    containerClassName="mx-8 my-4 aspect-[16/9] overflow-hidden rounded-lg border border-gray-200 p-5"
                    className="h-full w-full object-contain"
                  />
                  <RichText
                    text={block.text}
                    className="text-lg text-gray-700 leading-relaxed sm:text-xl"
                  />
                </div>
              ))}
            </div>

            <BackToListButton to="/research" className="self-center sm:self-end" />

            <AdjacentPostNav
              prevPost={
                prevArticle
                  ? { title: prevArticle.title, href: `/research/${prevArticle.slug}` }
                  : undefined
              }
              nextPost={
                nextArticle
                  ? { title: nextArticle.title, href: `/research/${nextArticle.slug}` }
                  : undefined
              }
            />
          </>
        ) : (
          <>
            <p className="text-center text-gray-500">게시글을 찾을 수 없습니다.</p>
            <BackToListButton to="/research" className="mx-auto" />
          </>
        )}
      </div>
    </div>
  );
}
