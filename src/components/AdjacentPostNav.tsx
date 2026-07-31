import { Link } from '@tanstack/react-router';

interface AdjacentPost {
  title: string;
  href: string;
}

interface AdjacentPostNavProps {
  prevPost?: AdjacentPost;
  nextPost?: AdjacentPost;
}

export const AdjacentPostNav = ({ prevPost, nextPost }: AdjacentPostNavProps) => {
  return (
    <div className="flex flex-col divide-y divide-gray-200 border-t border-gray-200">
      <div className="flex items-center gap-3 py-4">
        <span className="w-24 flex-shrink-0 text-center text-sm font-bold text-black">
          이전글
        </span>
        <span className="flex-shrink-0 text-gray-300">|</span>
        {prevPost ? (
          <Link to={prevPost.href} className="truncate text-gray-500 hover:text-gray-700">
            {prevPost.title}
          </Link>
        ) : (
          <p className="text-gray-400">이전글이 없습니다.</p>
        )}
      </div>
      <div className="flex items-center gap-3 py-4">
        <span className="w-24 flex-shrink-0 text-center text-sm font-bold text-black">
          다음글
        </span>
        <span className="flex-shrink-0 text-gray-300">|</span>
        {nextPost ? (
          <Link to={nextPost.href} className="truncate text-gray-500 hover:text-gray-700">
            {nextPost.title}
          </Link>
        ) : (
          <p className="text-gray-400">다음글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};
