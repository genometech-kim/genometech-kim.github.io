---
name: add-career
description: 교수 소개 페이지의 Career 항목 추가하기
argument-hint: '[연도 | 내용 | 소속기관] (생략 가능, 생략 시 대화로 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Career 항목 추가

Professor 페이지의 Career 섹션 데이터(`src/data/career.ts`)에 새 항목을 추가하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 입력 예시를 보여주고, 필요한 정보만 물어본다.

## 입력

사용자가 `$ARGUMENTS`로 아래 형식을 파이프(`|`)로 구분해 줄 수 있습니다:

```
/add-career 2013 - 2019 | Ph.D. in Molecular Biology | Harvard University, Cambridge, USA
```

값이 일부 또는 전부 비어 있으면, 아래 세 가지를 차례로 물어보세요.

1. **연도(또는 기간)** — 예: `2008 - 2013`
2. **내용** — 학위, 직함, 수상 등 한 줄 (예: `B.S. in Chemistry and Biology`)
3. **소속 기관 / 장소** — 예: `Seoul National University, Seoul, Korea`

## 절차

1. `src/data/career.ts`를 읽고 현재 배열 형식과 순서를 확인한다.
2. 새 항목 객체를 `{ year, description, institution }` 형태로 만들어, 연도 기준 내림차순으로 맞는 위치에 삽입한다. 순서를 판단하기 애매하면 배열 맨 끝에 추가한다.
3. Edit 도구로 배열에 항목을 추가한다. 필드명(`year`/`description`/`institution`)과 기존 코드 스타일(따옴표, 들여쓰기, trailing comma)을 그대로 따른다.
4. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/career.ts
   pnpm exec tsc -b --noEmit
   ```
5. 에러가 있으면 고치고, 없으면 어떤 항목을 추가했는지 사용자에게 짧게 알려준다. 화면 확인은 `pnpm dev` 실행 후 Professor 페이지에서 볼 수 있다고 안내한다.

## 하지 말 것

- `src/components/YearContentList.tsx`나 `src/routes/members/professor.tsx`는 이미 이 데이터를 렌더링하도록 연결되어 있으므로 수정하지 않는다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
