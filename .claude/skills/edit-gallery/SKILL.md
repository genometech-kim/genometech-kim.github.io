---
name: edit-gallery
description: Gallery 페이지의 게시물 수정하기
argument-hint: '[수정할 게시물 id 또는 제목 일부] (생략 가능, 생략 시 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Gallery 게시물 수정

Gallery 페이지 데이터(`src/data/gallery.ts`)와 연결된 이미지 파일(`public/gallery/`)을 함께 수정하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 무엇을 바꿀지 명확히 확인한 뒤에만 수정한다.

## 배경 지식

- 게시물의 `id`는 고유 식별자이자 이미지 파일명 접두어. **수정 중에도 절대 바꾸지 않는다.**
- 한 게시물 안의 이미지는 `{id}-1.ext`, `{id}-2.ext`, ... `{id}-{imageCount}.ext` 형태로 **빈틈없이 연속된 번호**여야 한다. `GalleryImage`/`GalleryCarousel` 컴포넌트가 1번부터 `imageCount`번까지 순서대로 찾아서 렌더링하기 때문에, 중간 번호 하나가 비면 그 뒤 이미지들은 아예 화면에 안 뜬다.
- 썸네일은 각 원본과 짝을 이루는 `{id}-{n}-thumb.jpg`.

## 입력

`$ARGUMENTS`에 수정할 게시물의 id 또는 제목 일부가 있으면 그것을 사용한다. 없으면 물어본다.

```
/edit-gallery 3
/edit-gallery KSMCB 동계학술대회
```

## 절차

1. `src/data/gallery.ts`를 읽는다.
2. 입력받은 값으로 `id`(정확히 일치) 또는 `title`(부분 일치, 대소문자 무시)을 대조해 대상을 찾는다.
   - 일치하는 게시물이 없으면 다시 확인해달라고 요청한다. 임의로 비슷한 게시물을 골라 진행하지 않는다.
   - 제목으로 찾을 때 후보가 여러 개면 후보 목록(id/제목/업로드일)을 보여주고 선택해달라고 물어본다.
3. 대상이 하나로 정해지면, 현재 정보(id, 제목, 업로드일, 이미지 개수, 설명 텍스트 유무)를 보여주고 무엇을 바꿀지 물어본다. 가능한 변경 종류:
   - 제목 수정
   - 업로드일 수정 (형식 `YYYY.MM.DD`)
   - 설명 텍스트(`text`) 추가/수정/삭제
   - 이미지 삭제 (아래 "이미지 삭제" 참고)
   - 이미지 추가 (아래 "이미지 추가" 참고)
   - 이미지 순서 변경 (아래 "이미지 순서 변경" 참고)
4. 변경 내용을 확정하기 전에 "이렇게 바꾸면 될까요?"로 반드시 확인받는다. 확인 전에는 파일을 수정/삭제/생성하지 않는다.
5. 확인받은 대로 진행한 뒤, `src/data/gallery.ts`를 Edit 도구로 수정한다. 기존 코드 스타일(따옴표, 들여쓰기, trailing comma)을 그대로 따른다.
6. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/gallery.ts
   pnpm exec tsc -b --noEmit
   ```
7. 에러가 있으면 고치고, 없으면 무엇을 수정했는지 짧게 알려준다.

## 이미지 삭제

예: 게시물 id가 1이고 이미지가 `1-1`, `1-2`, `1-3` 3장인데 `1-2`만 삭제하고 싶은 경우.

1. 삭제할 번호(`n`)를 확인한다.
2. `n`의 원본/썸네일 파일을 삭제한다: `rm public/gallery/{id}-{n}.{ext} public/gallery/{id}-{n}-thumb.jpg`
3. **재정렬**: `n`보다 큰 번호들을 전부 한 칸씩 당긴다. 반드시 번호가 작은 것부터 순서대로 처리한다(그래야 이동할 자리가 이미 비어있어서 덮어쓰지 않는다).
   ```bash
   # 예: 1-3 → 1-2 (원본, 썸네일 둘 다)
   mv public/gallery/1-3.jpg public/gallery/1-2.jpg
   mv public/gallery/1-3-thumb.jpg public/gallery/1-2-thumb.jpg
   ```
   이미지가 더 있었다면(`1-4`, `1-5`...) 같은 방식으로 `1-4`→`1-3`, `1-5`→`1-4` 순서로 이어서 처리한다.
4. `gallery.ts`의 `imageCount`를 1 줄인다.

## 이미지 추가

1. 어떤 파일을 추가할지, 몇 번 위치에 넣을지(맨 끝이 기본값) 확인한다.
2. 맨 끝에 추가하는 경우: 새 파일을 `{id}-{imageCount + 1}.{원본 확장자, 소문자로 정규화}`로 저장(또는 사용자가 이미 그 파일명으로 넣어뒀다면 그대로 사용)하고, 썸네일을 생성한다:
   ```bash
   node scripts/generate-gallery-thumbnail.mjs public/gallery/{id}-{새 번호}.{확장자} public/gallery/{id}-{새 번호}-thumb.jpg
   ```
   그 다음 `imageCount`를 1 늘린다.
3. 중간에 끼워 넣는 경우: 먼저 끼워 넣을 위치 이후의 기존 이미지들을 번호가 **큰 것부터** 한 칸씩 뒤로 밀어야 한다(작은 것부터 하면 서로 덮어씀). 예를 들어 `1-2`와 `1-3` 사이에 새 이미지를 넣으려면, `1-3`→`1-4`부터 먼저 옮기고 그다음 새 이미지를 `1-3`으로 저장한다. 파일이 여러 개 밀려야 하면 항상 가장 큰 번호부터 역순으로 처리한다.

## 이미지 순서 변경

전체 순서를 바꾸는 경우(예: 2-3-1 순서로), 번호를 직접 하나씩 바꾸면 기존 파일을 덮어써서 서로 파일을 잃어버릴 수 있다. 반드시 임시 이름을 거쳐서 처리한다:

1. 모든 원본/썸네일을 임시 이름으로 옮긴다: `public/gallery/{id}-tmp-1.ext`, `public/gallery/{id}-tmp-2.ext` ...
2. 새로 정한 순서대로 임시 이름에서 최종 번호로 옮긴다: `public/gallery/{id}-tmp-2.ext` → `public/gallery/{id}-1.ext` 등.
3. 원본과 썸네일 둘 다 같은 방식으로 처리한다.

## 하지 말 것

- 확인 없이 바로 수정하지 않는다. 대상이 애매하거나 후보가 여러 개일 때 임의로 하나를 골라 진행하지 않는다.
- 게시물의 `id`는 절대 바꾸지 않는다.
- 이미지 번호를 재정렬할 때 큰 번호부터/작은 번호부터의 순서를 헷갈려서 파일을 덮어쓰지 않도록 주의한다. 순서 변경처럼 서로 자리를 바꾸는 경우 반드시 임시 이름을 거친다.
- `imageCount`와 실제 존재하는 파일 개수가 항상 일치하도록 맞춘다. 둘이 어긋난 채로 끝내지 않는다.
- `src/components/GalleryImage.tsx`, `src/components/GalleryCarousel.tsx`, `src/routes/gallery/index.tsx`, `src/routes/gallery/$id.tsx`, `scripts/generate-gallery-thumbnail.mjs`는 수정하지 않는다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
