/**
 * Gallery 페이지 게시물 데이터.
 * 게시물을 추가/수정/삭제하려면 이 배열만 수정하면 됩니다.
 * 목록은 배열 순서 그대로 표시됩니다. 최신 게시물을 배열 맨 앞에 추가하세요.
 *
 * @id 게시물 고유 번호. URL(/gallery/{id})과 이미지 파일명 식별자로 사용됨.
 *   삭제해도 다른 게시물 id는 바꾸지 마세요. 새 게시물 추가 시 기존 id 중 가장 큰 값 + 1 사용(auto-increment 방식)
 * @title 게시물 제목
 * @uploadDate 게시물 업로드 날짜. 형식: YYYY.MM.DD
 * @imageCount 이미지 개수. public/gallery/{id}-{1..imageCount}.{jpg|jpeg|png|webp} 원본을 순서대로 찾아서 사용
 *   (예: id가 3이고 imageCount가 2면 public/gallery/3-1.jpg(또는 jpeg/png/webp), public/gallery/3-2.jpg 탐색).
 *   목록에서는 같은 이름에 -thumb.jpg가 붙은 압축 썸네일(예: 3-1-thumb.jpg)을 우선 사용하고, 없으면 원본으로 대체.
 *   목록은 2장 이상이면 캐러셀로 표시되고, 상세 페이지는 원본을 전부 세로로 나열해서 보여줌.
 * @text 상세 페이지에서 이미지 전부 아래에 표시되는 설명 텍스트. 없으면 표시 안 함. 빈 줄(\n\n)로 문단 구분. 강조 표시:
 *   - 볼드: **텍스트**
 *   - 색상: {{red:텍스트}} (색상 이름은 CSS color 키워드 사용, 예: red, blue)
 */
export interface GalleryPost {
  id: number;
  title: string;
  uploadDate: string;
  imageCount: number;
  text?: string;
}

export const gallery: GalleryPost[] = [
  {
    id: 10,
    title: '2026.05 KSBMB International Conference',
    uploadDate: '2026.06.02',
    imageCount: 3,
  },
  {
    id: 9,
    title: '2026.01 KSBMB winter workshop',
    uploadDate: '2026.01.20',
    imageCount: 1,
  },
  {
    id: 8,
    title: "2025.06-08 Yijun's Stanford Internship",
    uploadDate: '2025.09.18',
    imageCount: 4,
  },
  {
    id: 7,
    title: '2025.01 Stanford Visiting',
    uploadDate: '2025.02.01',
    imageCount: 4,
  },
  {
    id: 6,
    title: '2025.01 KSMCB 동계학술대회 in 평창',
    uploadDate: '2025.01.08',
    imageCount: 3,
  },
  {
    id: 5,
    title: "2024.12 삼성미래기술육성사업 Kick-off meeting (Lab Visit: Prof. Jeon, Minji Jeon & Members)",
    uploadDate: '2024.12.28',
    imageCount: 4,
    text: '2024.12 삼성미래기술육성사업 (질병 유전체 초정밀 변이지도 구축을 위한 대규모 인공 변이 세포 데이터 생성 및 AI 모델 개발) Kick-off meeting',
  },
  {
    id: 4,
    title: "2024.09 Prof. Choi's visit (Junhong Choi)",
    uploadDate: '2024.09.08',
    imageCount: 3,
  },
  {
    id: 3,
    title: '2024.07 Oxford Nanopore WYMM Tour in Seoul',
    uploadDate: '2024.07.18',
    imageCount: 3,
  },
  {
    id: 2,
    title: "2024.03 Prof. Ji's visit (Hanlee P. Ji)",
    uploadDate: '2024.04.18',
    imageCount: 6,
    text: "Dr. Hanlee P. Ji, a Professor of Medicine (Oncology) at Stanford University, visited Hanyang University. During his visit, he delivered a talk and engaged in discussions with students.",
  },
  {
    id: 1,
    title: '2024.01 차세대 바이오제약 SICC 워크샵 in 제천',
    uploadDate: '2024.04.18',
    imageCount: 3,
  },
];
