---
name: add-publication
description: Publication 페이지의 논문 추가하기
argument-hint: '[제목 | 저널명 | 연도 | 저자 | 링크] (생략 가능, 생략 시 대화로 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Publication 논문 추가

Publication 페이지 데이터(`src/data/publication.ts`)에 새 논문을 추가하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 입력 예시를 보여주고, 필요한 정보만 물어본다.

## 배경 지식

- 이 데이터는 `id` 같은 고유 번호가 없다. 목록의 번호는 **배열 순서에서 자동으로 계산**된다(배열 첫 항목이 가장 큰 번호). 새 논문을 맨 앞에 추가하면 자동으로 가장 큰 번호가 매겨진다.
- 저자 목록(`authors`)은 원문 그대로 붙여넣는 **하나의 문자열**이다. 이름별로 배열을 나누지 않는다.
- `BOLD_AUTHORS` 배열에 있는 문자열이 `authors` 안에 포함되어 있으면 그 부분만 자동으로 볼드 처리된다.

## 입력

사용자가 `$ARGUMENTS`로 아래 형식을 파이프(`|`)로 구분해 줄 수 있습니다:

```
/add-publication CRISPR-based diagnostic platform for rapid pathogen detection | Nature Biotechnology | 2026 | Kim, S., Kim H. S., Lee, J. | https://www.nature.com/articles/example
```

값이 일부 또는 전부 비어 있으면, 아래를 차례로 물어보세요.

1. **제목** — 필수. 임의로 지어내지 않는다.
2. **저널명** — 필수.
3. **연도** — 필수. 숫자.
4. **저자** — 필수. 원문(예: 논문 페이지에 있는 그대로) 텍스트를 그대로 붙여넣어 달라고 안내. 임의로 축약하거나 재구성하지 않는다.
5. **링크(URL)** — 필수. 논문 원문/DOI 링크.

## 절차

1. `src/data/publication.ts`를 읽고 현재 배열 형식과 `BOLD_AUTHORS` 목록을 확인한다.
2. 입력받은 저자 문자열에 실험실 소속 저자(랩 멤버) 이름이 있는지 확인한다. 이미 `BOLD_AUTHORS`에 있는 표기와 일치하면 그대로 두고, 새로운 표기 형태(예: 기존엔 `Kim H. S.`만 있는데 이번엔 `Kim, H.S.`처럼 쉼표/띄어쓰기가 다른 형태)로 보이면 사용자에게 이 저자도 볼드 처리할지, `BOLD_AUTHORS`에 새 표기를 추가할지 물어본다. 임의로 추가하지 않는다.
3. 위 입력 항목으로 새 논문 객체를 만든다. 필드 순서는 `title` → `journal` → `year` → `authors` → `url`. 기존 코드 스타일(따옴표, 들여쓰기, trailing comma)을 그대로 따른다.
4. Edit 도구로 배열 **맨 앞**에 삽입한다(최신 논문이 가장 큰 번호를 받도록 하는 기존 규칙). 사용자가 특정 위치(예: 특정 연도 사이)를 지정하면 그 위치를 따른다.
5. 2번에서 `BOLD_AUTHORS`에 새 표기를 추가하기로 확인받았다면 배열에 추가한다.
6. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/publication.ts
   pnpm exec tsc -b --noEmit
   ```
7. 에러가 있으면 고치고, 없으면 어떤 논문을 추가했는지, 몇 번으로 표시되는지 사용자에게 짧게 알려준다. 화면 확인은 `pnpm dev` 실행 후 Publication 페이지에서 볼 수 있다고 안내한다.

## 하지 말 것

- `src/routes/publication/index.tsx`는 이미 이 데이터를 렌더링하도록 연결되어 있으므로 수정하지 않는다.
- 제목, 저널명, 저자, 링크를 사용자가 안 주면 임의로 지어내지 말고 반드시 물어본다.
- 저자 문자열을 임의로 요약/재구성하지 않는다. 원문 그대로 사용한다.
- `BOLD_AUTHORS`에 새 표기를 사용자 확인 없이 임의로 추가하지 않는다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
