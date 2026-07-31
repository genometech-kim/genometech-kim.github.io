---
name: add-research
description: Research 페이지의 아티클 추가하기
argument-hint: '[제목] (생략 가능, 생략 시 대화로 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Research 아티클 추가

Research 페이지 데이터(`src/data/research.ts`)에 새 아티클을 추가하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 입력 예시를 보여주고, 필요한 정보만 물어본다.

## 입력

`$ARGUMENTS`에 제목이 있으면 그것을 제목으로 쓰고, 없으면 물어본다.

아티클은 하나 이상의 **블록**(소제목 + 본문 + 선택적 이미지)으로 구성된다. 예:

```
소제목1: 서론
본문1: CRISPR 기술을 이용해...
소제목2: 결과
본문2: 실험 결과 **유의미한 차이**를 확인했다...
```

1. **제목** — 필수
2. **slug** — URL(`/research/{slug}`)과 이미지 파일명에 쓰이는 식별자. 영문 소문자/숫자/하이픈만 사용. 제목을 바탕으로 자동 제안하고(예: 제목이 "CRISPR 신규 연구"면 `crispr-new-research`처럼 영문으로 의역 제안), 사용자에게 확인받는다. 이미 존재하는 slug와 겹치면 다른 값을 요청한다.
3. **날짜** — 선택. 형식은 `YYYY.MM.DD`(예: `2026.07.29`). 사용자가 지정하지 않으면 오늘 날짜를 이 형식으로 변환해 사용한다(물어보지 않고 바로 채운다).
4. **블록들** — 각 블록마다:
   - 소제목 (필수)
   - 본문 텍스트 (필수). 빈 줄로 문단 구분 가능. 강조 표시 문법 안내:
     - 볼드: `**텍스트**`
     - 색상: `{{red:텍스트}}` (색상 이름은 아무 CSS color 키워드나 가능, 예: red, blue)
     - 둘 다: `{{red:**텍스트**}}`
   - 이미지 유무만 확인(선택). 실제 이미지 파일 지정은 물어볼 필요 없음 — `public/research/{slug}-{블록 순서}.jpg`(또는 jpeg/png/webp)를 자동으로 찾으므로, 사용자가 별도 경로를 언급하지 않으면 `image` 필드는 생략한다.
   - 블록을 다 받으면 "블록을 더 추가할까요?"라고 물어보고, 없다고 할 때까지 반복한다.

## 삽입 위치

사용자의 요청에 이미 위치가 명시되어 있으면(예: "마지막에 추가해줘", "OO 앞에 넣어줘") 그대로 따르고 따로 묻지 않는다.
명시되어 있지 않으면 묻지 않고 **가장 앞(맨 위)에 추가하는 것을 기본값**으로 한다.

특정 아티클 기준(앞/뒤)으로 넣어달라는 요청이 있으면, `src/data/research.ts`의 `title`/`slug`와 대조해 위치를 찾는다. 일치하는 아티클이 없으면 다시 확인해달라고 요청한다.

## 절차

1. `src/data/research.ts`를 읽고 현재 배열 형식과 순서, 기존 slug 목록을 확인한다.
2. 위 입력 항목으로 새 아티클 객체를 만든다. 필드 순서는 `slug` → `title` → `date` → `blocks`(각 블록은 `heading` → `image`(있는 경우만) → `text`)로, 기존 코드 스타일(따옴표, 들여쓰기, trailing comma)을 그대로 따른다.
3. Edit 도구로 정해진 위치에 객체를 삽입한다.
4. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/research.ts
   pnpm exec tsc -b --noEmit
   ```
5. 에러가 있으면 고치고, 없으면 어떤 아티클을 어디에 추가했는지 사용자에게 짧게 알려준다. 이미지를 추가하고 싶으면 `public/research/{slug}-{블록 순서}.jpg`에 파일만 넣으면 된다고 안내한다(예: slug가 `crispr-new-research`이고 첫 번째 블록이면 `public/research/crispr-new-research-1.jpg`). 화면 확인은 `pnpm dev` 실행 후 Research 페이지에서 볼 수 있다고 안내한다.

## 하지 말 것

- `src/components/RichText.tsx`, `src/components/ArticleImage.tsx`, `src/routes/research/index.tsx`, `src/routes/research/$slug.tsx`는 이미 이 데이터를 렌더링하도록 연결되어 있으므로 수정하지 않는다.
- 제목이나 본문 내용을 사용자가 안 주면 임의로 지어내지 말고 반드시 물어본다.
- slug는 사용자 확인 없이 임의로 확정하지 않는다(자동 제안 후 반드시 확인받는다).
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
