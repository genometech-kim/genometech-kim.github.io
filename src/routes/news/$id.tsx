import { createFileRoute } from '@tanstack/react-router';
import { AdjacentPostNav } from '@/components/AdjacentPostNav';
import { BackToListButton } from '@/components/BackToListButton';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { RichText } from '@/components/RichText';
import { news } from '@/data/news';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/news/$id')({
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const { id } = Route.useParams();
  const articleIndex = news.findIndex((item) => item.id === Number(id));
  const article = news[articleIndex];
  const prevArticle =
    articleIndex >= 0 && articleIndex < news.length - 1 ? news[articleIndex + 1] : undefined;
  const nextArticle = articleIndex > 0 ? news[articleIndex - 1] : undefined;

  return (
    <div>
      <MenuHeader title="News" breadcrumbs={['HOME', 'News']} />
      <PageNav menu={{ label: 'News', items: navigation }} />
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8 px-6 py-16">
        {article ? (
          <>
            <div className="border-y-2 border-gray-800">
              <div className="border-b border-gray-200 px-2 py-6">
                <h3 className="text-xl font-bold text-gray-900">
                  [{article.newsDate.slice(0, 7)}] {article.title}
                </h3>
                <p className="mt-2 flex items-center gap-3 text-sm">
                  <span className="font-bold text-gray-600">작성일</span>
                  <span className="text-gray-400">{article.uploadDate}</span>
                </p>
              </div>
              <div className="px-2 py-10">
                <RichText
                  text={article.content}
                  className="text-base leading-relaxed text-gray-700"
                />
              </div>
            </div>

            <BackToListButton to="/news" className="self-center sm:self-end" />

            <AdjacentPostNav
              prevPost={
                prevArticle ? { title: prevArticle.title, href: `/news/${prevArticle.id}` } : undefined
              }
              nextPost={
                nextArticle ? { title: nextArticle.title, href: `/news/${nextArticle.id}` } : undefined
              }
            />
          </>
        ) : (
          <>
            <p className="text-center text-gray-500">게시글을 찾을 수 없습니다.</p>
            <BackToListButton to="/news" className="mx-auto" />
          </>
        )}
      </div>
    </div>
  );
}
