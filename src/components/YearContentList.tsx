/**
 * @year 연도 또는 기간 (예: '2008 - 2013')
 * @description 내용 (학위, 직함 등). 기본(검정) 색상으로 표시됨
 * @institution 소속 기관/장소. 회색으로 표시됨
 */
export interface YearContentItem {
  year: string;
  description: string;
  institution: string;
}

interface YearContentListProps {
  items: YearContentItem[];
}

export const YearContentList = ({ items }: YearContentListProps) => {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={`${item.year}-${index}`} className="flex gap-4">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
          <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:gap-6">
            <span className="w-40 flex-shrink-0 whitespace-nowrap font-bold text-primary">
              {item.year}
            </span>
            <div>
              <p>{item.description}</p>
              <p className="text-gray-400">{item.institution}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
