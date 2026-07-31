# 시작하기 전에 (개발 환경을 처음 설정하는 경우)

## 1. Node.js 설치

[nodejs.org](https://nodejs.org)에서 **LTS(Long Term Support)** 버전을 다운로드해 설치합니다.

설치가 끝나면 터미널(macOS는 '터미널' 앱, Windows는 '명령 프롬프트'나 'PowerShell')을 열어 아래 명령어를 입력하여, 버전 정보가 정상적으로 나오는지 확인합니다.

```bash
node -v
```

## 2. pnpm 설치

이 프로젝트는 `pnpm`이라는 패키지 매니저를 사용합니다. Node.js에 내장된 `corepack`으로 별도 설치 없이 바로 활성화할 수 있습니다.

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

아래 명령어로 정상 설치됐는지 확인합니다.

```bash
pnpm -v
```

# 로컬(내 컴퓨터)에서 실행하는 방법

터미널에서 아래 명령어를 입력합니다.

```bash
pnpm install
pnpm dev
```

성공하면 http://localhost:3000/ 에서 웹사이트를 확인할 수 있습니다. 혹시 해당 포트를 이미 사용 중이라면 다른 포트에서 실행될 수 있으며, 해당 주소가 터미널에 출력됩니다.

# 작업하기

## 작업 시작하기

Claude Code에서 `/start-work`를 실행합니다. 새로운 작업을 시작할 땐 항상 이 명령으로 시작하세요.

이 프로젝트는 아래와 같은 브랜치(작업 공간) 전략을 씁니다.

- **`main`** — 실제로 배포되는 브랜치입니다. GitHub Pages가 이 브랜치 기준으로 사이트를 서빙합니다. 직접 push는 막혀있고, PR을 통해서만 반영됩니다.
- **`develop`** — 작업 내용이 모이는 기본 브랜치입니다. 여기서 직접 작업하지 않고, 항상 새 브랜치를 만들어서 작업합니다.
- **`feat/기능-이름`, `fix/버그-이름`** — 실제 코드 작업은 항상 이런 브랜치에서 합니다.

`main`이나 `develop` 브랜치에서 코드 수정을 요청할 경우, 의도한 것이 맞는지 Claude가 확인합니다.
의도한 것이 아니라면 새로운 브랜치를 만들거나, 기존에 작업하던 브랜치로 이동하세요.

## 내 작업 올리기

- 작업 중간에 저장할 때에는 `/save-progress`를 실행합니다. 지금까지의 변경 내용을 commit합니다.
- 작업이 완전히 끝났으면 `/finish-work`를 실행합니다. 남은 변경사항을 커밋하고 브랜치를 저장소에 push 합니다.
- [원격 저장소](https://github.com/genometech-kim/genometech-kim.github.io)로 이동합니다.
- `Pull request(PR)` 메뉴로 이동합니다. 조금 기다리면 자동으로 PR이 생성됩니다.
- 내 작업에 관련된 PR을 클릭하고, 이상이 없으면 초록색 `Merge pull request` 버튼을 클릭하면 내 작업이 `develop`에 먼저 반영됩니다. 아직 홈페이지에 반영되지는 않은 상태입니다.
- 잠시 기다리면 또 하나의 PR이 자동으로 생성됩니다. 이상이 없으면 초록색 `Merge pull request` 버튼을 클릭합니다. 내 작업이 `main`에 반영됩니다.
- `main`에 반영이 완료되면, 자동화 프로세스(Github Actions)를 통해 홈페이지 배포가 시작됩니다.
- 5분 정도 지나서 홈페이지를 확인해 보세요. 변경 내역이 확인되지 않는 경우 쿠키 삭제, 강제 새로고침 등을 통해 다시 확인해 보세요.

# 데이터 수정하기

- 콘텐츠의 데이터 값은 `src/data/`에서 관리합니다. 화면 구조나 스타일을 건드릴 필요 없이 해당 파일의 값만 수정하면 됩니다.
- 이 프로젝트는 claude code로 관리할 것을 가정하고 만들어졌습니다. 직접 수정할 수도 있지만, 가능하면 스킬을 사용하여 수정하도록 합니다.
- 이 프로젝트 경로에서 claude 실행 후, `/스킬이름` 형태로 실행할 수 있습니다.

## 스킬 일람

| 콘텐츠           | 추가               | 수정                | 삭제                  |
| ---------------- | ------------------ | ------------------- | --------------------- |
| Professor Career | `/add-career`      | `/edit-career`      | `/delete-career`      |
| Members          | `/add-member`      | `/edit-member`      | `/delete-member`      |
| Research         | `/add-research`    | `/edit-research`    | `/delete-research`    |
| News             | `/add-news`        | `/edit-news`        | `/delete-news`        |
| Gallery          | `/add-gallery`     | `/edit-gallery`     | `/delete-gallery`     |
| Publication      | `/add-publication` | `/edit-publication` | `/delete-publication` |

## Professor Career

- 파일: `src/data/career.ts`
- `career` 배열에 아래 형태의 객체를 추가/수정
- 사진을 수정할 경우, `public/members/professor.jpg` 이 파일을 수정합니다. 반드시 동일한 파일명을 사용해야 합니다.
- 경력 외 항목은 직접 파일 내에서 수정합니다.

```ts
{
  year: '2008 - 2013',                                    // 연도 또는 기간
  description: 'B.S. in Chemistry and Biology',           // 내용 (학위, 직함 등) - 검정
  institution: 'Seoul National University, Seoul, Korea', // 소속 기관/장소 - 회색
},
```

## Members 멤버 목록

- 파일: `src/data/members.ts`
- `members` 배열에 아래 형태의 객체를 추가/수정
- 사진을 수정할 경우, `public/members/이메일아이디.jpg` 이 파일을 수정합니다. 이메일 아이디로 자동 매칭되므로, 반드시 동일한 파일명을 사용해야 합니다.

```ts
{
  nameKo: '박지훈',              // 이름 (한글, 선택 - 없으면 nameEn만 표시)
  nameEn: 'Jihoon Park',        // 이름 (영문, 선택 - 없으면 nameKo만 표시. 단, 둘 다 없으면 카드가 표시되지 않음)
  position: 'Ph.D. Candidate',  // 직함 또는 과정
  email: 'jpark@hanyang.ac.kr', // 이메일 (선택 - 없으면 이메일 미표시, 사진도 기본 아이콘)
},
```

### 기타 사진 파일 관련 가이드

- 사진 파일은 `jpg` → `.jpeg` → `.png` → `.webp` 순으로 찾습니다. 그 외의 확장자는 자동 매칭하지 않습니다.
- 파일명을 이메일과 다르게 쓰거나 다른 확장자를 쓰고 싶을 때에는 `photo` 필드에 경로를 직접 지정할 수 있습니다.
- 사진이 없으면 기본 아이콘만 보여줍니다.

## Research 아티클 수정

- 파일: `src/data/research.ts`
- `research` 배열에 아래 형태의 객체를 추가/수정
- 하나의 아티클은 `blocks`(소제목 + 이미지 + 본문) 여러 개로 구성되며, `/research/{slug}`로 독립된 URL을 가집니다.

```ts
{
  slug: 'example-new-research',  // url과 이미지 파일명 식별자로 사용 (영문/숫자/하이픈)
  title: '신규 연구',     // 목록 및 상세 상단에 표시되는 제목
  date: '2026.07.29',           // 게시일. 형식: YYYY.MM.DD (미지정 시 당일 날짜 입력)
  blocks: [
    {
      heading: '서론',                          // 블록 소제목
      text: 'CRISPR 기술을 이용해 **볼드**나 {{red:색상}} 강조도 가능합니다.\n\n빈 줄로 문단을 구분합니다.',
    },
  ],
},
```

- 강조 표시 문법: 볼드는 `**텍스트**`, 색상은 `{{red:텍스트}}`(CSS color 키워드 아무거나 가능), 둘 다 적용하려면 `{{red:**텍스트**}}`처럼 중첩합니다.
- 이미지: `public/research/{slug}-{블록 순서}.jpg`(또는 jpeg/png/webp) 파일을 자동으로 찾습니다. 예를 들어 slug가 `example-new-research`이고 첫 번째 블록이면 `public/research/example-new-research-1.jpg`. 이미지가 없는 블록은 텍스트만 표시됩니다.

## News

- 파일: `src/data/news.ts`
- `news` 배열에 아래 형태의 객체를 추가/수정. 최신 게시물을 맨 앞에 추가합니다.
- `/news/{id}`로 독립된 URL을 가집니다. `id`는 게시물 고유 번호이므로, 삭제된 게시물이 있어도 그 번호를 재사용하지 않고 항상 기존 최댓값 + 1을 씁니다(뒤 번호가 당겨지지 않음).

```ts
{
  id: 5,                                     // 고유 번호. URL과 이미지 파일명 식별자로 사용
  title: '한국연구재단 우수신진과제 선정',        // 게시물 제목
  newsDate: '2026.07',                       // 뉴스 자체 날짜(YYYY.MM 또는 YYYY.MM.DD). 목록의 연도 chip과 제목 앞 [YYYY.MM]에 사용
  uploadDate: '2026.07.30',                  // 게시물 업로드 날짜(YYYY.MM.DD). 목록 하단에 표시
  content: '우리 연구실이 **우수신진과제**에 선정되었습니다.', // 본문. 강조 표시 문법은 Research와 동일
},
```

- 이미지: `public/news/{id}.jpg`(또는 jpeg/png/webp) 파일을 자동으로 찾습니다. 전부 없으면 이미지 없이 텍스트만 표시됩니다. 파일명을 다르게 쓰고 싶을 때만 `image` 필드에 경로를 직접 지정합니다.

## Gallery 게시물

- 파일: `src/data/gallery.ts`
- `gallery` 배열에 아래 형태의 객체를 추가/수정. 배열 순서가 곧 목록 노출 순서이며, 최신 게시물을 맨 앞에 추가합니다.
- **`/add-gallery` 스킬 사용을 강력히 권장합니다.** `public/gallery` 폴더에 신규 이미지를 넣은 후 `/add-gallery`를 실행하면, id에 맞게 파일명을 변경하고 썸네일을 생성합니다.
- `/gallery/{id}`로 독립된 URL을 가집니다. `id`는 게시물 고유 번호이므로, 삭제된 게시물이 있어도 그 번호를 재사용하지 않고 항상 기존 최댓값 + 1을 씁니다(뒤 번호가 당겨지지 않음).

```ts
{
  id: 11,                          // 고유 번호. URL과 이미지 파일명 식별자로 사용
  title: '2026.07 워크샵',          // 게시물 제목
  uploadDate: '2026.07.30',        // 업로드 날짜(YYYY.MM.DD)
  imageCount: 3,                   // 이미지 개수
  text: '워크샵 관련 설명(선택, 없으면 표시 안 함)',
},
```

- 이미지: `public/gallery/{id}-1.jpg` ~ `public/gallery/{id}-{imageCount}.jpg`(또는 jpeg/png/webp) 파일을 순서대로 찾습니다. 목록에서는 같은 이름에 `-thumb.jpg`가 붙은 압축 썸네일(`{id}-1-thumb.jpg` 등)을 우선 쓰고, 상세 페이지는 원본을 그대로 보여줍니다.

## Publication

- 파일: `src/data/publication.ts`
- `publications` 배열에 아래 형태의 객체를 추가/수정. **id가 따로 없고, 목록의 번호는 배열 순서에서 자동으로 계산됩니다**(배열 첫 항목이 가장 큰 번호).

```ts
{
  title: 'CRISPR-based diagnostic platform for rapid pathogen detection', // 논문 제목
  journal: 'Nature Biotechnology', // 저널명
  year: 2026,                      // 출간연도
  authors: 'Kim, S., Kim H. S., Lee, J.', // 저자 목록. 원문 그대로 붙여넣는 하나의 문자열
  url: 'https://www.nature.com/articles/example', // 논문 원문/DOI 링크. 새 탭으로 열림
},
```

- 저자 볼드 처리: `authors` 문자열 안에 `BOLD_AUTHORS`(같은 파일 상단) 배열에 있는 이름이 포함되어 있으면 그 부분만 자동으로 볼드 처리됩니다. 랩 멤버 이름 표기가 기존과 다른 새로운 형태로 등장하면 `BOLD_AUTHORS`에 추가해야 볼드로 표시됩니다.

# 기술 스택

- **Vite** - 빌드 도구
- **React** + **TypeScript** - UI 프레임워크
- **TailwindCSS** - 스타일링
- **TanStack Router** - 파일 기반 클라이언트 사이드 라우팅
