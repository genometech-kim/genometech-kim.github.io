import type { YearContentItem } from '@/components/YearContentList';

/**
 * Professor 페이지 Career 섹션 데이터.
 * 경력을 추가/수정하려면 이 배열만 수정하면 됩니다.
 * 각 필드의 의미는 YearContentItem 타입(@/components/YearContentList.tsx) 참고.
 */
export const career: YearContentItem[] = [
  {
    year: '2023.03 - Present',
    description: 'Assistant professor, Dept. of Life Science',
    institution: 'Hanyang University, Seoul, Korea',
  },
  {
    year: '2019 - 2023',
    description: 'PostDoc. School of Medicine',
    institution: 'Stanford University, Stanford, USA',
  },
  {
    year: '2018 - 2019',
    description: 'PostDoc. Research Institute of Natural Science',
    institution: 'Hanyang University, Seoul, Korea',
  },
  {
    year: '2013 - 2018',
    description: 'Ph.D. in Chemistry',
    institution: 'Seoul National University, Seoul, Korea',
  },
  {
    year: '2008 - 2013',
    description: 'B.S. in Chemistry and Biology',
    institution: 'Seoul National University, Seoul, Korea',
  },
];
