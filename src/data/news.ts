/**
 * News 페이지 게시물 데이터.
 * 게시물을 추가/수정/삭제하려면 이 배열만 수정하면 됩니다.
 * 목록은 배열 순서 그대로 표시됩니다. 최신 게시물을 배열 맨 앞에 추가하세요.
 *
 * @id 게시물 고유 번호. URL(/news/{id})로 사용됨. 삭제해도 다른 게시물 id는 바꾸지 마세요.
 *   새 게시물을 추가할 때는 기존 id 중 가장 큰 값 + 1을 사용(auto-increment 방식)
 * @title 게시물 제목
 * @newsDate 뉴스 자체의 날짜(실제 있었던 일자). 형식: YYYY.MM 또는 YYYY.MM.DD. 목록의 연도 chip과 제목 앞 [YYYY.MM]에 사용됨
 * @uploadDate 게시물 업로드 날짜. 형식: YYYY.MM.DD. 목록 하단에 표시됨
 * @content 본문 텍스트. 빈 줄(\n\n)로 문단 구분. 강조 표시:
 *   - 볼드: **텍스트**
 *   - 색상: {{red:텍스트}} (색상 이름은 CSS color 키워드 사용, 예: red, blue)
 * @image 썸네일 이미지 경로. 지정하지 않으면 public/news/{id}.{jpg|jpeg|png|webp} 를 순서대로 찾아서 사용
 *   (예: id가 4면 public/news/4.jpg, .jpeg, .png, .webp 순으로 탐색). 전부 없으면 이미지 없이 텍스트만 표시됨.
 *   파일명을 규칙과 다르게 쓰고 싶을 때만 직접 지정.
 */
export interface NewsArticle {
  id: number;
  title: string;
  newsDate: string;
  uploadDate: string;
  content: string;
  image?: string;
}

export const news: NewsArticle[] = [
  {
    id: 4,
    title: 'SRC 선도연구센터 선정',
    newsDate: '2025.06',
    uploadDate: '2025.06.07',
    content:
      '우리 연구실이 한양대학교 생명과학과 최제민 교수님께서 이끄시는 선도연구센터 "조직감각면역연구센터" 에 선정되었습니다.',
  },
  {
    id: 3,
    title: '삼성미래기술육성사업 선정',
    newsDate: '2024.12',
    uploadDate: '2024.11.12',
    content: '우리 연구실이 삼성미래기술육성사업에 선정되었습니다.',
  },
  {
    id: 2,
    title: '한국연구재단/한국기초과학지원연구원 신진연구자 인프라 지원 사업 선정',
    newsDate: '2024.05',
    uploadDate: '2024.10.16',
    content: '우리 연구실이 신진연구자 인프라 지원 사업에 선정되었습니다.',
  },
  {
    id: 1,
    title: '한국연구재단 우수신진과제 선정',
    newsDate: '2024.04',
    uploadDate: '2024.10.16',
    content: '우리 연구실이 한국연구재단 우수신진과제에 선정 되었습니다.',
  },
];
