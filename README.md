# 오준서 포트폴리오

로봇·피지컬 AI 분야 AI 연구원 지망.

전체 내용은 `index.html`을 브라우저로 열어 확인. 내용 수정은 `start-editor.bat` 실행 후 화면에서 직접.

---

## 이 저장소의 용도

지원서마다 이력을 처음부터 다시 쓰지 않기 위한 원천 DB.
모든 이력은 한 번만 기록하고, 지원처에 맞춰 필요한 항목과 분량만 골라 뽑아 쓰는 구조.

```
portfolio/
├─ index.html            열람·편집 화면
├─ start-editor.bat      편집 모드 실행 (더블클릭)
├─ assets/               화면 스타일·스크립트
├─ data/                 원천 DB
│  ├─ profile.json       이름, 소개, 목표 직무, 연락처
│  ├─ education.json     학력·교육
│  ├─ military.json      병역
│  ├─ awards.json        수상
│  ├─ projects.json      프로젝트
│  ├─ research.json      연구
│  ├─ targets.json       지원처 (회사·공고 키워드)
│  └─ taxonomy.json      항목 종류, 직무 키, 상태 값 정의
├─ media/                첨부 파일 (항목 ID별 폴더)
├─ dist/                 자동 생성물 (직접 수정 금지)
│  ├─ index.json         태그·직무·연도·상태별 인덱스
│  └─ portfolio.js       화면이 읽는 데이터 묶음
└─ scripts/
   ├─ serve.py           편집 모드 서버
   ├─ build.py           검증 + 인덱스 생성
   └─ extract.py         이력서·지원서용 텍스트 추출
```

## 사용법

필요 환경: Python 3.9 이상 (표준 라이브러리만 사용).

### 1. 보기

`index.html` 더블클릭. 검색창과 왼쪽 기술 인덱스로 항목을 좁혀 볼 수 있음.
사진·영상 썸네일을 누르면 크게 보기, 문서 파일은 눌러서 내려받기.
GitHub Pages(Settings → Pages → `main` 브랜치 루트)로 공개하면 같은 화면이 웹 주소로 열림. 이때는 보기 전용.

### 2. 편집

`start-editor.bat` 더블클릭 (또는 `python scripts/serve.py`). 브라우저가 열리고 상단에 **편집 모드** 표시.

- 섹션마다 **+ 추가**, 카드마다 **편집**, 머리말의 **프로필 편집**
- 편집 창에서 모든 칸 수정, 항목 삭제, 줄 단위 목록(내가 한 일, 결과, 문제 해결 기록 등) 추가·순서 변경
- **사진·영상·파일** 칸에 파일을 끌어다 놓거나 선택해서 첨부, 설명 입력, 순서 변경
- 저장(Ctrl+S)하면 `data/*.json`, `media/`, `dist/`가 한 번에 갱신됨

편집이 끝나면 터미널 창을 닫고 GitHub에 반영.

```bash
git add -A
git commit -m "학력 항목 추가"
git push
```

편집 서버는 내 컴퓨터(127.0.0.1)에서만 열림.

### 3. 첨부 규칙

| 종류 | 확장자 | 화면 표시 |
|---|---|---|
| 사진 | png jpg gif webp svg avif bmp | 본문에 썸네일, 누르면 크게 보기 |
| 영상 | mp4 webm mov m4v | 업로드할 때 한 장면을 캡처해 썸네일로 저장, 누르면 재생 |
| 유튜브 링크 | youtube.com, youtu.be | 유튜브 썸네일, 누르면 재생 |
| 그 밖의 파일 | hwp docx pdf pptx xlsx zip 등 | 첨부 파일 목록 (확장자 배지, 크기, 내려받기) |
| 그 밖의 링크 | 드라이브 등 | 첨부 파일 목록에 링크로 표시 |

- 파일당 95MB까지. GitHub은 100MB 넘는 파일을 받지 않으므로 큰 영상은 유튜브·드라이브에 올리고 링크로 첨부
- 파일 이름의 공백은 하이픈으로, 특수문자는 제거되어 `media/<항목 ID>/`에 저장
- 항목을 삭제하면 그 항목의 첨부 폴더도 함께 삭제

### 4. 이력서용 추출

화면 오른쪽 위 **이력서 추출** 또는 CLI. 둘은 같은 규칙으로 동작하고, 화면 패널 하단에 같은 결과를 내는 CLI 명령이 표시됨.

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
| `--strict` | `confirmed`(확정) 항목만 사용 |

학력·병역은 직무·태그·지원처 필터와 관계없이 항상 포함. `out/`은 git에서 제외.

### 5. JSON 직접 수정 (선택)

화면 대신 `data/*.json`을 직접 고쳐도 됨. 고친 뒤 빌드.

```bash
python scripts/build.py          # 검증 + dist/ 갱신
python scripts/build.py --check  # 검증만
```

## 데이터 규칙

| 필드 | 규칙 |
|---|---|
| `id` | `EDU-` `MIL-` `AWD-` `PRJ-` `RES-` `TGT-` 접두어 + 영문 대문자·숫자. 저장 후에는 바꾸지 않음 (첨부 폴더 이름, 지원 기록과 연결되는 키) |
| `status` | `draft` 보완 필요 · `confirmed` 확정 (이력서에 바로 사용) |
| `roles` | `research` AI 연구원 · `robotics` 로봇 AI 엔지니어 · `autonomy` 자율주행·내비게이션 · `vision` 비전·인식 · `llm` LLM 응용 · `eval` AI 평가·검증 |
| `summary.line` | 이력서 표 한 칸에 들어가는 한 문장 |
| `summary.short` | 자기소개서·요약란용 2~3문장 |
| `my_work[].mine` | 생략 시 직접 수행. `shared` 공동 수행, `team` 팀원 담당(맥락용, 추출 제외) |
| `results[].metric` | 결과 카드 제목이 되는 짧은 수치 |
| `attachments` | 첨부 목록. `type`(image·video·file·link), `path` 또는 `url`, `name`, `size`, `caption`, 영상은 `thumb` |
| `materials` | 원본 자료별 내용 메모. 열람용이며 이력서 추출에는 포함하지 않음 |
| `todo` | 보완할 것. 왼쪽 '보완할 것' 목록에 모임 |
| `[작성 필요]` | 대괄호 문구는 빈칸. 빌드가 집계하고, 추출 결과에 남으면 알림 |

## 문장 규칙

- 명사형 종결 ("~ 구현", "~ 확인", "~ 전환")
- 주어는 나. '참여함' 대신 직접 한 일과 결과를 구체적으로
- 직접 잰 숫자만 기록. 모르는 값은 `[__]`로 비워 두고 나중에 채움
- 대시(— –), 둥근 따옴표, '혁신적'·'성공적으로'·'다양한' 같은 근거 없는 수식어는 빌드가 경고로 알려 줌

## 브랜치

| 브랜치 | 용도 |
|---|---|
| `main` | 언제 꺼내 써도 되는 상태 |
| `develop` | 작업 통합 |
| `feature/*` | 데이터·기능 단위 작업 |
| `apply/<회사>` | 특정 지원처 제출본 보관이 필요할 때 `main`에서 분기 |

## 원본 자료

캡스톤 원본 폴더(`nd1_capstone_*`, `ND3_*`)는 로컬에만 보관하고 git에서 제외.
공개해도 되는 자료만 화면에서 해당 항목에 첨부. 원본별 내용 메모는 프로젝트의 '원본 자료 메모' 칸에 기록.
비공개 자료(진로 분석 리포트, 동료평가 등)는 `private/` 폴더에 두면 커밋에서 제외됨.
