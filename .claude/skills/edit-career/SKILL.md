---
name: edit-career
description: 교수 소개 페이지의 Career 항목 수정하기
argument-hint: '[연도 또는 내용 일부] (생략 가능, 생략 시 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Career 항목 수정

Professor 페이지의 Career 섹션 데이터(`src/data/career.ts`)에서 기존 항목을 수정하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 무엇을 바꿀지 명확히 확인한 뒤에만 수정한다.

## 입력

`$ARGUMENTS`에 수정할 항목을 특정할 수 있는 연도 또는 내용 일부가 있으면 그것을 사용한다. 없으면 물어본다.

```
/edit-career 2019 - 2023
/edit-career Stanford
```

## 절차

1. `src/data/career.ts`를 읽는다.
2. 입력받은 값으로 `year`/`description`/`institution`을 대조해 대상을 찾는다(부분 일치 허용, 대소문자 무시).
   - 일치하는 항목이 없으면 다시 확인해달라고 요청한다. 임의로 비슷한 항목을 골라 진행하지 않는다.
   - 일치하는 항목이 여러 개면(예: 같은 기관에 재직한 이력이 여러 건인 경우), 후보 목록(연도/내용/기관)을 전부 보여주고 어떤 항목인지 선택해달라고 물어본다.
3. 대상이 하나로 정해지면, 현재 내용(연도, 내용, 소속기관)을 보여주고 무엇을 바꿀지 물어본다. 가능한 변경 종류:
   - 연도(또는 기간) 수정
   - 내용(학위/직함/수상 등) 수정
   - 소속기관/장소 수정
4. 변경 내용을 확정하기 전에 "이렇게 바꾸면 될까요?"로 반드시 확인받는다. 확인 전에는 파일을 수정하지 않는다.
5. 확인받은 내용대로 Edit 도구로 해당 항목 객체를 수정한다. 필드명(`year`/`description`/`institution`)과 기존 코드 스타일(따옴표, 들여쓰기, trailing comma)을 그대로 따른다.
   - 연도를 바꿔서 배열의 내림차순 정렬이 깨진다면, 정렬에 맞는 위치로 옮길지 사용자에게 물어본다(add-career와 동일하게, 애매하면 옮기지 않고 그대로 둔다).
6. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/career.ts
   pnpm exec tsc -b --noEmit
   ```
7. 에러가 있으면 고치고, 없으면 무엇을 수정했는지 짧게 알려준다.

## 하지 말 것

- 확인 없이 바로 수정하지 않는다. 대상이 애매하거나 후보가 여러 개일 때 임의로 하나를 골라 진행하지 않는다.
- `src/components/YearContentList.tsx`, `src/routes/members/professor.tsx`는 수정하지 않는다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
