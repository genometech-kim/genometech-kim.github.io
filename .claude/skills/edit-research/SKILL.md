---
name: edit-research
description: Research 페이지의 아티클 수정하기
argument-hint: '[제목 또는 slug] (생략 가능, 생략 시 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Research 아티클 수정

Research 페이지 데이터(`src/data/research.ts`)에서 기존 아티클을 수정하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 무엇을 바꿀지 명확히 확인한 뒤에만 수정한다.

## 입력

`$ARGUMENTS`에 수정할 아티클의 제목 또는 slug가 있으면 그것을 사용한다. 없으면 물어본다.

```
/edit-research crispr-new-research
/edit-research CRISPR 신규 연구
```

## 절차

1. `src/data/research.ts`를 읽는다.
2. 입력받은 값으로 `title`/`slug`와 대조해 대상을 찾는다(부분 일치 허용, 대소문자 무시).
   - 일치하는 아티클이 없으면 철자를 다시 확인해달라고 요청한다. 임의로 비슷한 아티클을 골라 진행하지 않는다.
   - 일치하는 아티클이 여러 개면 후보 목록(제목/slug)을 보여주고 어떤 아티클인지 선택해달라고 물어본다.
3. 대상이 하나로 정해지면, 현재 내용(제목, slug, 날짜, 각 블록의 소제목/본문 요약)을 보여주고 무엇을 바꿀지 물어본다. 가능한 변경 종류:
   - 제목 수정
   - slug 수정 (주의: slug를 바꾸면 기존 이미지 파일명 `public/research/{기존slug}-{순서}.jpg`도 새 이름으로 옮겨야 계속 표시된다는 점을 안내)
   - 날짜 수정 (형식 `YYYY.MM.DD`)
   - 특정 블록의 소제목/본문 수정
   - 블록 추가 (위치 포함해서 물어봄: 마지막/맨 앞/특정 블록 기준)
   - 블록 삭제 (삭제 시 연결된 이미지 파일이 있으면 delete-research와 동일하게 삭제 여부를 확인)
   - 블록 순서 변경
4. 변경 내용을 확정하기 전에 "이렇게 바꾸면 될까요?"로 반드시 확인받는다. 확인 전에는 파일을 수정하지 않는다.
5. 확인받은 내용대로 Edit 도구로 해당 아티클 객체를 수정한다. 기존 코드 스타일(따옴표, 들여쓰기, trailing comma)을 그대로 따른다.
6. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/research.ts
   pnpm exec tsc -b --noEmit
   ```
7. 에러가 있으면 고치고, 없으면 무엇을 수정했는지 짧게 알려준다.

## 강조 표시 문법 (본문 수정 시 참고)

- 볼드: `**텍스트**`
- 색상: `{{red:텍스트}}` (CSS color 키워드 아무거나 가능)
- 둘 다: `{{red:**텍스트**}}`

## 하지 말 것

- 확인 없이 바로 수정하지 않는다. 대상이 애매하거나 후보가 여러 개일 때 임의로 하나를 골라 진행하지 않는다.
- `src/components/RichText.tsx`, `src/components/ArticleImage.tsx`, `src/routes/research/index.tsx`, `src/routes/research/$slug.tsx`는 수정하지 않는다.
- slug를 바꿀 때 이미지 파일을 임의로 이동/삭제하지 않는다. 반드시 사용자에게 안내하고 필요하면 별도로 확인받은 뒤 Bash로 정확한 파일 하나만 옮기거나 삭제한다(와일드카드 금지).
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
