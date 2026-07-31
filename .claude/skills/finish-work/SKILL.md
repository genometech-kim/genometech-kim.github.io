---
name: finish-work
description: 작업을 마무리하고 커밋 + push까지 하는 스킬. push하면 develop으로 자동 PR이 생성됨
argument-hint: '[커밋 메시지] (생략 가능)'
allowed-tools: [Read, Bash]
---

# 작업 완료 (커밋 + push)

작업을 마무리할 때 쓰는 스킬. 남은 변경사항을 커밋하고, 브랜치를 원격 저장소로 push한다.
push하면 GitHub Actions가 자동으로 `develop`을 base로 하는 PR을 열어준다.

## 절차

1. `git branch --show-current`로 현재 브랜치를 확인한다.
   - `main`이나 `develop`이면 진행하지 않는다. `/start-work`로 브랜치부터 정리하도록 안내한다.
2. `git status`로 커밋 안 된 변경사항이 있는지 확인한다.
   - 있으면 `save-progress` 스킬과 동일한 절차로 커밋한다: `git diff`로 실제 내용 확인 → 비밀 정보로 보이는 파일 있으면 먼저 확인 → 커밋 메시지 결정(`$ARGUMENTS`에 있으면 사용, 없으면 `git log --oneline -10`의 스타일을 참고해 직접 작성) → 파일을 이름 명시해서 하나씩 `git add` → 아래 형식으로 커밋.
     ```bash
     git commit -m "$(cat <<'EOF'
     <타입>: <설명>

     Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
     EOF
     )"
     ```
   - 커밋 안 된 변경사항이 없으면 이 단계는 건너뛴다.
3. (권장) `pnpm build`를 실행해서 타입 에러나 빌드 에러가 없는지 확인한다.
   - 에러가 있으면 임의로 고치지 말고 사용자에게 알린 뒤, 그래도 이 상태로 push할지 아니면 먼저 고칠지 물어본다.
4. 이 브랜치가 원격에 이미 push된 적 있는지 확인한다(`git rev-parse --abbrev-ref --symbolic-full-name @{u}` 실행해서 성공하면 이미 있음).
   - 처음 push하는 브랜치면 `git push -u origin <현재 브랜치명>`
   - 이미 push된 적 있으면 `git push`
5. push 결과를 확인하고 사용자에게 안내한다:
   - `develop`을 base로 하는 PR이 자동으로 생성된다는 것(이미 열려있는 PR이 있으면 새로 만들지 않음). GitHub PR 탭에서 확인하고 리뷰 후 merge하면 된다고 안내한다.
   - merge 이후 흐름(자동 버전 증가 → `main`으로 PR 자동 생성 → merge → GitHub Pages 자동 배포)은 README의 "작업하기" 섹션에 정리되어 있다고 짧게 언급한다.

## 하지 말 것

- `main`/`develop` 브랜치에서는 실행하지 않는다.
- PR을 직접 만들려고 하지 않는다(자동화가 처리한다).
- 비밀 정보로 보이는 파일은 확인 없이 커밋하지 않는다.
- 빌드/타입 에러가 있는데 사용자 확인 없이 임의로 코드를 고쳐서 진행하지 않는다.
