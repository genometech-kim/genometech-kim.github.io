# 커스텀 도메인 연결 (crispr.hanyang.ac.kr)

GitHub Pages(`genometech-kim.github.io`)를 학교 도메인 `crispr.hanyang.ac.kr`에 연결하는 작업 기록.

- 최초 작성: 2026-08-30
- 담당: 김헌석 (heonseokkim@hanyang.ac.kr)
- 학교 도메인 신청번호: 20231227-001 / 사용기간 2023.12.28 ~ 2027.12.31

## 배경

- `genometech-kim.github.io`는 GitHub Pages 공용 Anycast IP로 해석됨
  - IPv4: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - IPv6: `2606:50c0:8000::153` ~ `2606:50c0:8003::153`
- 이 IP에는 수많은 Pages 사이트가 함께 얹혀 있어, GitHub 서버는 **Host 헤더(도메인 이름)** 로 사이트를 구분한다.
- 따라서 DNS만 바꾸면 안 되고, GitHub 쪽에 커스텀 도메인을 **등록**해야 한다.
  - DNS(학교) = 길 안내 / 커스텀 도메인 등록(GitHub) = 문패. 둘 다 필요.

## 단계

### 1단계 — 학교 DNS 신청 (완료: 2026-08-30 신청)

한양대 도메인 관리 시스템에서 기존 레코드를 교체 신청.

- 기존 `A / 121.78.88.83` 행 **삭제** (남겨두면 라운드로빈으로 절반이 옛 서버로 감)
- 권장: `CNAME / genometech-kim.github.io.` 한 줄
  - 서브도메인이라 CNAME 사용 가능. GitHub이 IP를 바꿔도 자동으로 따라감.
- CNAME 불가 시 대안: A 레코드 4줄 (위 IPv4 목록)

`hanyang.ac.kr`에 CAA 레코드가 없어 Let's Encrypt 인증서 발급은 막히지 않음 (확인 완료).

### 2단계 — DNS 반영 확인 (확인 절차, 생략 가능)

```bash
dig +short crispr.hanyang.ac.kr
```

GitHub 쪽 값으로 바뀌면 3단계 진행.

- 2026-08-30: 아직 `121.78.88.83` (학교 처리 대기 / 전파 중).
- **2026-08-31: 반영 완료.** `crispr.hanyang.ac.kr` → CNAME `genometech-kim.github.io` →
  `185.199.108.153 / .109.153 / .110.153 / .111.153`. 기존 A 레코드는 사라짐.

### 3단계 — 레포 설정 (진행 중: 2026-08-31)

1. `public/CNAME` 파일 생성, 내용 한 줄:
   ```
   crispr.hanyang.ac.kr
   ```
   Vite가 `public/`을 `dist/`로 그대로 복사하므로 배포마다 유지된다.
   (GitHub Actions 배포이므로 이 파일이 없으면 Settings 값이 초기화될 수 있음)
   → **완료**: 2026-08-31 `develop` 브랜치에 커밋 `50bbf73`. (push는 아직)
2. `develop` push → `auto-pr-to-main.yml`이 버전 범프 후 main으로 PR 자동 생성 →
   PR 병합 → `.github/workflows/deploy.yml` 배포 완료 대기
3. GitHub 레포 **Settings → Pages → Custom domain**에 `crispr.hanyang.ac.kr` 입력 → DNS check 통과 확인
4. 인증서 발급 후 **Enforce HTTPS** 체크 (최대 24시간 소요)

## 주의사항

- **순서 엄수**: DNS가 GitHub을 가리키기 *전에* `public/CNAME`을 push하면,
  `genometech-kim.github.io` 접속이 아직 연결 안 된 커스텀 도메인으로 리다이렉트되어
  그동안 사이트가 열리지 않는다.
- `vite.config.ts`의 `base`는 기본값 `/`이며, 커스텀 도메인에서도 그대로 동작한다. 수정 불필요.
- 연결 완료 후 `genometech-kim.github.io` 접속은 `crispr.hanyang.ac.kr`로 자동 리다이렉트된다.

## 남은 작업 (2026-08-31 기준)

1. `git push origin develop`
2. 자동 생성되는 `Release: v0.0.8` PR을 main에 병합 → 배포 확인
3. GitHub Settings → Pages → Custom domain에 `crispr.hanyang.ac.kr` 입력
4. Enforce HTTPS 체크 (인증서 발급까지 최대 24시간)

## 검증

```bash
dig +short crispr.hanyang.ac.kr          # GitHub IP 또는 CNAME 확인
curl -sI https://crispr.hanyang.ac.kr    # 200 확인
```
