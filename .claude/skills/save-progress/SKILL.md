---
name: save-progress
description: 지금까지 작업한 내용을 커밋(중간 저장)하는 스킬. push는 하지 않음
argument-hint: '[커밋 메시지] (생략 가능, 생략 시 변경 내용 보고 자동 작성)'
allowed-tools: [Read, Bash]
---

# 중간 저장 (커밋)

지금까지 작업한 내용을 커밋만 해두는 스킬. **push는 하지 않는다.**
작업을 마무리하고 push까지 하려면 `/finish-work`를 쓴다.

## 절차

1. `git branch --show-current`로 현재 브랜치를 확인한다.
   - `main`이나 `develop`이면 커밋하지 않는다. 이 두 브랜치에는 직접 커밋하지 않는 게 원칙이라고 안내하고, `/start-work`로 새 브랜치를 만들거나 기존 작업 브랜치로 이동할지 물어본다.
2. `git status`로 변경 사항을 확인한다. 변경 사항이 없으면 "커밋할 내용이 없습니다"라고 안내하고 끝낸다.
3. `git diff`(staged + unstaged 전부)로 실제 변경 내용을 확인한다. `.env`, credentials 등 비밀 정보로 보이는 파일이 포함되어 있으면 먼저 사용자에게 알리고 확인받는다.
4. 커밋 메시지를 정한다.
   - `$ARGUMENTS`에 메시지가 있으면 그걸 쓴다.
   - 없으면 `git log --oneline -10`으로 이 프로젝트의 기존 커밋 스타일(`feat:`, `fix:`, `style:`, `docs:`, `chore:`, `ci:`, `content:` 등 타입 접두어 + 한글 설명)을 참고해서, 변경 내용을 보고 "왜"에 초점을 맞춘 한두 문장으로 직접 작성한다.
5. 변경된 파일을 이름을 명시해서 하나씩 `git add`한다(`git add -A`/`git add .`처럼 통째로 추가하지 않는다).
6. 아래 형식으로 커밋한다:
   ```bash
   git commit -m "$(cat <<'EOF'
   <타입>: <설명>

   Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
   EOF
   )"
   ```
7. `git status`로 커밋이 잘 되었는지 확인하고, 무엇을 커밋했는지 짧게 안내한다.

## 하지 말 것

- push하지 않는다(그건 `/finish-work`의 역할).
- `main`/`develop` 브랜치에는 커밋하지 않는다.
- 비밀 정보로 보이는 파일은 확인 없이 커밋하지 않는다.
- 변경 내용과 무관한 파일을 임의로 같이 커밋하지 않는다.
