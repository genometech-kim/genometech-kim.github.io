---
name: add-member
description: Member 페이지의 멤버 카드 추가하기
argument-hint: '[이름(영문) | 직함 | 이메일 | 한글이름(선택)] (생략 가능, 생략 시 대화로 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# 멤버 항목 추가

Member 페이지 데이터(`src/data/members.ts`)에 새 멤버를 추가하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 입력 예시를 보여주고, 필요한 정보만 물어본다.

## 입력

사용자가 `$ARGUMENTS`로 아래 형식을 파이프(`|`)로 구분해 줄 수 있습니다:

```
/add-member Jihoon Park | Ph.D. Candidate | jpark@hanyang.ac.kr | 박지훈
```

값이 일부 또는 전부 비어 있으면, 아래를 차례로 물어보세요.

1. **이름(영문)** — 필수. 예: `Jihoon Park`
2. **직함/과정** — 예: `Ph.D. Candidate`, `M.S. Candidate`, `Post-Doc`
3. **이메일** — 필수. 예: `jpark@hanyang.ac.kr`
4. **이름(한글)** — 선택. 없으면 카드에 영문 이름만 표시됨
5. **사진 파일명을 이메일과 다르게 쓸지** — 보통 물어볼 필요 없음. `public/members/{이메일 아이디}.jpg`(또는 jpeg/png/webp)를 자동으로 찾으므로, 사용자가 별도로 언급하지 않으면 `photo` 필드는 생략한다.

## 삽입 위치

사용자의 요청에 이미 위치가 명시되어 있으면(예: "OO 앞에 넣어줘", "OO 뒤에 추가해줘") 그대로 따르고 따로 묻지 않는다.
명시되어 있지 않으면 아래 세 가지 중 어디에 추가할지 물어본다.

1. 가장 마지막에 추가 (기본값으로 안내)
2. 가장 앞에 추가
3. 특정 멤버 앞/뒤에 추가 — 기준이 될 멤버의 이름(영문 또는 한글)을 물어본다

기준 멤버를 지정한 경우, `src/data/members.ts`의 `nameEn`/`nameKo`와 대조해 위치를 찾는다. 일치하는 멤버가 없으면 이름 철자를 다시 확인해달라고 요청한다.

## 절차

1. `src/data/members.ts`를 읽고 현재 배열 형식과 순서를 확인한다.
2. 위 입력 항목으로 새 멤버 객체를 만든다. 필드 순서는 `nameKo`(있는 경우만) → `nameEn` → `position` → `email` → `photo`(있는 경우만)로, 기존 코드 스타일(따옴표, 들여쓰기, trailing comma)을 그대로 따른다.
3. Edit 도구로 정해진 위치(맨 끝 / 맨 앞 / 특정 멤버 기준 앞뒤)에 객체를 삽입한다.
4. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/members.ts
   pnpm exec tsc -b --noEmit
   ```
5. 에러가 있으면 고치고, 없으면 어떤 멤버를 어디에 추가했는지 사용자에게 짧게 알려준다. 사진을 추가하고 싶으면 `public/members/{이메일 아이디}.jpg`에 파일만 넣으면 된다고 안내한다. 화면 확인은 `pnpm dev` 실행 후 Member 페이지에서 볼 수 있다고 안내한다.

## 하지 말 것

- `src/components/MemberCard.tsx`, `src/components/Pagination.tsx`, `src/routes/members/member.tsx`는 이미 이 데이터를 렌더링하도록 연결되어 있으므로 수정하지 않는다.
- 이메일이나 영문 이름을 사용자가 안 주면 임의로 지어내지 말고 반드시 물어본다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
