---
name: delete-gallery
description: Gallery 페이지의 게시물 삭제하기
argument-hint: '[삭제할 게시물 id 또는 제목 일부] (생략 가능, 생략 시 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Gallery 게시물 삭제

Gallery 페이지 데이터(`src/data/gallery.ts`)에서 게시물을 삭제하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 되돌리기 어려운 작업이므로 반드시 대상 확인을 거친 뒤에만 삭제한다.

## 입력

`$ARGUMENTS`에 삭제할 게시물의 id 또는 제목 일부가 있으면 그것을 사용한다. 없으면 물어본다.

```
/delete-gallery 3
/delete-gallery KSMCB 동계학술대회
```

## 절차

1. `src/data/gallery.ts`를 읽는다.
2. 입력받은 값으로 `id`(정확히 일치) 또는 `title`(부분 일치, 대소문자 무시)을 대조해 대상을 찾는다.
   - 일치하는 게시물이 없으면 다시 확인해달라고 요청한다. 임의로 비슷한 게시물을 골라 진행하지 않는다.
   - 제목으로 찾을 때 일치하는 게시물이 여러 개면 후보 목록(id/제목/업로드일)을 보여주고 어떤 게시물인지 선택해달라고 물어본다.
3. 대상이 하나로 정해지면, 그 게시물의 정보(id, 제목, 업로드일, 이미지 개수)를 그대로 보여주며 "이 게시물이 맞나요? 삭제하면 되돌리기 어렵습니다" 같은 문구로 반드시 확인을 받는다.
4. 사용자가 명확히 확인한 경우에만 Edit 도구로 `gallery` 배열에서 해당 객체를 제거한다. 확인 전에는 절대 파일을 수정하지 않는다.
5. **다른 게시물의 id는 절대 건드리지 않는다.** 예를 들어 id 3인 게시물을 삭제해도 id 4를 3으로 바꾸는 등 뒤 번호를 당겨오지 않는다. id는 각 게시물의 고유 식별자이자 이미지 파일명 접두어이므로, 삭제된 id는 그냥 결번으로 남는다(다음에 새 게시물을 추가할 때도 기존 최댓값 + 1을 그대로 사용하면 됨. 삭제된 결번을 재사용하지 않는다).
6. 이미지 파일 삭제 여부를 확인한다.
   - `ls public/gallery/{id}-*`로 해당 id의 원본/썸네일 파일 목록을 확인한다.
   - 파일이 있으면 사용자에게 "이미지 파일(`public/gallery/{id}-1.ext` 등 N개)도 같이 삭제할까요?"라고 물어본다.
   - 사용자가 삭제를 확인한 경우에만 Bash로 그 게시물의 파일들만 정확히 삭제한다. `ls`로 확인된 파일명을 하나하나 명시해서 지운다(예: `rm public/gallery/3-1.jpg public/gallery/3-1-thumb.jpg public/gallery/3-2.jpg public/gallery/3-2-thumb.jpg`). 와일드카드나 `-r`/`-f` 옵션은 쓰지 않는다 — 실수로 다른 파일까지 지우는 것을 방지하기 위해 항상 정확한 파일명만 나열한다.
   - 파일이 없거나 사용자가 원치 않으면 삭제하지 않는다.
7. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/gallery.ts
   pnpm exec tsc -b --noEmit
   ```
8. 에러가 있으면 고치고, 없으면 어떤 게시물(id, 제목)을 삭제했는지, 이미지 파일도 같이 지웠는지 짧게 알려준다.

## 하지 말 것

- 확인 없이 바로 삭제하지 않는다. 대상이 애매하거나 후보가 여러 개일 때 임의로 하나를 골라 삭제하지 않는다.
- **삭제 후 남은 게시물들의 id를 재정렬하지 않는다.** id는 항상 원래 값 그대로 유지되어야 한다.
- `src/components/GalleryImage.tsx`, `src/components/GalleryCarousel.tsx`, `src/routes/gallery/index.tsx`, `src/routes/gallery/$id.tsx`, `scripts/generate-gallery-thumbnail.mjs`는 수정하지 않는다.
- 이미지 파일 삭제는 반드시 별도로 확인받은 뒤, 확인된 파일명만 정확히 지운다. 와일드카드 삭제나 확인 없는 삭제는 하지 않는다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
