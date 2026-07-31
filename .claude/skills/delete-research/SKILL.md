---
name: delete-research
description: Research 페이지의 아티클 삭제하기
argument-hint: '[삭제할 아티클 제목 또는 slug] (생략 가능, 생략 시 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Research 아티클 삭제

Research 페이지 데이터(`src/data/research.ts`)에서 아티클을 삭제하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 되돌리기 어려운 작업이므로 반드시 대상 확인을 거친 뒤에만 삭제한다.

## 입력

`$ARGUMENTS`에 삭제할 아티클의 제목 또는 slug가 있으면 그것을 사용한다. 없으면 물어본다.

```
/delete-research crispr-new-research
/delete-research CRISPR 신규 연구
```

## 절차

1. `src/data/research.ts`를 읽는다.
2. 입력받은 값으로 `title`/`slug`와 대조해 대상을 찾는다(부분 일치 허용, 대소문자 무시).
   - 일치하는 아티클이 없으면 철자를 다시 확인해달라고 요청한다. 임의로 비슷한 아티클을 골라 진행하지 않는다.
   - 일치하는 아티클이 여러 개면 후보 목록(제목/slug)을 보여주고 어떤 아티클인지 선택해달라고 물어본다.
3. 대상이 하나로 정해지면, 그 아티클의 정보(제목, slug, 날짜, 블록 개수와 각 소제목)를 그대로 보여주며 "이 아티클이 맞나요? 삭제하면 되돌리기 어렵습니다" 같은 문구로 반드시 확인을 받는다.
4. 사용자가 명확히 확인한 경우에만 Edit 도구로 `research` 배열에서 해당 객체를 제거한다. 확인 전에는 절대 파일을 수정하지 않는다.
5. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/research.ts
   pnpm exec tsc -b --noEmit
   ```
6. 에러가 있으면 고치고, 없으면 어떤 아티클을 삭제했는지 짧게 알려준다.
7. 삭제된 아티클에 연결된 이미지 파일이 있는지 블록별로 확인한다.
   - 블록에 `image` 필드가 지정되어 있었다면 그 경로.
   - 없었다면 `public/research/{slug}-{블록 순서}.{jpg|jpeg|png|webp}`를 순서대로 확인.
   - 실제로 존재하는 파일이 있으면(`ls` 등으로 확인) 목록으로 보여주고, "이 이미지 파일들도 같이 삭제할까요?"라고 물어본다.
   - 사용자가 삭제를 확인한 경우에만 Bash로 확인된 파일들만 정확히 삭제한다(`rm public/research/파일명` 형태로 파일명을 각각 명시하고, 와일드카드나 `-r`/`-f` 옵션은 절대 쓰지 않는다).
   - 파일이 없거나 사용자가 원치 않으면 삭제하지 않는다.

## 하지 말 것

- 확인 없이 바로 삭제하지 않는다. 대상이 애매하거나 후보가 여러 개일 때 임의로 하나를 골라 삭제하지 않는다.
- `src/components/RichText.tsx`, `src/components/ArticleImage.tsx`, `src/routes/research/index.tsx`, `src/routes/research/$slug.tsx`는 수정하지 않는다.
- 이미지 파일 삭제는 반드시 별도로 확인받은 뒤, 확인된 파일만 정확히 삭제한다. 와일드카드 삭제나 확인 없는 삭제는 하지 않는다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
