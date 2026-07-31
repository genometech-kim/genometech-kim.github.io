import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex h-9 w-9 cursor-pointer items-center justify-center border border-gray-200 text-gray-700 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={
            p === page
              ? 'flex h-9 w-9 cursor-pointer items-center justify-center bg-primary text-sm font-medium text-white'
              : 'flex h-9 w-9 cursor-pointer items-center justify-center border border-gray-200 text-sm font-medium text-gray-700 hover:text-primary'
          }
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-9 w-9 cursor-pointer items-center justify-center border border-gray-200 text-gray-700 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="다음 페이지"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
