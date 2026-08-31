/**
 * Member 페이지 멤버 카드 데이터.
 * 멤버를 추가/수정하려면 이 배열만 수정하면 됩니다.
 * @nameKo 이름 (한글). 없으면 nameEn을 대신 표시. nameKo, nameEn 둘 다 없으면 카드 자체가 표시되지 않음
 * @nameEn 이름 (영문). 없으면 nameKo만 표시 (병기 안 함)
 * @position 직함 또는 과정 (예: 'Ph.D. Candidate')
 * @degree 최종 학위 (예: 'B.S. Hanyang University, 2025'). 있으면 직함 위에 표시됨
 * @email 이메일. 없으면 카드에 이메일이 표시되지 않고, 사진도 기본 아이콘으로 표시됨
 * @photo 프로필 사진 경로. 지정하지 않으면 public/members/{email 아이디}.{jpg|jpeg|png|webp} 를 순서대로 찾아서 사용
 *   (예: email이 'abc@hanyang.ac.kr'이면 public/members/abc.jpg, .jpeg, .png, .webp 순으로 탐색).
 *   전부 없으면 기본 아이콘으로 대체됨. 파일명을 이메일과 다르게 쓰고 싶을 때만 직접 지정.
 */
export interface Member {
  nameKo?: string;
  nameEn?: string;
  position: string;
  degree?: string;
  email?: string;
  photo?: string;
}

export const members: Member[] = [
  {
    nameEn: 'Clementine Charton',
    position: 'Post-Doc',
    email: 'ccharton@hanyang.ac.kr',
  },
  {
    nameKo: '박성호',
    nameEn: 'Seong-Ho Park',
    position: 'Post-Doc',
    email: 'spark94@hanyang.ac.kr',
  },
  {
    nameKo: '노승재',
    nameEn: 'Seung-Jae Roh',
    position: 'Researcher',
    email: 'sjroh1@naver.com',
  },
  {
    nameKo: '김이준',
    nameEn: 'Yijun Kim',
    position: 'Researcher',
    email: 'kimyj7548@gmail.com',
  },
  {
    nameKo: '김태환',
    nameEn: 'Taehwan Kim',
    position: 'M.S & Ph.D Course',
    degree: 'B.S. Hanyang University, 2025',
    email: 'vegetable99@hanyang.ac.kr',
  },
  {
    nameKo: '김유중',
    nameEn: 'Yujoong Kim',
    position: 'M.S & Ph.D Course',
    email: 'kyj050228@hanyang.ac.kr',
  },
  {
    nameKo: '박동우',
    nameEn: 'Dongwoo Park',
    position: 'M.S & Ph.D Course',
    email: 'dongwooseoul@hanyang.ac.kr',
  },
  {
    nameKo: '황윤성',
    nameEn: 'Yoonsung Hwang',
    position: 'M.S & Ph.D Course',
    email: 'dbstjd12345@hanyang.ac.kr',
  },
  {
    nameKo: '신해승',
    nameEn: 'Haeseung Shin',
    position: 'M.S & Ph.D Course',
    email: 'haydenshin@hanyang.ac.kr',
  },
  {
    nameKo: '유선우',
    position: 'Undergraduate',
  },
  {
    nameKo: '김윤지',
    nameEn: 'Yunji Kim',
    position: 'Undergraduate',
    email: 'xomsomm@hanyang.ac.kr',
  },
  {
    nameKo: '석사림',
    nameEn: 'Seok Sarim',
    position: 'Undergraduate',
    email: 'rsbio3@hanyang.ac.kr',
  },
  {
    nameKo: '김도완',
    nameEn: 'Dohwan Kim',
    position: 'Undergraduate',
    email: 'kimdohwan73@hanyang.ac.kr',
  },
  {
    nameKo: '강수진',
    nameEn: 'Soojin Kang',
    position: 'Graduated',
    email: 'kangsj417@gmail.com',
  },
  {
    nameKo: '홍길동',
    nameEn: 'Hong Gildong',
    position: 'Intern',
    email: 'gildong@hanyang.ac.kr',
  },
];

/**
 * Alumni 목록. Member 페이지 하단 Alumni 섹션에 한 줄씩 텍스트로 표시됩니다.
 * 형식 예: '이름 (재직기간; 직위) 현재 소속.'
 */
export const alumni: string[] = [
  'Yijun Kim (2024-2026; Researcher) M.S. Student, Harvard University.',
];
