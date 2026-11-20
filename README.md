# 오준서 포트폴리오

로봇·피지컬 AI 분야 AI 연구원 지망.

프로젝트는 내용 검증 후 순차 입력 예정. 전체 내용은 `index.html`을 브라우저로 열어 확인.

---

## 이 저장소의 용도

지원서마다 이력을 처음부터 다시 쓰지 않기 위한 원천 DB.
모든 이력은 `data/`에 한 번만 기록하고, 지원처에 맞춰 필요한 항목과 분량만 골라 뽑아 쓰는 구조.

```
portfolio/
├─ index.html            열람 UI (서버 없이 더블클릭으로 열림)
├─ assets/               UI 스타일·스크립트
├─ data/                 원천 DB (직접 수정하는 곳)
│  ├─ profile.json       이름, 소개, 목표 직무, 연락처
│  ├─ education.json     학력·교육 이수
│  ├─ military.json      병역
│  ├─ awards.json        수상
│  ├─ projects.json      프로젝트
│  ├─ research.json      연구
│  ├─ targets.json       지원처 (회사·공고 키워드)
│  └─ taxonomy.json      항목 종류, 직무 키, 상태 값 정의
├─ dist/                 build.py 생성물 (직접 수정 금지)
│  ├─ index.json         태그·직무·연도·상태별 인덱스
│  └─ portfolio.js       UI가 읽는 데이터 묶음
├─ docs/evidence/        공개용 근거 자료 (프로젝트 입력 시 추가)
└─ scripts/
   ├─ build.py           검증 + 인덱스 생성
   └─ extract.py         이력서·지원서용 텍스트 추출
```

## 사용법

필요 환경: Python 3.9 이상 (표준 라이브러리만 사용).

### 1. 보기

`index.html` 더블클릭. 상단에서 직무별 보기, 검색, 작성 양식 보기 전환.
왼쪽 기술 인덱스의 태그를 누르면 그 기술을 쓴 항목만 표시.

### 2. 수정

`data/*.json` 편집 후 빌드.

```bash
python scripts/build.py          # 검증 + dist/ 갱신
python scripts/build.py --check  # 검증만
```

빌드가 확인하는 것: ID 중복과 접두어, 직무 키, 근거 파일 경로, 빈칸 개수, 문장 규칙(아래).

### 3. 이력서용 추출

UI 오른쪽 위 **이력서 추출** 또는 CLI. 둘은 같은 규칙으로 동작하고, UI 패널 하단에 같은 결과를 내는 CLI 명령이 표시됨.

```bash
python scripts/extract.py --list                                  # ID 목록
python scripts/extract.py --detail line --profile                 # 전체 한 줄 요약
python scripts/extract.py --role autonomy --detail full           # 자율주행 직무용 상세
python scripts/extract.py --tag Nav2,YOLO11n --detail short       # 기술 태그 기준
python scripts/extract.py --ids PRJ-01 --detail full --format txt
python scripts/extract.py --target TGT-HYUNDAI-ROBOTICS --profile --out out/hyundai.md
```

| 옵션 | 내용 |
|---|---|
| `--detail` | `line` 한 줄 · `short` 요약(내가 한 일, 결과) · `full` 상세(문제 해결 기록, 기술 선택 근거 포함) |
| `--role` | 직무 키. 프로젝트 안의 '내가 한 일', '문제 해결'도 해당 직무 항목 위주로 추림 |
| `--target` | `data/targets.json`의 키워드·직무와 겹치는 프로젝트만 관련도 순으로 정렬 |
| `--format` | `md` · `txt` · `json` |
| `--strict` | 빈칸 없는 `confirmed` 항목만 사용 |

학력·병역은 직무·태그·지원처 필터와 관계없이 항상 포함. `out/`은 git에서 제외.

## 데이터 규칙

| 필드 | 규칙 |
|---|---|
| `id` | `EDU-` `MIL-` `AWD-` `PRJ-` `RES-` `TGT-` 접두어 + 영문 대문자. 한 번 정하면 바꾸지 않음 (지원 기록과 연결되는 키) |
| `status` | `confirmed` 완성 · `draft` 본문 완성, 일부 빈칸 · `template` 빈 양식(추출 제외) |
| `roles` | `research` AI 연구원 · `robotics` 로봇 AI 엔지니어 · `autonomy` 자율주행·내비게이션 · `vision` 비전·인식 · `llm` LLM 응용 · `eval` AI 평가·검증 |
| `my_work[].mine` | 생략 시 직접 수행. `shared` 공동 수행, `team` 팀원 담당(맥락용, 추출 제외) |
| `summary.line` | 이력서 표 한 칸에 들어가는 한 문장 |
| `summary.short` | 자기소개서·요약란용 2~3문장 |
| `results[].metric` | UI 결과 카드 제목이 되는 짧은 수치 |
| `materials` | 원본 자료(기획서, 발표자료 등)별 내용 요약. 열람용이며 이력서 추출에는 포함하지 않음 |
| `priority` | 같은 섹션 안 정렬 우선순위 (클수록 위) |
| `[작성 필요]` | 대괄호 문구는 빈칸. 빌드가 집계하고, 추출 결과에 남으면 알림 |

## 문장 규칙

- 명사형 종결 ("~ 구현", "~ 확인", "~ 전환")
- 주어는 나. '참여함' 대신 직접 한 일과 결과를 구체적으로
- 직접 잰 숫자만 기록. 모르는 값은 `[__]`로 비워 두고 나중에 채움
- 대시(— –)와 둥근 따옴표 사용 금지 (빌드 오류)
- '혁신적', '성공적으로', '다양한' 같은 근거 없는 수식어 지양 (빌드 경고)

## 브랜치

| 브랜치 | 용도 |
|---|---|
| `main` | 언제 꺼내 써도 되는 상태 |
| `develop` | 작업 통합 |
| `feature/*` | 데이터·기능 단위 작업 |
| `apply/<회사>` | 특정 지원처 제출본 보관이 필요할 때 `main`에서 분기 |

## 원본 자료

캡스톤 원본 폴더(`nd1_capstone_*`, `ND3_*`)는 로컬에만 보관하고 git에서 제외.
프로젝트를 입력할 때 원본 자료별 내용은 해당 프로젝트의 `materials`에 요약으로 기록하고,
공개해도 되는 요약 PDF는 `docs/evidence/`에 두고 `evidence`에 경로를 적음.
새 프로젝트는 `data/projects.json`의 `PRJ-01` 양식을 복사해 `PRJ-영문이름` ID로 작성.
비공개 자료(진로 분석 리포트, 동료평가 등)는 `private/` 폴더에 두면 커밋에서 제외됨.
