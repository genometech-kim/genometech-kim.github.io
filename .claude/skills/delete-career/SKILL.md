---
name: delete-career
description: 교수 소개 페이지의 Career 항목 삭제하기
argument-hint: '[연도 또는 내용 일부] (생략 가능, 생략 시 물어봄)'
allowed-tools: [Read, Edit, Bash]
---

# Career 항목 삭제

Professor 페이지의 Career 섹션 데이터(`src/data/career.ts`)에서 항목을 삭제하는 스킬.
코드나 파일 경로 얘기는 하지 않는다. 되돌리기 어려운 작업이므로 반드시 대상 확인을 거친 뒤에만 삭제한다.

## 입력

`$ARGUMENTS`에 삭제할 항목을 특정할 수 있는 연도 또는 내용 일부가 있으면 그것을 사용한다. 없으면 물어본다.

```
/delete-career 2019 - 2023
/delete-career Stanford
```

## 절차

1. `src/data/career.ts`를 읽는다.
2. 입력받은 값으로 `year`/`description`/`institution`을 대조해 대상을 찾는다(부분 일치 허용, 대소문자 무시).
   - 일치하는 항목이 없으면 다시 확인해달라고 요청한다. 임의로 비슷한 항목을 골라 진행하지 않는다.
   - 일치하는 항목이 여러 개면 후보 목록(연도/내용/기관)을 전부 보여주고 어떤 항목인지 선택해달라고 물어본다.
3. 대상이 하나로 정해지면, 그 항목의 정보(연도, 내용, 소속기관)를 그대로 보여주며 "이 항목이 맞나요? 삭제하면 되돌리기 어렵습니다" 같은 문구로 반드시 확인을 받는다.
4. 사용자가 명확히 확인한 경우에만 Edit 도구로 `career` 배열에서 해당 객체를 제거한다. 확인 전에는 절대 파일을 수정하지 않는다.
5. 변경 후 아래 명령으로 검증한다:
   ```bash
   pnpm exec eslint src/data/career.ts
   pnpm exec tsc -b --noEmit
   ```
6. 에러가 있으면 고치고, 없으면 어떤 항목을 삭제했는지 짧게 알려준다.

## 하지 말 것

- 확인 없이 바로 삭제하지 않는다. 대상이 애매하거나 후보가 여러 개일 때 임의로 하나를 골라 삭제하지 않는다.
- `src/components/YearContentList.tsx`, `src/routes/members/professor.tsx`는 수정하지 않는다.
- git commit은 사용자가 명시적으로 요청하지 않는 한 하지 않는다.
