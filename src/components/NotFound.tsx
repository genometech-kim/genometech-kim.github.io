import { Link } from '@tanstack/react-router';

export const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-500">요청하신 주소가 잘못되었거나 삭제된 페이지입니다.</p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-white hover:opacity-90"
      >
        홈으로 가기
      </Link>
    </div>
  );
};
