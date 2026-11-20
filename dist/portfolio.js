/* scripts/build.py가 생성한 파일. 직접 수정하지 말고 data/*.json을 고친 뒤 다시 빌드 */
window.PORTFOLIO = {
 "profile": {
  "name": "오준서",
  "name_en": "Oh jun seo",
  "headline": "Robot manipulation 및  자율주행 모빌리티 연구 학부생",
  "target_roles": [
   "research",
   "robotics",
   "autonomy"
  ],
  "interest_roles": [],
  "target_industries": [
   "로봇·피지컬 AI",
   "모빌리티·자율주행"
  ],
  "contact": {
   "email": "jhss4262@gmail.com",
   "github": "juunseo",
   "blog": "https://blog.naver.com/dhcjsxor321"
  },
  "intro": [],
  "updated": "2026-11-20"
 },
 "taxonomy": {
  "types": {
   "education": {
    "label": "학력",
    "prefix": "EDU",
    "file": "education.json",
    "order": 1
   },
   "training": {
    "label": "교육",
    "prefix": "TRN",
    "file": "training.json",
    "order": 2
   },
   "military": {
    "label": "병역",
    "prefix": "MIL",
    "file": "military.json",
    "order": 3
   },
   "award": {
    "label": "수상",
    "prefix": "AWD",
    "file": "awards.json",
    "order": 4
   },
   "project": {
    "label": "프로젝트",
    "prefix": "PRJ",
    "file": "projects.json",
    "order": 5
   },
   "research": {
    "label": "연구",
    "prefix": "RES",
    "file": "research.json",
    "order": 6
   }
  },
  "roles": {
   "research": {
    "label": "AI 연구원",
    "desc": "연구 물음 설정, 실험 설계, 기존 방법 대비 비교와 재현"
   },
   "robotics": {
    "label": "로봇 AI 엔지니어",
    "desc": "센서, 제어, 시뮬레이션을 묶는 로봇 소프트웨어 통합"
   },
   "autonomy": {
    "label": "자율주행·내비게이션",
    "desc": "SLAM, 위치추정, 경로계획, Nav2 운용"
   },
   "vision": {
    "label": "비전·인식",
    "desc": "객체 탐지, depth 기반 거리 추정, 좌표 변환"
   },
   "llm": {
    "label": "LLM 응용",
    "desc": "자연어 명령 해석, 구조화 출력, 폴백 설계"
   },
   "eval": {
    "label": "AI 평가·검증",
    "desc": "엔드투엔드 검증, 오류 원인 분석, 회귀 테스트"
   }
  },
  "status": {
   "confirmed": {
    "label": "확정",
    "desc": "빈칸 없이 완성된 항목"
   },
   "draft": {
    "label": "보완 필요",
    "desc": "본문 완성, 일부 사실(기간·인원 등) 빈칸"
   },
   "template": {
    "label": "작성 양식",
    "desc": "빈 양식. 이력서 추출 대상에서 제외"
   }
  },
  "contribution": {
   "self": {
    "label": "직접 수행",
    "desc": "기본값. 표시 생략"
   },
   "shared": {
    "label": "공동 수행",
    "desc": "팀원과 함께 수행한 일"
   },
   "team": {
    "label": "팀원 담당",
    "desc": "맥락용 기록. 이력서 추출에서 제외"
   }
  }
 },
 "records": [
  {
   "id": "EDU-01",
   "type": "education",
   "status": "confirmed",
   "title": "기본 학력사항",
   "org": "전주대학교",
   "period": {
    "start": "2022-03",
    "end": "2026-11",
    "note": "재학 중"
   },
   "summary": {
    "line": "",
    "short": ""
   },
   "tags": [
    "ROS2",
    "Python",
    "isaacsim",
    "simulation",
    "Gazebo",
    "Mujoco",
    "VLA",
    "LLM"
   ],
   "roles": [],
   "links": [],
   "attachments": [],
   "todo": [],
   "degree": "학사",
   "major": "인공지능학과",
   "minor": "",
   "gpa": "4.33",
   "courses": []
  },
  {
   "id": "PRJ-CAVE",
   "type": "project",
   "status": "draft",
   "title": "동굴 재난 탐사·조난자 탐지 로봇",
   "subtitle": "사족보행 로봇 Go2로 지도 작성, 자율주행, 조난자 위치 산출을 잇는 구조 로봇 시뮬레이션",
   "org": "전주대 피지컬 AI 나노디그리 ND3 캡스톤 · 팀 멍멍",
   "period": {
    "start": "",
    "end": "2026-11",
    "note": ""
   },
   "team": {
    "size": null,
    "my_role": "자율주행·인지 파이프라인 통합"
   },
   "summary": {
    "line": "Gazebo 동굴 월드에서 Unitree Go2로 지도를 만들고 자율주행하며, 카메라로 찾은 조난자의 지도 좌표를 산출하는 ROS 2 시스템",
    "short": "2D LiDAR SLAM으로 지도 작성, Nav2로 목표 지점 이동, YOLO11n 탐지 결과를 depth·카메라 파라미터·TF와 결합해 조난자 map 좌표 발행. 1m 이내 접근 시 자동 정지."
   },
   "problem": "동굴·갱도 붕괴 현장은 구조대 진입이 위험하고 통신·GPS가 끊겨 위치 파악부터 어려운 환경. 바위·단차가 많아 바퀴형 로봇 주행도 제한적.",
   "goal": "카메라 픽셀 → 거리 → 로봇 기준 좌표 → 지도 좌표로 변환해 구조대가 찾아갈 수 있는 조난자 위치 산출",
   "architecture": [
    "Gazebo 동굴 월드 + Go2(2D·3D LiDAR, RGB-D 카메라)",
    "slam_toolbox 라이브 매핑 / 저장 지도 + AMCL 중 선택",
    "YOLO11n 사람 탐지 → depth 거리 → TF·로봇 위치 결합 → /survivor_position",
    "RViz 목표점 → Nav2 경로 계획 → CHAMP 보행 제어"
   ],
   "my_work": [
    {
     "text": "오픈소스 3종(동굴 월드, CHAMP 기반 Go2, 생존자 탐지)을 한 워크스페이스로 이식·통합",
     "roles": [
      "robotics"
     ]
    },
    {
     "text": "라이브 SLAM과 저장 지도 + AMCL을 독립 launch로 분리, 반복 실험은 저장 지도로 조건 고정",
     "roles": [
      "autonomy"
     ]
    },
    {
     "text": "조난자 위치 계산: 박스 중앙 30% 영역의 depth 중앙값으로 거리 추정 후 카메라 파라미터·TF·로봇 위치로 지도 좌표 산출",
     "roles": [
      "vision"
     ]
    },
    {
     "text": "3프레임 연속 탐지 + 1m 이내 접근 시 자동 정지 로직 구현",
     "roles": [
      "robotics",
      "vision"
     ]
    },
    {
     "text": "RViz 목표점 지정 → Nav2 경로 계획·장애물 감지 시 재계획 흐름 구성",
     "roles": [
      "autonomy"
     ]
    }
   ],
   "results": [
    {
     "metric": "E2E 검증 완료",
     "text": "탐지 → 좌표 계산 → 발행 → 1m 이내 자동 정지 전 과정을 조난자 모형으로 확인"
    },
    {
     "metric": "좌표 오차 1m 이내",
     "text": "모형 중심 기준 수십 cm ~ 1m (눕거나 기댄 자세에서 증가)"
    },
    {
     "metric": "2개 모드 동작",
     "text": "라이브 SLAM, 저장 지도 기반 자율주행 모두 정상"
    }
   ],
   "troubleshooting": [
    {
     "title": "튜닝값 미반영",
     "problem": "코스트맵을 고쳐도 동작이 그대로, 오류 메시지 없음",
     "cause": "launch가 params_file을 넘기지 않아 기본값으로 조용히 폴백",
     "fix": "params_file 전달, 실행 시 파라미터 로딩 여부부터 확인하는 절차 도입",
     "result": "튜닝값 정상 반영",
     "roles": [
      "autonomy"
     ]
    },
    {
     "title": "바닥을 장애물로 인식",
     "problem": "로봇 바로 앞을 항상 막힌 것으로 판단해 경로 계획 실패",
     "cause": "3D LiDAR 하단 채널의 바닥 반사점을 장애물로 표시 (min_obstacle_height 0.0)",
     "fix": "min_obstacle_height 0.0 → 0.08",
     "result": "경로 계획 정상화",
     "roles": [
      "autonomy"
     ]
    },
    {
     "title": "위치 추정 수 미터 이탈",
     "problem": "RViz 위치와 실제 위치가 수 미터 차이",
     "cause": "AMCL 기본 노이즈 설정(alpha 0.2)이 드리프트 큰 실제 로봇 기준",
     "fix": "alpha1~5를 0.02로 낮춰 오도메트리 신뢰도 상향",
     "result": "위치 이탈 해소",
     "roles": [
      "autonomy"
     ]
    }
   ],
   "decisions": [
    {
     "choice": "바퀴형 대신 사족보행 Go2",
     "reason": "바위·단차·경사 지형에서 주행 가능성이 더 높음"
    },
    {
     "choice": "드론 모델 폐기, Go2로 일원화",
     "reason": "불규칙한 지형 고도와 장애물로 드론 자율 탐색 결과 미달, 기간 안에 보완 어려움"
    },
    {
     "choice": "완전 자율 탐사 대신 목표점 지정 + 자율주행",
     "reason": "explore_lite 도달 오판정 버그와 지형으로 인한 지도 틀어짐"
    }
   ],
   "stack": [],
   "lessons": [
    "튜닝이 안 먹히면 값보다 파일이 실제로 로드되는지부터 확인하는 순서"
   ],
   "next": [
    "explore_lite 버그 해결 후 완전 자율 매핑",
    "조난자까지 A* · Theta* · RRT* 경로계획 비교",
    "시뮬레이션 전용 오도메트리를 EKF·LiDAR odometry로 교체 (실기체 대비)"
   ],
   "materials": [
    {
     "label": "발표자료 (12쪽)",
     "detail": "배경(동굴 조난 사례), 목표, 주요 기술, 3차원 위치 계산·좌표 변환 단계, 한계와 재구성, 내비게이션, 시연"
    },
    {
     "label": "프로젝트 요약 (6쪽)",
     "detail": "아키텍처, 좌표 체계, 개발 이슈 10건과 해결, 검증 상태, 실행 절차"
    },
    {
     "label": "시연 영상",
     "detail": "자율주행과 조난자 탐지·자동 정지 (webm 2개)"
    }
   ],
   "tags": [
    "ROS 2",
    "Nav2",
    "SLAM",
    "AMCL",
    "Gazebo",
    "Unitree Go2",
    "YOLO11n",
    "RGB-D",
    "LiDAR",
    "Python"
   ],
   "roles": [
    "robotics",
    "autonomy",
    "vision",
    "eval"
   ],
   "links": [
    {
     "label": "GitHub (내 저장소)",
     "url": "https://github.com/juunseo/go2-cave-slam-nav2"
    },
    {
     "label": "GitHub 팀 원본 저장소",
     "url": "https://github.com/boseon25/go2-cave-slam-nav2"
    }
   ],
   "attachments": [],
   "todo": [
    "팀 인원과 내 역할 명칭 확인",
    "시작월 입력",
    "시연 영상 첨부 또는 링크 추가"
   ]
  },
  {
   "id": "PRJ-VACCINE",
   "type": "project",
   "status": "draft",
   "title": "병원 백신 배달 로봇",
   "subtitle": "자연어 명령 한 줄로 혈액형별 백신을 배달하는 TurtleBot3 시뮬레이션",
   "org": "전주대 피지컬 AI 나노디그리 ND1 캡스톤 · 팀 Vaccine",
   "period": {
    "start": "",
    "end": "2026-07",
    "note": "발표 2026.07.03"
   },
   "team": {
    "size": 6,
    "my_role": "ROS 2 · Nav2 연동"
   },
   "summary": {
    "line": "\"301호 환자에게 A형 독감 백신 가져다줘\" 한 문장으로 약국 픽업부터 병실 배달까지 수행하는 ROS 2 로봇 시뮬레이션",
    "short": "LLM이 자연어 명령을 mission JSON으로 바꾸고, 상태머신이 Nav2 이동과 Gazebo 픽업·배치를 차례로 실행하는 구조. 6인 팀에서 시뮬레이션 환경 구성, AMCL·Nav2 연동, 이동 흐름 검증 담당."
   },
   "problem": "로봇에게 일을 시키려면 좌표·토픽·액션 서버를 알아야 하고, 이동과 파지 명령이 따로 놀아 '백신 배달'이라는 하나의 흐름으로 이어지지 않는 상태.",
   "goal": "혈액형 → 백신 종류 → 병실 번호를 자연어에서 해석해 약국 이동 → 픽업 → 병실 이동 → 배치를 사람 개입 없이 완료",
   "architecture": [
    "자연어 명령 → LLM 파서(실패 시 규칙 기반 폴백) → mission JSON",
    "상태머신(FSM): 이동 → 픽업 → 이동 → 배치 → 완료, 단계별 재시도",
    "Nav2 목표 좌표 이동 · Gazebo 텔레포트 방식 픽업·배치",
    "고정 병원 지도 + AMCL 위치추정"
   ],
   "my_work": [
    {
     "text": "AWS RoboMaker Hospital World 도입, TurtleBot3 · Gazebo Classic 11 시뮬레이션 환경 구성",
     "roles": [
      "robotics"
     ],
     "mine": "shared"
    },
    {
     "text": "map_server + AMCL + Nav2 연동, RViz 초기 위치 설정과 약국·병실 목표 이동 테스트",
     "roles": [
      "autonomy"
     ],
     "mine": "shared"
    },
    {
     "text": "병원 지도 작성 시도(explore_lite, teleop). 긴 복도 누적 오차와 문틀 끼임 확인 후 고정 지도 + AMCL 방식으로 전환",
     "roles": [
      "autonomy"
     ]
    },
    {
     "text": "LLM 명령 입력과 시뮬레이션 연동, 명령부터 배치 완료까지 실제 이동 흐름 검증",
     "roles": [
      "robotics",
      "llm",
      "eval"
     ]
    }
   ],
   "results": [
    {
     "metric": "E2E 성공 2개 조합",
     "text": "301호·A형, 302호·B형 명령 입력부터 배치 완료까지 전 과정 성공"
    },
    {
     "metric": "LLM 장애 시 동작 유지",
     "text": "API 키가 무효여도 규칙 기반 폴백 파서로 자동 전환"
    },
    {
     "metric": "타임아웃 재현 0회",
     "text": "픽업 응답 유실 원인 수정 이후 같은 증상 없음"
    }
   ],
   "troubleshooting": [
    {
     "title": "픽업 응답 유실",
     "problem": "약국 도착 후 /delete_entity 호출이 계속 타임아웃 (5초 → 20초로 늘려도 실패)",
     "cause": "실제로는 삭제 완료 상태. 콜백 안에서 spin을 다시 돌리는 재진입 구조로 응답 미전달",
     "fix": "future.add_done_callback 기반 비동기 구조로 재작성",
     "result": "타임아웃 재현 0회",
     "roles": [
      "robotics"
     ]
    },
    {
     "title": "병원 지도 품질",
     "problem": "실시간 SLAM 지도가 휘고 뒤틀리는 현상",
     "cause": "긴 직선 복도의 누적 오차, 좁은 문틀 끼임",
     "fix": "검증된 고정 지도 + map_server + AMCL 위치추정으로 전환",
     "result": "위치추정 안정화, 배달 흐름 검증에 일정 집중",
     "roles": [
      "autonomy"
     ]
    },
    {
     "title": "Gazebo 화면 크래시",
     "problem": "gzclient 실행 직후 종료",
     "cause": "자동으로 붙는 단종 안내 플러그인(libgazebo_ros_eol_gui.so)과 카메라 초기화 충돌",
     "fix": "플러그인 없이 gzclient를 직접 실행하도록 launch 수정",
     "result": "크래시 해소",
     "roles": [
      "robotics"
     ]
    }
   ],
   "decisions": [
    {
     "choice": "실시간 SLAM 대신 고정 지도 + AMCL",
     "reason": "좁은 병실 입구와 긴 복도에서 SLAM 품질 불안정. 위치추정만 하는 쪽이 가볍고 안정적"
    },
    {
     "choice": "LLM + 규칙 기반 폴백",
     "reason": "API 장애가 나도 같은 mission 형식을 유지해 뒤쪽 노드에 영향 없음"
    },
    {
     "choice": "mission JSON 중간 계약",
     "reason": "LLM은 명령 구조화만, 경로 계획과 장애물 회피는 Nav2가 맡도록 책임 분리"
    }
   ],
   "stack": [],
   "lessons": [
    "타임아웃이 나면 대기 시간을 늘리기 전에 실제 상태부터 확인하는 순서"
   ],
   "next": [
    "303호·AB형, 304호·O형 조합 검증과 회귀 테스트",
    "여러 배달 요청의 큐잉·우선순위 처리",
    "텔레포트 대신 로봇팔 실제 파지"
   ],
   "materials": [
    {
     "label": "기획서 (8쪽)",
     "detail": "팀 역할, 요구사항 7개와 검증 방법, 3노드 구조, 30시간 개발 계획, 리스크 대비책"
    },
    {
     "label": "결과보고서 (7쪽)",
     "detail": "노드별 구현 현황, 실행 방법, E2E 증빙, 트러블슈팅, 회고"
    },
    {
     "label": "발표자료 (12쪽)",
     "detail": "배경(감염병 병동 물류), LLM·FSM 파트, 시뮬레이션 테스트·데모"
    },
    {
     "label": "Runbook (2쪽)",
     "detail": "빌드·실행 순서, 명령 발행, 증상별 조치"
    },
    {
     "label": "시연 영상",
     "detail": "명령 입력부터 배치 완료까지 (mp4 2개, webm 1개)"
    }
   ],
   "tags": [
    "ROS 2",
    "Nav2",
    "AMCL",
    "Gazebo",
    "TurtleBot3",
    "LLM",
    "Groq API",
    "상태머신(FSM)",
    "Python"
   ],
   "roles": [
    "robotics",
    "autonomy",
    "llm",
    "eval"
   ],
   "links": [
    {
     "label": "GitHub (내 저장소)",
     "url": "https://github.com/juunseo/capstone_team3"
    },
    {
     "label": "GitHub 팀 원본 저장소",
     "url": "https://github.com/boseon25/capstone_team3"
    },
    {
     "label": "시연 영상 (Google Drive)",
     "url": "https://drive.google.com/drive/folders/1dNTDRravAHDpeVM6yv4RLfx1ZmiWcdDK"
    }
   ],
   "attachments": [],
   "todo": [
    "시작월 입력",
    "직접 잰 수치 추가 (배달 1회 소요 시간 등)"
   ]
  },
  {
   "id": "RES-SO101-PAPER",
   "type": "research",
   "status": "draft",
   "priority": 30,
   "kind": "개인 연구 · 논문 준비 (진행 중)",
   "title": "조명 변화에 강한 VLA 추론: 추론 시점 액션 청크 보정",
   "org": "개인 연구 · SO-ARM101 실물 로봇",
   "period": {
    "start": "2026-11",
    "end": "",
    "note": "진행 중"
   },
   "summary": {
    "line": "기본 조명에서 학습한 VLA 정책이 조명이 바뀌어도 같은 액션 청크를 내도록, 재학습 없이 추론 시점에 보정하는 방법을 찾는 논문 준비 연구",
    "short": "조명 변화 → 이미지 토큰 변화 → 액션 청크 흔들림을 학습 데이터 확대가 아닌 추론 시점에서 다루는 접근. 선행 조건인 '기본 조명에서 지시색을 정확히 고르는 정책'을 위해 삼중 수집 방식을 설계하고, 같은 실물 데이터로 SmolVLA와 GR00T N1.7의 내부 어텐션 비교."
   },
   "question": "학습 때와 다른 조명에서도 추론 시점 보정만으로 기본 조명에서 성공했던 액션 청크를 되찾을 수 있는가.",
   "method": "삼중 수집(같은 장면·위치·조명에서 세 색을 한 번씩 시연, 장면마다 색 순서 섞음)으로 실물 데이터 수집. 블록 색 × 조명 조건 × (지시색 선택 정확도, 파지 성공률) 3축 실험 설계, 솔루션 적용 전후 비교 예정. 카메라 노출 고정·화이트밸런스 자동. 선행 연구 SALT를 기준 방법으로 분석하고, 백본 셀프 어텐션·액션 헤드 결합/크로스 어텐션 맵을 실시간으로 시각화해 모델 내부 비교.",
   "result": "실물 120 에피소드(색별 40). SmolVLA는 파지 모두 성공, 지시색 선택 대부분 실패. 같은 데이터로 학습한 GR00T N1.7은 지시색 선택·파지 모두 거의 100%. 어텐션 맵 비교로 SmolVLA는 백본 단계부터 지시색을 놓치고 액션 헤드가 세 색 블록을 동시에 참조한다는 점 확인.",
   "limits": "조명 조건(실험 y축) 미확정, 솔루션 적용 전 단계. 평가 횟수와 성공률 집계 기준 정리 필요.",
   "findings": [
    "SmolVLA 실패 가설: 지시문을 쓰지 못하면 삼중 데이터는 한 장면에 정답 궤적이 3개인 다봉 분포가 되고, flow matching 정책이 초기 노이즈로 그중 하나를 골라 수행. 파지는 정확하지만 색 선택은 사실상 무작위",
    "GR00T N1.7이 앞선 구조적 이유 분석: 파라미터 약 7배, 백본 뒤 vl_self_attention 4블록에서 이미지·지시문 토큰을 다시 섞고, 액션 헤드가 텍스트·이미지 KV를 따로 크로스 어텐션해 지시 신호 유지",
    "SALT 분석: 아직 실행하지 않은 액션 청크(leftover)를 목표로 액션 헤드 attention key 투영의 배율을 추론 중 갱신. 교란이 에피소드 시작부터 있으면 효과가 작고, 재계획마다 지연 증가 (SmolVLA 기준 약 135ms → 559ms)"
   ],
   "next": [
    "베이스 모델 결정 (SmolVLA / GR00T N1.7)",
    "조명 조건 확정 후 솔루션 적용 전후 비교 실험"
   ],
   "publication": "",
   "tags": [
    "SO-ARM101",
    "VLA",
    "SmolVLA",
    "GR00T N1.7",
    "LeRobot",
    "Test-time adaptation",
    "어텐션 분석",
    "Python"
   ],
   "roles": [
    "research",
    "robotics",
    "eval"
   ],
   "links": [
    {
     "label": "블로그: SO-ARM 101 논문",
     "url": "https://blog.naver.com/dhcjsxor321/224433307306"
    },
    {
     "label": "참고: SALT (arXiv 2610.07946)",
     "url": "https://arxiv.org/abs/2610.07946"
    },
    {
     "label": "참고: SmolVLA (arXiv 2506.01844)",
     "url": "https://arxiv.org/abs/2506.01844"
    }
   ],
   "attachments": [],
   "todo": [
    "실물 평가 횟수 기록 (GR00T '거의 100%'의 시행 수)",
    "어텐션 맵 이미지 첨부",
    "논문 제출처·일정 입력"
   ]
  },
  {
   "id": "RES-SO101-SIM2REAL",
   "type": "research",
   "status": "draft",
   "priority": 20,
   "kind": "개인 연구 (진행 중)",
   "title": "SO-ARM101 색상 Pick & Place: 시뮬레이션 데이터 기반 VLA 학습과 실패 원인 진단",
   "org": "개인 연구 · Isaac Lab 시뮬레이션",
   "period": {
    "start": "2026-06",
    "end": "",
    "note": "진행 중"
   },
   "summary": {
    "line": "Isaac Lab에서 만든 시연 데이터로 VLA 정책(SmolVLA, GR00T N1.7)을 학습해 SO-ARM101이 지시한 색의 물체를 같은 색 상자에 넣도록 하는 sim-to-real 연구",
    "short": "실물 시연 데이터 수집 비용을 줄이려고 시뮬레이터에서 도메인 랜덤화한 데이터를 만드는 과정 기록. 색 인지·파지 실패의 원인을 가설 → 검증 실험 → 기각 순서로 좁혀, 모델 구조보다 데이터 수집 방식에서 생기는 숏컷 학습이 핵심이라는 결론 도출."
   },
   "question": "VLA 정책이 언어 지시의 색을 보고 목표 물체를 고르게 하려면 무엇이 필요한가. 시뮬레이션 데이터로 이를 학습시킬 수 있는가.",
   "method": "SO-ARM101 리더암 텔레오퍼레이션으로 Isaac Lab 가상 환경에서 시연 수집(손목·상단 카메라 2대, RGB·depth·segmentation 영상 + 관절 6축). 조명(HDRI)·물체 색·위치 도메인 랜덤화. SmolVLA·GR00T N1.7 파인튜닝(RTX 5070 로컬, A100 서버). 원인 진단을 위해 VLM 백본 질의, 백본 출력 선형 프로브, 보조 헤드 유무 비교, 반사실 지시문 테스트 수행.",
   "result": "153 에피소드(68,772 프레임, 색별 51) 시뮬레이션 데이터 구축. SmolVLA는 그리퍼 개폐는 학습했지만 빨강 지시 실측 1/8 성공, 색 재설계 후 재학습에서도 10% 미만. 백본 프로브로 지시색 블록 위치 74% 적중을 확인해 원인 범위를 정책 쪽으로 축소. 같은 장면에서 지시문만 바꾸는 3묶음 수집으로 바꾸자 GR00T 정책의 색 인지 문제 해소(영상 확인, 성공률 미측정).",
   "limits": "성공률은 10회 단위 평가 위주로 체계적 측정 전. 시뮬레이션 단독 결과라 실물 성능은 별도 확인 필요. 물체 위치 범위를 바꾸면 일반화 성능 저하.",
   "findings": [
    "초기 실물 30 + 시뮬 30 에피소드 혼합 학습 실패로 sim-to-real 격차 확인",
    "카메라 오프셋은 오일러 각 수동 입력으로 9cm 오차 발생, 시뮬레이터 prim의 로컬 트랜스폼을 읽어 쿼터니언으로 쓰는 방식으로 해결",
    "GR00T N1.7(3B)에 30 에피소드 파인튜닝 시 그리퍼 개폐 미학습, 데이터 규모 부족으로 진단하고 SmolVLA(약 450M)로 전환",
    "'물체가 비전 토큰 한 칸보다 작다'는 가설(큐브 35×13px, 토큰 1개 = 64×64px)을 크롭·해상도 상향과 백본 질의 실험으로 기각",
    "색을 왜곡하는 조명 3종을 빼고 HDRI 21종 채택, 기존 액션을 그대로 쓰는 재렌더링 파이프라인 구축 (오차 큰 7개 제외 146 에피소드)",
    "에피소드당 약 450프레임 중 언어가 필요한 결정은 한 번뿐이라 액션 손실에서 언어 신호가 묻히는 구조 확인",
    "검출기 마스크를 정책 입력에 넣으면 언어 접지 검증이 무의미해지고 보조 손실과 충돌한다고 판단해 마스킹 방식 철회",
    "보조 헤드 유무 비교에서 둘 다 색 인지 정상, 보조 헤드 가설 기각. 원인을 데이터 수집 방식에서 생기는 숏컷 학습으로 결론"
   ],
   "next": [
    "실물 데이터 수집과 실물·시뮬레이션 데이터 통합",
    "숏컷 학습을 줄이는 데이터 수집 방식 정리 (RES-SO101-PAPER로 연결)"
   ],
   "publication": "",
   "tags": [
    "SO-ARM101",
    "Isaac Sim",
    "Isaac Lab",
    "LeRobot",
    "SmolVLA",
    "GR00T N1.7",
    "VLA",
    "Sim-to-Real",
    "도메인 랜덤화",
    "Python"
   ],
   "roles": [
    "research",
    "robotics",
    "eval"
   ],
   "links": [
    {
     "label": "블로그: Sim to real So-arm 101",
     "url": "https://blog.naver.com/dhcjsxor321/224400031657"
    },
    {
     "label": "참고: Robust Skills, Brittle Grounding (arXiv 2602.24143)",
     "url": "https://arxiv.org/abs/2602.24143"
    },
    {
     "label": "참고: OBEYED-VLA (arXiv 2512.22519)",
     "url": "https://arxiv.org/abs/2512.22519"
    }
   ],
   "attachments": [],
   "todo": [
    "프로브 74%의 지표 정의 입력 (예: 오차 몇 cm 이내 비율)",
    "평가 회차별 성공률 표 정리",
    "실험 영상·그래프 첨부"
   ]
  },
  {
   "id": "RES-MYCOBOT",
   "type": "research",
   "status": "draft",
   "priority": 10,
   "kind": "개인 연구·실물 배포 워크숍 (진행 중)",
   "title": "myCobot 280 텔레오퍼레이션: MuJoCo 연동과 조이스틱 제어 튜닝",
   "org": "개인 연구 · myCobot 280 M5Stack",
   "period": {
    "start": "2026-10",
    "end": "",
    "note": "진행 중"
   },
   "summary": {
    "line": "myCobot 280을 MuJoCo 시뮬레이터와 연동하고, AI 학습용 시연 데이터를 끊김 없이 모을 수 있도록 조이스틱 텔레오퍼레이션 제어를 실측으로 튜닝",
    "short": "공식 URDF를 실제 구성(카메라 플랜지 + 어댑티브 그리퍼)에 맞춰 MuJoCo와 실물을 실시간 연동. 조종 지연을 줄이려고 조이스틱 입력으로 바꾸고 명령 방식·전송 주기·서보 속도·PID를 측정하며 조정해 시연 데이터 수집 기반 마련."
   },
   "question": "보급형 로봇팔로 VLA 학습에 쓸 시연 데이터를 끊김·떨림 없이 수집하려면 어떤 제어 설정이 필요한가.",
   "method": "공식 mycobot_ros2의 URDF·메시를 실제 구성에 맞게 수정해 MuJoCo 연동(관절 한계 일치). pymycobot으로 실물 제어, 조이스틱 매핑(J1~J6, 그리퍼, 비상 정지). 응답 대기 없는 set_encoders_drag와 펌웨어 jog 명령 방식 비교, 관절별 서보 최저 속도 측정, 관절별 PID D값 조정.",
   "result": "set_encoders_drag 30Hz 스트리밍 + 보간 펌웨어 모드 + 목표 제한 ±8°로 매끄러운 추종. J1~J3 서보가 약 26°/s 아래로 내려가지 않는 것을 측정해 조이스틱 속도를 30°/s로 고정. 카메라·그리퍼로 앞쪽이 무거워 생기던 떨림을 J2·J3 D값 8 → 16으로 완화. 펌웨어 jog 방식은 관절이 멈추지 않는 폭주 위험으로 제외.",
   "limits": "질량·토크 파라미터 미보정(관절 한계만 일치), 시뮬레이션 화면 추종 지연 일부 남음. 데이터 수집·학습 단계 전.",
   "findings": [
    "LeRobot은 펌웨어를 거치지 않고 서보에 바로 명령해 지연이 적고, myCobot은 펌웨어를 거쳐 명령 방식 선택이 지연을 좌우함",
    "J5는 D값을 낮춰 봤다가 공장값(25)으로 되돌림"
   ],
   "next": [
    "조이스틱으로 시연 데이터 수집",
    "AI 학습·추론과 실물 배포"
   ],
   "publication": "",
   "tags": [
    "myCobot 280",
    "MuJoCo",
    "pymycobot",
    "텔레오퍼레이션",
    "PID 튜닝",
    "Python",
    "Ubuntu 24.04"
   ],
   "roles": [
    "robotics",
    "research"
   ],
   "links": [
    {
     "label": "블로그: Mycobot 280 m5 stack robot arm",
     "url": "https://blog.naver.com/dhcjsxor321/224440638595"
    },
    {
     "label": "공식 mycobot_ros2",
     "url": "https://github.com/elephantrobotics/mycobot_ros2"
    },
    {
     "label": "공식 pymycobot",
     "url": "https://github.com/elephantrobotics/pymycobot"
    }
   ],
   "attachments": [],
   "todo": [
    "질량·토크 보정 후 시뮬레이션-실물 오차 측정",
    "텔레오퍼레이션 영상 첨부"
   ]
  }
 ],
 "targets": [
  {
   "id": "TGT-TEMPLATE",
   "status": "template",
   "company": "[회사명]",
   "position": "[공고명]",
   "deadline": "[YYYY-MM-DD]",
   "url": "",
   "products": [
    "[회사가 파는 제품·서비스 2~3개]"
   ],
   "metrics": [
    "[이 직무의 성과를 재는 숫자]"
   ],
   "keywords": [
    "[공고 필수·우대 기술 그대로]"
   ],
   "roles": [],
   "pitch": "[내 경험과 회사 제품이 닿는 지점 한 줄]",
   "notes": ""
  },
  {
   "id": "TGT-HYUNDAI-ROBOTICS",
   "status": "draft",
   "company": "현대차 로보틱스",
   "position": "[공고명 확인 필요]",
   "deadline": "",
   "url": "",
   "products": [
    "착용로봇 엑스블 숄더",
    "모베드"
   ],
   "metrics": [
    "작업 성공률"
   ],
   "keywords": [
    "ROS 2",
    "Nav2",
    "SLAM",
    "AMCL",
    "자율주행",
    "로봇",
    "시뮬레이션",
    "Gazebo"
   ],
   "roles": [
    "robotics",
    "autonomy"
   ],
   "pitch": "[내 프로젝트 경험과 회사 제품(모베드 등)이 닿는 지점 한 줄]",
   "notes": "AI 커리어 점프업 캠프 워크북의 회사 정리 기준. 지원 전 공고 원문으로 다시 확인"
  }
 ],
 "index": {
  "generated": "2026-11-20",
  "counts": {
   "education": 1,
   "training": 0,
   "military": 0,
   "award": 0,
   "project": 2,
   "research": 3
  },
  "attachments": 0,
  "records": [
   {
    "id": "EDU-01",
    "type": "education",
    "status": "confirmed",
    "title": "기본 학력사항",
    "org": "전주대학교",
    "period": "2022.03 ~ 2026.11 (재학 중)",
    "line": "",
    "tags": [
     "ROS2",
     "Python",
     "isaacsim",
     "simulation",
     "Gazebo",
     "Mujoco",
     "VLA",
     "LLM"
    ],
    "roles": [],
    "attachments": 0,
    "gaps": 0
   },
   {
    "id": "PRJ-CAVE",
    "type": "project",
    "status": "draft",
    "title": "동굴 재난 탐사·조난자 탐지 로봇",
    "org": "전주대 피지컬 AI 나노디그리 ND3 캡스톤 · 팀 멍멍",
    "period": "~ 2026.11",
    "line": "Gazebo 동굴 월드에서 Unitree Go2로 지도를 만들고 자율주행하며, 카메라로 찾은 조난자의 지도 좌표를 산출하는 ROS 2 시스템",
    "tags": [
     "ROS 2",
     "Nav2",
     "SLAM",
     "AMCL",
     "Gazebo",
     "Unitree Go2",
     "YOLO11n",
     "RGB-D",
     "LiDAR",
     "Python"
    ],
    "roles": [
     "robotics",
     "autonomy",
     "vision",
     "eval"
    ],
    "attachments": 0,
    "gaps": 3
   },
   {
    "id": "PRJ-VACCINE",
    "type": "project",
    "status": "draft",
    "title": "병원 백신 배달 로봇",
    "org": "전주대 피지컬 AI 나노디그리 ND1 캡스톤 · 팀 Vaccine",
    "period": "~ 2026.07 (발표 2026.07.03)",
    "line": "\"301호 환자에게 A형 독감 백신 가져다줘\" 한 문장으로 약국 픽업부터 병실 배달까지 수행하는 ROS 2 로봇 시뮬레이션",
    "tags": [
     "ROS 2",
     "Nav2",
     "AMCL",
     "Gazebo",
     "TurtleBot3",
     "LLM",
     "Groq API",
     "상태머신(FSM)",
     "Python"
    ],
    "roles": [
     "robotics",
     "autonomy",
     "llm",
     "eval"
    ],
    "attachments": 0,
    "gaps": 2
   },
   {
    "id": "RES-SO101-PAPER",
    "type": "research",
    "status": "draft",
    "title": "조명 변화에 강한 VLA 추론: 추론 시점 액션 청크 보정",
    "org": "개인 연구 · SO-ARM101 실물 로봇",
    "period": "2026.11 ~ (진행 중)",
    "line": "기본 조명에서 학습한 VLA 정책이 조명이 바뀌어도 같은 액션 청크를 내도록, 재학습 없이 추론 시점에 보정하는 방법을 찾는 논문 준비 연구",
    "tags": [
     "SO-ARM101",
     "VLA",
     "SmolVLA",
     "GR00T N1.7",
     "LeRobot",
     "Test-time adaptation",
     "어텐션 분석",
     "Python"
    ],
    "roles": [
     "research",
     "robotics",
     "eval"
    ],
    "attachments": 0,
    "gaps": 3
   },
   {
    "id": "RES-SO101-SIM2REAL",
    "type": "research",
    "status": "draft",
    "title": "SO-ARM101 색상 Pick & Place: 시뮬레이션 데이터 기반 VLA 학습과 실패 원인 진단",
    "org": "개인 연구 · Isaac Lab 시뮬레이션",
    "period": "2026.06 ~ (진행 중)",
    "line": "Isaac Lab에서 만든 시연 데이터로 VLA 정책(SmolVLA, GR00T N1.7)을 학습해 SO-ARM101이 지시한 색의 물체를 같은 색 상자에 넣도록 하는 sim-to-real 연구",
    "tags": [
     "SO-ARM101",
     "Isaac Sim",
     "Isaac Lab",
     "LeRobot",
     "SmolVLA",
     "GR00T N1.7",
     "VLA",
     "Sim-to-Real",
     "도메인 랜덤화",
     "Python"
    ],
    "roles": [
     "research",
     "robotics",
     "eval"
    ],
    "attachments": 0,
    "gaps": 3
   },
   {
    "id": "RES-MYCOBOT",
    "type": "research",
    "status": "draft",
    "title": "myCobot 280 텔레오퍼레이션: MuJoCo 연동과 조이스틱 제어 튜닝",
    "org": "개인 연구 · myCobot 280 M5Stack",
    "period": "2026.10 ~ (진행 중)",
    "line": "myCobot 280을 MuJoCo 시뮬레이터와 연동하고, AI 학습용 시연 데이터를 끊김 없이 모을 수 있도록 조이스틱 텔레오퍼레이션 제어를 실측으로 튜닝",
    "tags": [
     "myCobot 280",
     "MuJoCo",
     "pymycobot",
     "텔레오퍼레이션",
     "PID 튜닝",
     "Python",
     "Ubuntu 24.04"
    ],
    "roles": [
     "robotics",
     "research"
    ],
    "attachments": 0,
    "gaps": 2
   }
  ],
  "by_type": {
   "education": [
    "EDU-01"
   ],
   "training": [],
   "military": [],
   "award": [],
   "project": [
    "PRJ-CAVE",
    "PRJ-VACCINE"
   ],
   "research": [
    "RES-SO101-PAPER",
    "RES-SO101-SIM2REAL",
    "RES-MYCOBOT"
   ]
  },
  "by_role": {
   "research": [
    "RES-SO101-PAPER",
    "RES-SO101-SIM2REAL",
    "RES-MYCOBOT"
   ],
   "robotics": [
    "PRJ-CAVE",
    "PRJ-VACCINE",
    "RES-SO101-PAPER",
    "RES-SO101-SIM2REAL",
    "RES-MYCOBOT"
   ],
   "autonomy": [
    "PRJ-CAVE",
    "PRJ-VACCINE"
   ],
   "vision": [
    "PRJ-CAVE"
   ],
   "llm": [
    "PRJ-VACCINE"
   ],
   "eval": [
    "PRJ-CAVE",
    "PRJ-VACCINE",
    "RES-SO101-PAPER",
    "RES-SO101-SIM2REAL"
   ]
  },
  "by_status": {
   "confirmed": [
    "EDU-01"
   ],
   "draft": [
    "PRJ-CAVE",
    "PRJ-VACCINE",
    "RES-SO101-PAPER",
    "RES-SO101-SIM2REAL",
    "RES-MYCOBOT"
   ],
   "template": []
  },
  "by_year": {
   "2026": [
    "EDU-01",
    "PRJ-CAVE",
    "PRJ-VACCINE",
    "RES-SO101-PAPER",
    "RES-SO101-SIM2REAL",
    "RES-MYCOBOT"
   ]
  },
  "by_tag": {
   "amcl": {
    "label": "AMCL",
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "gazebo": {
    "label": "Gazebo",
    "ids": [
     "EDU-01",
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "gr00tn17": {
    "label": "GR00T N1.7",
    "ids": [
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   "groqapi": {
    "label": "Groq API",
    "ids": [
     "PRJ-VACCINE"
    ]
   },
   "isaaclab": {
    "label": "Isaac Lab",
    "ids": [
     "RES-SO101-SIM2REAL"
    ]
   },
   "isaacsim": {
    "label": "isaacsim",
    "ids": [
     "EDU-01",
     "RES-SO101-SIM2REAL"
    ]
   },
   "lerobot": {
    "label": "LeRobot",
    "ids": [
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   "lidar": {
    "label": "LiDAR",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "llm": {
    "label": "LLM",
    "ids": [
     "EDU-01",
     "PRJ-VACCINE"
    ]
   },
   "mujoco": {
    "label": "Mujoco",
    "ids": [
     "EDU-01",
     "RES-MYCOBOT"
    ]
   },
   "mycobot280": {
    "label": "myCobot 280",
    "ids": [
     "RES-MYCOBOT"
    ]
   },
   "nav2": {
    "label": "Nav2",
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "pid튜닝": {
    "label": "PID 튜닝",
    "ids": [
     "RES-MYCOBOT"
    ]
   },
   "pymycobot": {
    "label": "pymycobot",
    "ids": [
     "RES-MYCOBOT"
    ]
   },
   "python": {
    "label": "Python",
    "ids": [
     "EDU-01",
     "PRJ-CAVE",
     "PRJ-VACCINE",
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL",
     "RES-MYCOBOT"
    ]
   },
   "rgbd": {
    "label": "RGB-D",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "ros2": {
    "label": "ROS2",
    "ids": [
     "EDU-01",
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "simtoreal": {
    "label": "Sim-to-Real",
    "ids": [
     "RES-SO101-SIM2REAL"
    ]
   },
   "simulation": {
    "label": "simulation",
    "ids": [
     "EDU-01"
    ]
   },
   "slam": {
    "label": "SLAM",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "smolvla": {
    "label": "SmolVLA",
    "ids": [
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   "soarm101": {
    "label": "SO-ARM101",
    "ids": [
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   "testtimeadaptation": {
    "label": "Test-time adaptation",
    "ids": [
     "RES-SO101-PAPER"
    ]
   },
   "turtlebot3": {
    "label": "TurtleBot3",
    "ids": [
     "PRJ-VACCINE"
    ]
   },
   "ubuntu2404": {
    "label": "Ubuntu 24.04",
    "ids": [
     "RES-MYCOBOT"
    ]
   },
   "unitreego2": {
    "label": "Unitree Go2",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "vla": {
    "label": "VLA",
    "ids": [
     "EDU-01",
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   "yolo11n": {
    "label": "YOLO11n",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "도메인랜덤화": {
    "label": "도메인 랜덤화",
    "ids": [
     "RES-SO101-SIM2REAL"
    ]
   },
   "상태머신fsm": {
    "label": "상태머신(FSM)",
    "ids": [
     "PRJ-VACCINE"
    ]
   },
   "어텐션분석": {
    "label": "어텐션 분석",
    "ids": [
     "RES-SO101-PAPER"
    ]
   },
   "텔레오퍼레이션": {
    "label": "텔레오퍼레이션",
    "ids": [
     "RES-MYCOBOT"
    ]
   }
  },
  "skills": [
   {
    "label": "Python",
    "count": 6,
    "ids": [
     "EDU-01",
     "PRJ-CAVE",
     "PRJ-VACCINE",
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL",
     "RES-MYCOBOT"
    ]
   },
   {
    "label": "Gazebo",
    "count": 3,
    "ids": [
     "EDU-01",
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "ROS2",
    "count": 3,
    "ids": [
     "EDU-01",
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "VLA",
    "count": 3,
    "ids": [
     "EDU-01",
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "AMCL",
    "count": 2,
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "GR00T N1.7",
    "count": 2,
    "ids": [
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "isaacsim",
    "count": 2,
    "ids": [
     "EDU-01",
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "LeRobot",
    "count": 2,
    "ids": [
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "LLM",
    "count": 2,
    "ids": [
     "EDU-01",
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "Mujoco",
    "count": 2,
    "ids": [
     "EDU-01",
     "RES-MYCOBOT"
    ]
   },
   {
    "label": "Nav2",
    "count": 2,
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "SmolVLA",
    "count": 2,
    "ids": [
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "SO-ARM101",
    "count": 2,
    "ids": [
     "RES-SO101-PAPER",
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "Groq API",
    "count": 1,
    "ids": [
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "Isaac Lab",
    "count": 1,
    "ids": [
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "LiDAR",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "myCobot 280",
    "count": 1,
    "ids": [
     "RES-MYCOBOT"
    ]
   },
   {
    "label": "PID 튜닝",
    "count": 1,
    "ids": [
     "RES-MYCOBOT"
    ]
   },
   {
    "label": "pymycobot",
    "count": 1,
    "ids": [
     "RES-MYCOBOT"
    ]
   },
   {
    "label": "RGB-D",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "Sim-to-Real",
    "count": 1,
    "ids": [
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "simulation",
    "count": 1,
    "ids": [
     "EDU-01"
    ]
   },
   {
    "label": "SLAM",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "Test-time adaptation",
    "count": 1,
    "ids": [
     "RES-SO101-PAPER"
    ]
   },
   {
    "label": "TurtleBot3",
    "count": 1,
    "ids": [
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "Ubuntu 24.04",
    "count": 1,
    "ids": [
     "RES-MYCOBOT"
    ]
   },
   {
    "label": "Unitree Go2",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "YOLO11n",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "도메인 랜덤화",
    "count": 1,
    "ids": [
     "RES-SO101-SIM2REAL"
    ]
   },
   {
    "label": "상태머신(FSM)",
    "count": 1,
    "ids": [
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "어텐션 분석",
    "count": 1,
    "ids": [
     "RES-SO101-PAPER"
    ]
   },
   {
    "label": "텔레오퍼레이션",
    "count": 1,
    "ids": [
     "RES-MYCOBOT"
    ]
   }
  ],
  "todo": [
   {
    "id": "PRJ-CAVE",
    "title": "동굴 재난 탐사·조난자 탐지 로봇",
    "items": [
     "팀 인원과 내 역할 명칭 확인",
     "시작월 입력",
     "시연 영상 첨부 또는 링크 추가"
    ]
   },
   {
    "id": "PRJ-VACCINE",
    "title": "병원 백신 배달 로봇",
    "items": [
     "시작월 입력",
     "직접 잰 수치 추가 (배달 1회 소요 시간 등)"
    ]
   },
   {
    "id": "RES-SO101-PAPER",
    "title": "조명 변화에 강한 VLA 추론: 추론 시점 액션 청크 보정",
    "items": [
     "실물 평가 횟수 기록 (GR00T '거의 100%'의 시행 수)",
     "어텐션 맵 이미지 첨부",
     "논문 제출처·일정 입력"
    ]
   },
   {
    "id": "RES-SO101-SIM2REAL",
    "title": "SO-ARM101 색상 Pick & Place: 시뮬레이션 데이터 기반 VLA 학습과 실패 원인 진단",
    "items": [
     "프로브 74%의 지표 정의 입력 (예: 오차 몇 cm 이내 비율)",
     "평가 회차별 성공률 표 정리",
     "실험 영상·그래프 첨부"
    ]
   },
   {
    "id": "RES-MYCOBOT",
    "title": "myCobot 280 텔레오퍼레이션: MuJoCo 연동과 조이스틱 제어 튜닝",
    "items": [
     "질량·토크 보정 후 시뮬레이션-실물 오차 측정",
     "텔레오퍼레이션 영상 첨부"
    ]
   }
  ]
 }
};
