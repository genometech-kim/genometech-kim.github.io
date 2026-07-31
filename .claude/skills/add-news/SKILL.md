---
name: add-news
description: News 페이지의 게시물 추가하기
argument-hint: '[제목 | 뉴스 날짜 | 업로드 날짜 | 내용] (생략 가능, 생략 시 대화로 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# News 게시물 추가

News 페이지 데이터(`src/data/news.ts`)에 새 게시물을 추가하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 입력 예시를 보여주고, 필요한 정보만 물어본다.

## 입력

사용자가 `$ARGUMENTS`로 아래 형식을 파이프(`|`)로 구분해 줄 수 있습니다:

```
/add-news 한국연구재단 우수신진과제 선정 | 2026.07 | 2026.07.30 | 우리 연구실이 한국연구재단 우수신진과제에 선정되었습니다.
```

값이 일부 또는 전부 비어 있으면, 아래를 차례로 물어보세요.

1. **제목** — 필수. 임의로 지어내지 않는다.
2. **뉴스 날짜** — 필수. 실제 있었던 일자(형식 `YYYY.MM` 또는 `YYYY.MM.DD`). 목록의 연도 chip과 제목 앞 `[YYYY.MM]`에 쓰인다.
3. **업로드 날짜** — 선택. 형식 `YYYY.MM.DD`. 지정하지 않으면 오늘 날짜를 이 형식으로 변환해 바로 채운다(물어보지 않음).
4. **내용** — 필수. 임의로 지어내지 않는다. 빈 줄로 문단 구분 가능. 강조 표시 문법 안내:
   - 볼드: `**텍스트**`
   - 색상: `{{red:텍스트}}` (색상 이름은 아무 CSS color 키워드나 가능, 예: red, blue)
5. **이미지 유무만 확인**(선택). 실제 이미지 파일 지정은 물어볼 필요 없음 — `public/news/{id}.jpg`(또는 jpeg/png/webp)를 자동으로 찾으므로, 사용자가 별도 경로를 언급하지 않으면 `image` 필드는 생략한다.

## 절차

1. `src/data/news.ts`를 읽고 현재 배열 형식과 순서, 다음에 쓸 id(기존 최댓값 + 1)를 확인한다.
2. 위 입력 항목으로 새 게시물 객체를 만든다. 필드 순서는 `id` → `title` → `newsDate` → `uploadDate` → `content` → `image`(있는 경우만). 기존 코드 스타일(따옴표, 들여쓰기, trailing comma)을 그대로 따른다.
3. Edit 도구로 배열 **맨 앞**에 삽입한다(최신 게시물이 맨 앞에 오는 기존 정렬 규칙).
4. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/news.ts
   pnpm exec tsc -b --noEmit
   ```
5. 에러가 있으면 고치고, 없으면 어떤 게시물을 몇 번 id로 추가했는지 사용자에게 짧게 알려준다. 이미지를 추가하고 싶으면 `public/news/{id}.jpg`에 파일만 넣으면 된다고 안내한다(예: id가 5면 `public/news/5.jpg`). 화면 확인은 `pnpm dev` 실행 후 News 페이지에서 볼 수 있다고 안내한다.

## 하지 말 것

- `src/components/NewsImage.tsx`, `src/components/AdjacentPostNav.tsx`, `src/routes/news/index.tsx`, `src/routes/news/$id.tsx`는 이미 이 데이터를 렌더링하도록 연결되어 있으므로 수정하지 않는다.
- 제목이나 내용을 사용자가 안 주면 임의로 지어내지 말고 반드시 물어본다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
