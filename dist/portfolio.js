/* scripts/build.py가 생성한 파일. 직접 수정하지 말고 data/*.json을 고친 뒤 다시 빌드 */
window.PORTFOLIO = {
 "profile": {
  "name": "오준서",
  "name_en": "[작성 필요: 영문 이름]",
  "headline": "ROS 2 로봇 시뮬레이션에서 자율주행과 인지 파이프라인을 직접 통합해 온 피지컬 AI 연구 지망생",
  "target_roles": [
   "research",
   "robotics"
  ],
  "interest_roles": [
   "eval",
   "autonomy"
  ],
  "target_industries": [
   "로봇·피지컬 AI",
   "모빌리티·자율주행"
  ],
  "contact": {
   "email": "[작성 필요]",
   "github": "[작성 필요]",
   "blog": ""
  },
  "intro": [
   "ROS 2·Nav2 기반 로봇 시뮬레이션 프로젝트 2건 수행: TurtleBot3 병원 백신 배달, Unitree Go2 동굴 재난 탐사",
   "자연어 명령 해석부터 경로 이동, 객체 탐지, 좌표 산출까지 노드 사이 연결부를 맡아 끝까지 동작시킨 경험",
   "막힌 지점을 로그, 파라미터 로딩, 좌표계, 노이즈 모델 순서로 좁혀 원인을 찾는 디버깅 방식",
   "목표: 로봇·피지컬 AI 분야 AI 연구원"
  ],
  "updated": "2026-11-20"
 },
 "taxonomy": {
  "types": {
   "education": {
    "label": "학력·교육",
    "prefix": "EDU",
    "file": "education.json",
    "order": 1
   },
   "military": {
    "label": "병역",
    "prefix": "MIL",
    "file": "military.json",
    "order": 2
   },
   "award": {
    "label": "수상",
    "prefix": "AWD",
    "file": "awards.json",
    "order": 3
   },
   "project": {
    "label": "프로젝트",
    "prefix": "PRJ",
    "file": "projects.json",
    "order": 4
   },
   "research": {
    "label": "연구",
    "prefix": "RES",
    "file": "research.json",
    "order": 5
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
   "id": "EDU-BOOTCAMP",
   "type": "education",
   "kind": "training",
   "status": "draft",
   "priority": 10,
   "title": "피지컬 AI 나노디그리",
   "org": "전주대학교 첨단산업인재양성부트캠프사업단",
   "period": {
    "start": "",
    "end": "",
    "note": ""
   },
   "summary": {
    "line": "전주대학교 첨단산업 인재양성 부트캠프 피지컬 AI 나노디그리 (AI 기초 45시간, ND1, ND3 이수)",
    "short": "AI 기초 프로그램 45시간과 ND1 피지컬 AI 핵심 기초, ND3 자율주행 및 로봇 인지 과정 이수. 과정별 캡스톤으로 병원 백신 배달 로봇(ND1), 동굴 재난 탐사 로봇(ND3) 수행."
   },
   "modules": [
    {
     "name": "AI 기초 프로그램",
     "hours": 45,
     "detail": "인공지능 개요, 파이썬 기초 및 실습, 확률통계, 데이터분석 기초, 딥러닝 기초 (과목당 9시간)"
    },
    {
     "name": "ND1 피지컬 AI 핵심 기초",
     "detail": "캡스톤 PRJ-VACCINE (병원 백신 배달 로봇)"
    },
    {
     "name": "ND3 자율주행 및 로봇 인지",
     "detail": "캡스톤 PRJ-CAVE (동굴 재난 탐사·조난자 탐지 로봇)"
    }
   ],
   "courses": [
    "로봇 비전·인지",
    "로봇 제어·경로계획",
    "물리시뮬레이션 기초"
   ],
   "tags": [
    "ROS 2",
    "피지컬 AI",
    "자율주행",
    "로봇 인지"
   ],
   "roles": [
    "robotics",
    "autonomy",
    "research"
   ],
   "evidence": [],
   "todo": [
    "과정별 수강 기간 입력",
    "수료 여부와 수료증 번호 입력"
   ]
  },
  {
   "id": "EDU-CAMP-2026",
   "type": "education",
   "kind": "training",
   "status": "draft",
   "title": "AI 커리어 점프업 캠프",
   "org": "전주대학교",
   "period": {
    "start": "2026-11-20",
    "end": "2026-11-21",
    "note": ""
   },
   "summary": {
    "line": "2026 전주대학교 AI 커리어 점프업 캠프 (GitHub 정리, 프로젝트 포트폴리오 작성 실습)",
    "short": ""
   },
   "tags": [
    "포트폴리오",
    "GitHub"
   ],
   "roles": [],
   "todo": [
    "참여·수료 여부 확인 후 status를 confirmed로 변경"
   ]
  },
  {
   "id": "EDU-UNIV",
   "type": "education",
   "kind": "degree",
   "status": "template",
   "priority": 20,
   "title": "[학교명] [전공]",
   "org": "[학교명]",
   "degree": "[학사 / 석사]",
   "major": "[주전공]",
   "minor": "[복수·부전공, 없으면 빈칸]",
   "gpa": "[0.00 / 4.5]",
   "period": {
    "start": "[YYYY-MM]",
    "end": "[YYYY-MM]",
    "note": "[졸업 / 졸업예정 / 재학]"
   },
   "summary": {
    "line": "[학교명] [전공] [학위] [졸업 구분]",
    "short": ""
   },
   "courses": [
    "[관련 이수 과목: 로보틱스, 머신러닝, 컴퓨터비전 등]"
   ],
   "tags": [],
   "roles": [],
   "todo": [
    "학교명·전공·학위·재학 기간·학점 입력",
    "직무 관련 이수 과목 정리"
   ]
  },
  {
   "id": "MIL-01",
   "type": "military",
   "status": "template",
   "title": "[군별] [병과]",
   "org": "[소속 부대, 공개 범위 고려해 생략 가능]",
   "branch": "[육군 / 해군 / 공군 / 해병대 / 사회복무요원]",
   "rank": "[최종 계급]",
   "specialty": "[주특기·병과]",
   "discharge": "[만기전역 / 해당 없음 / 면제]",
   "period": {
    "start": "[YYYY-MM]",
    "end": "[YYYY-MM]",
    "note": ""
   },
   "summary": {
    "line": "[군별] [최종 계급] [전역 구분] ([YYYY.MM] ~ [YYYY.MM])",
    "short": ""
   },
   "notes": "[직무와 이어지는 복무 경험이 있으면 한 줄. 예: 통신·장비 운용, 정비 경험]",
   "tags": [],
   "roles": [],
   "todo": [
    "병역 사항 입력. 해당 없음·면제 시 discharge에 사유 기입"
   ]
  },
  {
   "id": "AWD-01",
   "type": "award",
   "status": "template",
   "title": "[대회명] [상훈]",
   "org": "[주최·주관 기관]",
   "rank": "[대상 / 최우수상 / 우수상 / 장려상]",
   "period": {
    "start": "[YYYY-MM]",
    "end": "[YYYY-MM]",
    "note": ""
   },
   "project_ref": "[관련 프로젝트 ID, 예: PRJ-VACCINE]",
   "summary": {
    "line": "[대회명] [상훈] ([주최 기관], [YYYY.MM])",
    "short": "[출품작 한 줄과 본인 역할]"
   },
   "tags": [],
   "roles": [],
   "todo": [
    "수상 내역 입력. 관련 프로젝트가 있으면 project_ref에 PRJ ID 연결"
   ]
  },
  {
   "id": "PRJ-CAVE",
   "type": "project",
   "status": "draft",
   "title": "동굴 재난 탐사·조난자 탐지 로봇",
   "subtitle": "Unitree Go2 사족보행 시뮬레이션 기반 SLAM · Nav2 · YOLO11n 통합",
   "org": "피지컬 AI 나노디그리 ND3 캡스톤 · 팀 멍멍",
   "period": {
    "start": "",
    "end": "2026-11",
    "note": ""
   },
   "team": {
    "size": null,
    "my_role": "자율주행·인지 파이프라인 통합"
   },
   "tags": [
    "ROS 2",
    "Nav2",
    "SLAM",
    "slam_toolbox",
    "AMCL",
    "map_server",
    "Gazebo Classic",
    "Unitree Go2",
    "CHAMP",
    "YOLO11n",
    "ultralytics",
    "RGB-D",
    "LiDAR",
    "좌표 변환(TF)",
    "Python",
    "Ubuntu 22.04"
   ],
   "roles": [
    "robotics",
    "autonomy",
    "vision",
    "eval"
   ],
   "summary": {
    "line": "Gazebo 동굴 월드에서 사족보행 로봇 Go2의 지도 작성, 자율주행, 조난자 좌표 산출을 하나의 ROS 2 실행 절차로 묶은 구조 로봇 시뮬레이션",
    "short": "통신·GPS가 끊긴 동굴 재난 현장을 가정한 프로젝트. 2D LiDAR SLAM으로 지도를 만들고 Nav2로 이동하며, YOLO11n 탐지 결과를 depth·카메라 내부 파라미터·TF와 결합해 조난자의 map 좌표를 발행하고 1m 이내 접근 시 자동 정지하는 파이프라인 구현."
   },
   "problem": "동굴·지하 갱도 붕괴 현장은 구조대원 직접 진입이 위험하고 통신·GPS가 차단되어 위치 파악 자체가 어려운 환경. 2026년 5월 라오스 동굴 침수 사고(주민 5명 조난)처럼 지형과 자연재해가 겹치면 발견 이후 구조까지도 난항. 바위·단차·경사 지형에서는 바퀴형 플랫폼의 주행도 제한적.",
   "goal": "카메라 픽셀 → 거리 → 로봇 기준 좌표 → 지도 기준 절대좌표 4단계 변환으로 구조대가 실제로 찾아갈 수 있는 조난자 좌표 산출",
   "architecture": [
    "Gazebo Classic: cave_world_custom.world + Go2 스폰, 센서 front_laser(2D) · lidar3d(16ch) · RGB-D 카메라",
    "지도·위치추정 택1: slam_toolbox 라이브 매핑 / map_server + AMCL 저장 지도 모드",
    "ground_truth_odom_bridge: Gazebo 실제 pose → /odom, EMA 필터로 보행 흔들림 완화",
    "yolo_survivor_detector: YOLO11n person 탐지 → 박스 중앙 ROI 30% 유효 depth 중앙값 → intrinsic + TF + odom → map 좌표",
    "RViz 목표점 → Nav2 경로 계산·추종 → /cmd_vel → CHAMP 다리 역기구학·gait 생성 → 관절 명령"
   ],
   "my_work": [
    {
     "text": "검증된 오픈소스 세 가지(LTU-RAI gazebo_cave_world, CHAMP 기반 unitree-go2-ros2, go2-cave-survivor-detection)를 한 워크스페이스로 이식·통합하고 카메라 토픽 구조에 맞게 수정",
     "roles": [
      "robotics"
     ]
    },
    {
     "text": "라이브 SLAM(slam.launch.py)과 저장 지도 + AMCL(view_map.launch.py)을 독립 launch로 분리 설계. 반복 검증이 필요한 탐지 실험은 저장 지도 모드로 고정",
     "roles": [
      "autonomy"
     ]
    },
    {
     "text": "RGB-D 기반 조난자 3차원 위치 계산. YOLO11n 바운딩박스 중심을 depth 해상도에 맞게 비례 변환하고, 박스 중앙 ROI 30% 영역의 유효 depth 중앙값으로 거리 추정",
     "roles": [
      "vision"
     ]
    },
    {
     "text": "카메라 intrinsic, 카메라 설치 위치·방향(TF), 로봇 위치·방향을 차례로 반영해 조난자 world 좌표 산출 후 /survivor_position(PointStamped) 발행",
     "roles": [
      "vision",
      "robotics"
     ]
    },
    {
     "text": "3프레임 연속 탐지와 1m 이내 접근 조건에서 /cmd_vel로 로봇을 세우는 자동 정지 로직 구현",
     "roles": [
      "robotics",
      "vision"
     ]
    },
    {
     "text": "RViz 목표점 지정 → Nav2 점유 격자 기반 경로 계산 → 실시간 추종, 예기치 않은 장애물 감지 시 경로 재계획하는 목표점 내비게이션 구성",
     "roles": [
      "autonomy"
     ]
    },
    {
     "text": "teleop 수동 조종으로 동굴 지도 작성. explore_lite가 같은 위치를 계속 '도달'로 오판정하는 버그 확인 후 자율 탐사 보류 판단",
     "roles": [
      "autonomy"
     ]
    }
   ],
   "results": [
    {
     "text": "YOLO 탐지 → map 좌표 계산 → /survivor_position 발행 → 1m 이내 자동 정지 전 과정을 조난자 모형(rescue_randy)으로 엔드투엔드 검증",
     "metric": "E2E 검증 완료"
    },
    {
     "text": "조난자 좌표 오차 수십 cm ~ 1m (모형 중심 기준, 눕거나 기댄 자세에서 증가)",
     "metric": "좌표 오차 1m 이내"
    },
    {
     "text": "라이브 SLAM과 저장 지도 기반 자율주행 두 모드 모두 정상 동작 확인",
     "metric": "2개 모드 동작"
    }
   ],
   "troubleshooting": [
    {
     "title": "launch 파라미터 누락",
     "problem": "코스트맵을 튜닝해도 동작이 바뀌지 않는 현상. 오류 메시지 없이 정상 실행처럼 보여 원인을 한동안 다른 곳에서 탐색",
     "cause": "view_map.launch.py가 Nav2에 params_file 인자를 넘기지 않아 커스텀 값 대신 TurtleBot3용 기본값으로 조용히 폴백",
     "fix": "params_file 전달 추가. 이후 launch 실행 시 파라미터 로딩 여부를 가장 먼저 확인하는 절차 도입",
     "result": "튜닝값 정상 반영. '값을 의심하기 전에 파일이 실제로 로드되는지부터 확인'하는 디버깅 순서 정립",
     "roles": [
      "autonomy",
      "eval"
     ]
    },
    {
     "title": "코스트맵 전방 장애물 오인",
     "problem": "Nav2가 로봇 바로 앞을 항상 막힌 것으로 판단해 경로 계획 실패",
     "cause": "3D LiDAR 최하단 채널이 로봇 앞 약 1.3m 지점 바닥을 스캔하는데 min_obstacle_height가 0.0이라 바닥 반사점이 전부 장애물로 마킹",
     "fix": "navigation.yaml의 min_obstacle_height 0.0 → 0.08",
     "result": "경로 계획 정상화",
     "roles": [
      "autonomy"
     ]
    },
    {
     "title": "AMCL 위치 수 미터 이탈",
     "problem": "RViz에 표시되는 로봇 위치와 Gazebo 실제 위치가 수 미터 어긋나는 현상",
     "cause": "AMCL 기본 오도메트리 노이즈 모델(alpha1~5 = 0.2)은 드리프트가 있는 실제 로봇 가정. ground truth를 odom으로 쓰는 이 환경에서 스캔 매칭 쪽에 과도한 가중치",
     "fix": "alpha1~5를 0.2 → 0.02로 낮춰 오도메트리 신뢰도 상향. map → odom 고정 변환 대안은 RViz 2D Pose Estimate 워크플로가 깨져 되돌림",
     "result": "위치 이탈 해소",
     "roles": [
      "autonomy"
     ]
    },
    {
     "title": "오도메트리 발산과 지도 왜곡",
     "problem": "/map이 malformed 또는 0x0 크기로 출력, 보행 중 몸통 흔들림으로 SLAM 지도 뭉개짐",
     "cause": "CHAMP 다리 기구학 기반 /odom/raw의 수치 발산, 사족보행 특유의 상하좌우 흔들림이 LiDAR 스캔에 그대로 전달",
     "fix": "Gazebo ground truth pose를 odom으로 발행하는 브리지 노드 작성(EMA 필터 포함). gait 스윙 높이·속도, 관절 PID 게인, 발 마찰 계수 네 가지 병행 조정",
     "result": "지도 작성 안정화 (시뮬레이션 전용 우회, 실기체 이식 시 재설계 대상으로 기록)",
     "roles": [
      "robotics",
      "autonomy"
     ]
    },
    {
     "title": "지형 제약에 맞춘 시나리오 재구성",
     "problem": "Go2가 가파른 비탈길을 오르지 못하고, 조난자 모형이 카메라로 발견할 수 없는 높이에 생성되는 현상",
     "cause": "동굴 월드의 급경사 구간이 사족보행 모델의 등판 한계를 넘고, 모형 스폰 z값이 지형 높이와 맞지 않음",
     "fix": "급경사 지형은 Gazebo 벽으로 처리해 진입을 막고, 경사 위 조난자는 평지로 이동. 모형 z값을 조정해 바닥에 놓이도록 고정",
     "result": "주행 가능 구역 안에서 반복 가능한 탐지 시나리오 확보",
     "roles": [
      "robotics",
      "eval"
     ]
    },
    {
     "title": "YOLO 노드 실행 환경 충돌",
     "problem": "조난자 탐지 노드 실행 직후 크래시, GPU 추론 실패",
     "cause": "시스템 NumPy 1.x에 맞춰 빌드된 cv_bridge와 ultralytics가 가져오는 NumPy 2.x의 ABI 충돌, cuDNN 버전 불일치",
     "fix": "cv_bridge 없이 raw image bytes를 numpy로 직접 파싱하도록 노드 수정, CPU 추론 고정, 시스템 python3로 실행 경로 통일",
     "result": "탐지 노드 안정 실행",
     "roles": [
      "vision"
     ]
    }
   ],
   "decisions": [
    {
     "choice": "바퀴형 대신 사족보행 Unitree Go2",
     "reason": "동굴 내부 바위·단차·경사 지형에서 주행 가능성이 더 높은 플랫폼. 실물 부재로 Gazebo 시뮬레이션 진행"
    },
    {
     "choice": "드론 모델(sit_drone) 폐기, Go2로 일원화",
     "reason": "드론은 선속도·각속도·yaw 등 파라미터가 많아 고도 1.5m 고정, x·y 이동만으로 탐사하도록 구성했지만 고도가 일정하지 않은 지형과 불규칙한 장애물 때문에 기대한 탐색 결과 미달. 직접 조작이나 Nav2 수정은 기간 안에 어렵다고 판단"
    },
    {
     "choice": "완전 자율 탐사 대신 목표점 지정 + Nav2 자율주행",
     "reason": "울퉁불퉁한 지형에서 SLAM 지도가 틀어지고 explore_lite 오판정 버그가 남아 있는 상황. 목표점은 사람이 지정하고 그 지점까지는 로봇이 자율주행하는 방식으로 범위 조정"
    },
    {
     "choice": "SLAM 모드와 AMCL 모드 분리 운용",
     "reason": "특징점이 적은 동굴에서 라이브 SLAM 품질이 실행마다 달라짐. 반복 실험은 저장 지도로 조건 고정"
    },
    {
     "choice": "박스 중앙 ROI 30% 유효 depth 중앙값",
     "reason": "바운딩박스 안에 배경 픽셀이 섞일 때의 이상치와 비정상 depth 값 배제"
    },
    {
     "choice": "2D LiDAR 사거리 3.5m → 20m 확장",
     "reason": "동굴 입구 앞 개활지에서 스캔이 전부 inf로 반환되던 문제 해소"
    }
   ],
   "stack": [
    "ROS 2 Humble",
    "Gazebo Classic 11",
    "Ubuntu 22.04",
    "CHAMP",
    "Unitree Go2 (unitree-go2-ros2)",
    "slam_toolbox (online async)",
    "Nav2 (planner_server, controller_server, costmap_2d)",
    "AMCL",
    "map_server",
    "YOLO11n / ultralytics",
    "LTU-RAI gazebo_cave_world",
    "Python"
   ],
   "lessons": [
    "튜닝값이 먹히지 않으면 값보다 그 파일이 실제로 로드되는지부터 확인하는 순서",
    "시뮬레이션 전용 우회(ground truth odom)는 결과와 함께 '실기체에서는 못 쓰는 부분'으로 따로 기록해 두는 습관",
    "기간 안에 끝낼 수 없는 경로(드론 탐사, 완전 자율 탐사)는 근거를 남기고 접은 뒤 핵심 파이프라인 검증에 집중하는 판단"
   ],
   "next": [
    "explore_lite 목표 도달 오판정 원인 파악 후 완전 자율 매핑 재시도",
    "조난자 위치까지 A* · Theta* · RRT* 경로계획 비교 실험",
    "ground truth 오도메트리를 EKF · LiDAR odometry로 바꿔 실기체 이식 가능성 확보",
    "octomap 기반 3D 지도 시각화를 메인 파이프라인에 연결"
   ],
   "links": [
    {
     "label": "GitHub 저장소",
     "url": "https://github.com/boseon25/go2-cave-slam-nav2"
    }
   ],
   "evidence": [
    {
     "label": "프로젝트 요약 PDF",
     "path": "docs/evidence/cave-rescue-robot-summary.pdf"
    }
   ],
   "materials": [
    {
     "label": "발표자료",
     "detail": "12쪽. 연구 배경(2026.05 라오스 동굴 침수 조난 사건), 연구 목표, 동굴 맵·Go2 모델 리소스, 주요 기술(SLAM 매핑, Nav2 경로계획, YOLO 생존자 탐지), RGB-D 3차원 위치 계산 7단계, world 좌표 변환·자동 정지 6단계, 실시간 탐지 화면, 한계와 재구성(경사 지형, 드론 모델 폐기), 목표점 내비게이션, 시연"
    },
    {
     "label": "프로젝트 요약",
     "detail": "6쪽. 개요, 아키텍처, 좌표 체계, 개발 이슈 10건과 해결, 기술 스택, 검증 상태, 향후 과제, 실행 절차 (docs/evidence에 수록)"
    },
    {
     "label": "시연 영상",
     "detail": "webm 2개(약 56MB, 38MB). 지도 위 자율주행과 조난자 탐지·자동 정지 시연"
    }
   ],
   "todo": [
    "팀 인원 입력",
    "프로젝트 시작월 입력",
    "시연 영상 공유 링크 추가"
   ]
  },
  {
   "id": "PRJ-VACCINE",
   "type": "project",
   "status": "draft",
   "title": "병원 백신 배달 로봇",
   "subtitle": "혈액형별 백신을 자연어 명령으로 배송하는 TurtleBot3 시뮬레이션",
   "org": "피지컬 AI 나노디그리 ND1 캡스톤 · 팀 Vaccine",
   "period": {
    "start": "",
    "end": "2026-07",
    "note": "발표 2026.07.03"
   },
   "team": {
    "size": 6,
    "my_role": "ROS 2 · Nav2 연동 담당"
   },
   "difficulty": "상",
   "tags": [
    "ROS 2",
    "Nav2",
    "AMCL",
    "map_server",
    "Gazebo Classic",
    "TurtleBot3",
    "LLM",
    "Groq API",
    "상태머신(FSM)",
    "Python",
    "Ubuntu 22.04"
   ],
   "roles": [
    "robotics",
    "autonomy",
    "llm",
    "eval"
   ],
   "summary": {
    "line": "\"301호 환자에게 A형 독감 백신 가져다줘\" 한 문장으로 약국 픽업부터 병실 배달까지 수행하는 ROS 2 로봇 시뮬레이션",
    "short": "AWS RoboMaker Hospital World 위 TurtleBot3가 자연어 명령을 받아 약국에서 혈액형별 백신을 픽업하고 지정 병실까지 배달하는 시스템. 6인 팀에서 ROS 2·Nav2 연동을 맡아 시뮬레이션 환경 구성, 병원 지도 작성, AMCL·Nav2 연동, LLM 명령과 시뮬레이션 연결, 이동 흐름 검증 담당."
   },
   "problem": "감염병 격리 병동처럼 사람이 오갈수록 위험이 커지는 곳의 반복 물류 문제. 2015년 국내 MERS 유행 당시 병원 안에서만 확진자 186명, 사망자 38명 발생. 그런데 로봇에게 일을 시키려면 좌표, 토픽, 액션 서버를 알아야 하고, 시뮬레이션 안에서도 이동 명령과 파지 명령이 따로 떨어져 있어 하나의 배달 시나리오로 이어지지 않는 상태.",
   "goal": "혈액형 → 백신 종류 → 병실 번호 3중 매핑을 자연어에서 해석하고, 약국 이동 → 픽업 → 병실 이동 → 배치를 사람 개입 없이 완료하는 흐름",
   "architecture": [
    "/llm_command → Node A(LLM 파서, 규칙 기반 폴백) → /mission(JSON)",
    "llm_planner: 여러 배송이 섞인 복합 명령을 mission sequence로 분해",
    "Coordinator FSM: PLANNING → NAVIGATING → GRASPING → TRANSPORTING → PLACING → DONE, 파지 실패 시 RETRY_GRASP, 한도 초과 시 FAILED",
    "Node B: Nav2 NavigateToPose 액션 클라이언트",
    "Node C: Gazebo /delete_entity · /spawn_entity 텔레포트 기반 픽업·배치",
    "고정 병원 지도 + map_server + AMCL 위치추정"
   ],
   "my_work": [
    {
     "text": "AWS RoboMaker Hospital World 도입과 TurtleBot3 · Gazebo Classic 11 환경 구성. 원본 키트(TurtleBot4 · Gazebo Ignition · Docker)를 네이티브 ROS 2 Humble 구성으로 이식",
     "roles": [
      "robotics"
     ],
     "mine": "shared"
    },
    {
     "text": "병원 월드 지도 작성. explore_lite 자율탐사와 teleop 수동 조작을 병행하며 긴 직선 복도의 누적 오차와 좁은 문틀 끼임 현상 확인, 검증된 고정 지도 + AMCL 위치추정 방식으로 전환",
     "roles": [
      "autonomy"
     ]
    },
    {
     "text": "map_server + AMCL + Nav2 연동, RViz 초기 위치 설정과 약국·병실 목표 좌표 이동 테스트",
     "roles": [
      "autonomy"
     ],
     "mine": "shared"
    },
    {
     "text": "LLM 명령 입력부와 Gazebo 병원 시뮬레이션 연동. /llm_command 한 줄이 Nav2 이동과 텔레포트 픽업·배치까지 이어지는 토픽 흐름 구성",
     "roles": [
      "robotics",
      "llm"
     ]
    },
    {
     "text": "명령 입력부터 배치 완료까지 실제 이동 흐름 검증. /robot_status 상태 전이 로그로 단계별 성공·실패 확인",
     "roles": [
      "eval",
      "robotics"
     ]
    }
   ],
   "results": [
    {
     "text": "301호·A형, 302호·B형 두 조합에서 명령 입력 → 약국 이동 → 픽업 → 병실 이동 → 배치 → 완료 전 과정 엔드투엔드 성공",
     "metric": "E2E 성공 2개 조합"
    },
    {
     "text": "Groq API 키가 무효인 상태에서 규칙 기반 폴백 파서로 자동 전환되는 것 확인",
     "metric": "API 장애 시 서비스 유지"
    },
    {
     "text": "픽업 단계 /delete_entity 타임아웃 원인 수정 이후 같은 증상 재현 0회",
     "metric": "타임아웃 재현 0회"
    }
   ],
   "troubleshooting": [
    {
     "title": "픽업 응답 유실",
     "problem": "약국에 정상 도착한 뒤 픽업 단계의 /delete_entity 호출이 반복적으로 타임아웃. 대기 시간을 5초에서 20초로 늘려도 같은 실패",
     "cause": "Gazebo 월드를 직접 조회해 보니 물체는 이미 삭제된 상태. rclpy.spin으로 돌고 있는 구독 콜백 안에서 spin_until_future_complete를 다시 호출하는 재진입 구조 때문에 서비스 응답이 실행자에 전달되지 않던 것",
     "fix": "node_c_grasp.py를 future.add_done_callback 기반 완전 비동기 구조로 재작성",
     "result": "이후 테스트에서 타임아웃 재현 0회",
     "roles": [
      "robotics",
      "eval"
     ]
    },
    {
     "title": "병원 지도 품질",
     "problem": "실시간 SLAM으로 만든 병원 지도가 휘거나 뒤틀리는 현상 반복",
     "cause": "긴 직선 복도에서 라이다 스캔만으로 진행 거리를 구분하기 어려워 생긴 누적 오차, 좁은 문틀과 가구 사이 로봇 끼임. explore_lite 프론티어 선택·재시도 로직의 세부 버그(정확도 임계값, BFS 연결성, 동일 지점 판정 허용 오차)",
     "fix": "알고리즘 수정을 여러 차례 시도한 뒤, 같은 병원 월드에서 검증된 완성 지도(hospital_map.pgm/yaml)를 map_server로 띄우고 AMCL로 위치만 추정하는 방식으로 전환",
     "result": "위치추정 안정화. 남은 기간을 자연어 배달 파이프라인 검증에 집중",
     "roles": [
      "autonomy"
     ]
    },
    {
     "title": "첫 명령 유실",
     "problem": "ros2 topic pub --once로 보낸 첫 배달 명령이 간헐적으로 처리되지 않는 현상",
     "cause": "발행 직후 구독자 매칭이 끝나기 전에 메시지가 나가 버리는 타이밍 문제",
     "fix": "--once 대신 -r 2 -t 3(2Hz로 3초 반복 발행)으로 명령을 보내도록 실행 절차 변경",
     "result": "Runbook 실행 절차에 반영",
     "roles": [
      "robotics",
      "eval"
     ]
    },
    {
     "title": "Gazebo GUI 크래시",
     "problem": "gzclient가 실행 직후 Camera px != 0 assertion으로 종료",
     "cause": "gazebo_ros 기본 gzclient.launch.py가 자동으로 붙이는 libgazebo_ros_eol_gui.so(단종 안내 배너 플러그인)와 카메라 씬 초기화 타이밍 충돌",
     "fix": "플러그인 없이 순정 gzclient 바이너리를 직접 실행하도록 launch 파일 수정",
     "result": "GUI 크래시 해소",
     "roles": [
      "robotics"
     ]
    },
    {
     "title": "Nav2 lifecycle 활성화 정지",
     "problem": "bt_navigator, planner_server 등 매번 다른 노드에서 lifecycle 서비스 응답 타임아웃, 이후 노드 활성화 전체 정지",
     "cause": "lifecycle_manager의 configure → activate 순차 전환 중 ROS 2 서비스 통신 계층의 일시적 지연으로 추정",
     "fix": "launch 재시작 절차 정리. 재시작 시 대부분 재현 없이 정상 기동",
     "result": "간헐적 기동 실패의 대응 절차 확보",
     "roles": [
      "autonomy"
     ]
    },
    {
     "title": "Snap VSCode 환경변수 오염",
     "problem": "RViz2, gzclient, gnome-terminal이 undefined symbol: __libc_pthread_init 오류로 즉시 종료",
     "cause": "Snap 패키지 VSCode가 GTK_PATH, GDK_PIXBUF_MODULE_FILE 등을 터미널 세션에 누출, Snap 번들 libpthread와 시스템 라이브러리 버전 충돌",
     "fix": "관련 환경변수를 unset한 뒤 실행",
     "result": "시각화 도구 정상 실행",
     "roles": [
      "robotics"
     ]
    }
   ],
   "decisions": [
    {
     "choice": "실시간 SLAM 대신 고정 지도 + AMCL",
     "reason": "좁은 병실 입구와 긴 직선 복도가 많은 병원 구조에서 SLAM 지도 품질 불안정. 지도가 주어진 상태에서 위치만 추정하는 쪽이 가볍고 안정적"
    },
    {
     "choice": "sim_mode 선검증 후 Gazebo·Nav2 실연동",
     "reason": "지도·odom·scan·TF 문제와 LLM 로직 문제가 한꺼번에 섞이면 원인 분리가 어려움. 토픽 파이프라인을 먼저 확인한 뒤 실연동"
    },
    {
     "choice": "LLM 파서 + 규칙 기반 폴백",
     "reason": "API 키가 없거나 호출이 실패해도 같은 mission JSON 형식을 유지해 Coordinator 이하 노드가 영향받지 않는 구조"
    },
    {
     "choice": "자연어와 로봇 제어 사이 mission JSON 중간 계약",
     "reason": "LLM은 경로를 계산하지 않고 구조화만 담당, 경로 계획과 장애물 회피는 Nav2 담당으로 책임 분리"
    },
    {
     "choice": "rooms.yaml · vaccines.yaml 외부 설정",
     "reason": "약국·병실 좌표와 백신 목록이 바뀌어도 코드 수정 없이 설정 파일만 갱신"
    },
    {
     "choice": "로봇팔 대신 Gazebo 텔레포트로 픽업·배치",
     "reason": "실물 그리퍼 부재와 기간 제약. 원본 키트의 IK 코드는 인터페이스 호환을 위해 유지"
    }
   ],
   "stack": [
    "ROS 2 Humble",
    "Gazebo Classic 11",
    "Nav2 (bt_navigator, DWB controller, planner_server, costmap_2d)",
    "AMCL",
    "map_server",
    "TurtleBot3 Burger",
    "Groq API (openai/gpt-oss-20b)",
    "Pydantic",
    "AWS RoboMaker Hospital World",
    "Python"
   ],
   "lessons": [
    "타임아웃이 나면 대기 시간보다 실제 상태부터 확인하는 순서. Gazebo 월드를 직접 조회한 덕분에 '처리 실패'가 아니라 '응답 유실'이라는 점을 찾은 경험",
    "핵심 목표와 거리가 먼 문제(지도 품질)는 검증된 대안으로 빨리 바꾸고 일정을 본 목표에 쓰는 판단"
   ],
   "next": [
    "303호·AB형, 304호·O형 조합 개별 실행 검증과 회귀 테스트 체계",
    "여러 배달 요청이 동시에 들어올 때의 큐잉·우선순위 처리",
    "로봇팔 연동을 통한 실제 파지 구현 검토"
   ],
   "links": [
    {
     "label": "GitHub 팀 저장소",
     "url": "https://github.com/boseon25/capstone_team3"
    },
    {
     "label": "시연 영상 (Google Drive)",
     "url": "https://drive.google.com/drive/folders/1dNTDRravAHDpeVM6yv4RLfx1ZmiWcdDK"
    }
   ],
   "evidence": [
    {
     "label": "프로젝트 요약 PDF",
     "path": "docs/evidence/vaccine-robot-summary.pdf"
    }
   ],
   "materials": [
    {
     "label": "기획서",
     "detail": "8쪽. 팀 구성과 역할, As-Is·To-Be 문제 정의, 기능 요구사항 7개와 검증 방법, 3노드 토픽 구조, 약 30시간 6단계 개발 계획(3단계 환경 구성·5단계 AMCL·Nav2 연동 담당), 리스크 5개와 대비책, 검증 계획"
    },
    {
     "label": "결과보고서",
     "detail": "7쪽. 노드별 구현 완료 현황(Node A, Coordinator FSM, Node B, Node C, Launch·Config), 재현용 실행 명령, E2E 증빙 표, 트러블슈팅 4건, 역할별 회고, 한계와 개선 방향"
    },
    {
     "label": "발표자료",
     "detail": "12쪽, 2026.07.03 발표. 배경(2015 MERS 병원 내 전파, 에볼라 의료진 감염 위험), 목표, LLM·FSM 파트(단일·복합 명령 해석, FSM 상태 제어, 파지 실패 재시도), 시뮬레이션 파트(SLAM 지도 생성, 좌표 매핑, 박스 끼임 실패 사례, 배달 테스트, 데모 영상)"
    },
    {
     "label": "Runbook",
     "detail": "2쪽. 최초 빌드, 터미널 5개 실행 순서, 반복 발행 방식의 명령 전송, /robot_status 모니터링, GROQ API 키 설정, 증상·원인·조치 트러블슈팅 표"
    },
    {
     "label": "프로젝트 요약",
     "detail": "6쪽. 개요, 아키텍처, 데이터 매핑, 개발 이슈 5건과 해결, 기술 스택, 검증 상태, 향후 과제 (docs/evidence에 수록)"
    },
    {
     "label": "시연 영상",
     "detail": "mp4 2개, webm 1개. 명령 입력부터 배치 완료까지 시연. 공유는 Google Drive 링크로 대체"
    }
   ],
   "todo": [
    "프로젝트 시작월 입력",
    "직접 잰 수치 추가: 배달 1회 소요 시간, 명령 해석 성공률 등"
   ]
  },
  {
   "id": "RES-01",
   "type": "research",
   "status": "template",
   "kind": "[학부연구생 / 논문 / 학회 발표 / 논문 재현]",
   "title": "[연구 주제]",
   "org": "[연구실·지도교수]",
   "period": {
    "start": "[YYYY-MM]",
    "end": "[YYYY-MM]",
    "note": ""
   },
   "question": "[한 학기 안에 답할 수 있는 크기의 연구 물음 한 줄]",
   "method": "[비교 대상, 고정 조건과 바꾼 조건, 반복 횟수]",
   "result": "[직접 잰 결과 숫자와 측정 기준]",
   "limits": "[방법이 통하지 않은 조건]",
   "summary": {
    "line": "[연구 주제] ([소속], [YYYY.MM])",
    "short": ""
   },
   "publication": "[학회·저널명, 저자 순서, 게재 여부]",
   "tags": [],
   "roles": [
    "research"
   ],
   "links": [],
   "todo": [
    "연구 경험 입력. 없으면 논문 결과 재현 1건부터 기록"
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
   "pitch": "실내 지도 위 자율 이동(병원 배달)과 비정형 지형 주행·인지(동굴 사족보행) 경험을 모베드 같은 이동 플랫폼의 작업 성공률 관점으로 연결",
   "notes": "AI 커리어 점프업 캠프 워크북의 회사 정리 기준. 지원 전 공고 원문으로 다시 확인"
  }
 ],
 "index": {
  "generated": "2026-11-20",
  "counts": {
   "education": 2,
   "military": 0,
   "award": 0,
   "project": 2,
   "research": 0
  },
  "records": [
   {
    "id": "EDU-BOOTCAMP",
    "type": "education",
    "status": "draft",
    "title": "피지컬 AI 나노디그리",
    "org": "전주대학교 첨단산업인재양성부트캠프사업단",
    "period": "",
    "line": "전주대학교 첨단산업 인재양성 부트캠프 피지컬 AI 나노디그리 (AI 기초 45시간, ND1, ND3 이수)",
    "tags": [
     "ROS 2",
     "피지컬 AI",
     "자율주행",
     "로봇 인지"
    ],
    "roles": [
     "robotics",
     "autonomy",
     "research"
    ],
    "gaps": 2
   },
   {
    "id": "EDU-CAMP-2026",
    "type": "education",
    "status": "draft",
    "title": "AI 커리어 점프업 캠프",
    "org": "전주대학교",
    "period": "2026.11.20 ~ 2026.11.21",
    "line": "2026 전주대학교 AI 커리어 점프업 캠프 (GitHub 정리, 프로젝트 포트폴리오 작성 실습)",
    "tags": [
     "포트폴리오",
     "GitHub"
    ],
    "roles": [],
    "gaps": 1
   },
   {
    "id": "PRJ-CAVE",
    "type": "project",
    "status": "draft",
    "title": "동굴 재난 탐사·조난자 탐지 로봇",
    "org": "피지컬 AI 나노디그리 ND3 캡스톤 · 팀 멍멍",
    "period": "~ 2026.11",
    "line": "Gazebo 동굴 월드에서 사족보행 로봇 Go2의 지도 작성, 자율주행, 조난자 좌표 산출을 하나의 ROS 2 실행 절차로 묶은 구조 로봇 시뮬레이션",
    "tags": [
     "ROS 2",
     "Nav2",
     "SLAM",
     "slam_toolbox",
     "AMCL",
     "map_server",
     "Gazebo Classic",
     "Unitree Go2",
     "CHAMP",
     "YOLO11n",
     "ultralytics",
     "RGB-D",
     "LiDAR",
     "좌표 변환(TF)",
     "Python",
     "Ubuntu 22.04"
    ],
    "roles": [
     "robotics",
     "autonomy",
     "vision",
     "eval"
    ],
    "gaps": 3
   },
   {
    "id": "PRJ-VACCINE",
    "type": "project",
    "status": "draft",
    "title": "병원 백신 배달 로봇",
    "org": "피지컬 AI 나노디그리 ND1 캡스톤 · 팀 Vaccine",
    "period": "~ 2026.07 (발표 2026.07.03)",
    "line": "\"301호 환자에게 A형 독감 백신 가져다줘\" 한 문장으로 약국 픽업부터 병실 배달까지 수행하는 ROS 2 로봇 시뮬레이션",
    "tags": [
     "ROS 2",
     "Nav2",
     "AMCL",
     "map_server",
     "Gazebo Classic",
     "TurtleBot3",
     "LLM",
     "Groq API",
     "상태머신(FSM)",
     "Python",
     "Ubuntu 22.04"
    ],
    "roles": [
     "robotics",
     "autonomy",
     "llm",
     "eval"
    ],
    "gaps": 2
   }
  ],
  "by_type": {
   "education": [
    "EDU-BOOTCAMP",
    "EDU-CAMP-2026",
    "EDU-UNIV"
   ],
   "military": [
    "MIL-01"
   ],
   "award": [
    "AWD-01"
   ],
   "project": [
    "PRJ-CAVE",
    "PRJ-VACCINE"
   ],
   "research": [
    "RES-01"
   ]
  },
  "by_role": {
   "research": [
    "EDU-BOOTCAMP"
   ],
   "robotics": [
    "EDU-BOOTCAMP",
    "PRJ-CAVE",
    "PRJ-VACCINE"
   ],
   "autonomy": [
    "EDU-BOOTCAMP",
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
    "PRJ-VACCINE"
   ]
  },
  "by_status": {
   "confirmed": [],
   "draft": [
    "EDU-BOOTCAMP",
    "EDU-CAMP-2026",
    "PRJ-CAVE",
    "PRJ-VACCINE"
   ],
   "template": [
    "EDU-UNIV",
    "MIL-01",
    "AWD-01",
    "RES-01"
   ]
  },
  "by_year": {
   "2026": [
    "EDU-CAMP-2026",
    "PRJ-CAVE",
    "PRJ-VACCINE"
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
   "champ": {
    "label": "CHAMP",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "gazeboclassic": {
    "label": "Gazebo Classic",
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "github": {
    "label": "GitHub",
    "ids": [
     "EDU-CAMP-2026"
    ]
   },
   "groqapi": {
    "label": "Groq API",
    "ids": [
     "PRJ-VACCINE"
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
     "PRJ-VACCINE"
    ]
   },
   "mapserver": {
    "label": "map_server",
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "nav2": {
    "label": "Nav2",
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "python": {
    "label": "Python",
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "rgbd": {
    "label": "RGB-D",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "ros2": {
    "label": "ROS 2",
    "ids": [
     "EDU-BOOTCAMP",
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "slam": {
    "label": "SLAM",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "slamtoolbox": {
    "label": "slam_toolbox",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "turtlebot3": {
    "label": "TurtleBot3",
    "ids": [
     "PRJ-VACCINE"
    ]
   },
   "ubuntu2204": {
    "label": "Ubuntu 22.04",
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   "ultralytics": {
    "label": "ultralytics",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "unitreego2": {
    "label": "Unitree Go2",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "yolo11n": {
    "label": "YOLO11n",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "로봇인지": {
    "label": "로봇 인지",
    "ids": [
     "EDU-BOOTCAMP"
    ]
   },
   "상태머신fsm": {
    "label": "상태머신(FSM)",
    "ids": [
     "PRJ-VACCINE"
    ]
   },
   "자율주행": {
    "label": "자율주행",
    "ids": [
     "EDU-BOOTCAMP"
    ]
   },
   "좌표변환tf": {
    "label": "좌표 변환(TF)",
    "ids": [
     "PRJ-CAVE"
    ]
   },
   "포트폴리오": {
    "label": "포트폴리오",
    "ids": [
     "EDU-CAMP-2026"
    ]
   },
   "피지컬ai": {
    "label": "피지컬 AI",
    "ids": [
     "EDU-BOOTCAMP"
    ]
   }
  },
  "skills": [
   {
    "label": "ROS 2",
    "count": 3,
    "ids": [
     "EDU-BOOTCAMP",
     "PRJ-CAVE",
     "PRJ-VACCINE"
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
    "label": "Gazebo Classic",
    "count": 2,
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "map_server",
    "count": 2,
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
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
    "label": "Python",
    "count": 2,
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "Ubuntu 22.04",
    "count": 2,
    "ids": [
     "PRJ-CAVE",
     "PRJ-VACCINE"
    ]
   },
   {
    "label": "CHAMP",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "GitHub",
    "count": 1,
    "ids": [
     "EDU-CAMP-2026"
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
    "label": "LiDAR",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "LLM",
    "count": 1,
    "ids": [
     "PRJ-VACCINE"
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
    "label": "SLAM",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "slam_toolbox",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
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
    "label": "ultralytics",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
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
    "label": "로봇 인지",
    "count": 1,
    "ids": [
     "EDU-BOOTCAMP"
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
    "label": "자율주행",
    "count": 1,
    "ids": [
     "EDU-BOOTCAMP"
    ]
   },
   {
    "label": "좌표 변환(TF)",
    "count": 1,
    "ids": [
     "PRJ-CAVE"
    ]
   },
   {
    "label": "포트폴리오",
    "count": 1,
    "ids": [
     "EDU-CAMP-2026"
    ]
   },
   {
    "label": "피지컬 AI",
    "count": 1,
    "ids": [
     "EDU-BOOTCAMP"
    ]
   }
  ],
  "todo": [
   {
    "id": "EDU-BOOTCAMP",
    "title": "피지컬 AI 나노디그리",
    "items": [
     "과정별 수강 기간 입력",
     "수료 여부와 수료증 번호 입력"
    ]
   },
   {
    "id": "EDU-CAMP-2026",
    "title": "AI 커리어 점프업 캠프",
    "items": [
     "참여·수료 여부 확인 후 status를 confirmed로 변경"
    ]
   },
   {
    "id": "PRJ-CAVE",
    "title": "동굴 재난 탐사·조난자 탐지 로봇",
    "items": [
     "팀 인원 입력",
     "프로젝트 시작월 입력",
     "시연 영상 공유 링크 추가"
    ]
   },
   {
    "id": "PRJ-VACCINE",
    "title": "병원 백신 배달 로봇",
    "items": [
     "프로젝트 시작월 입력",
     "직접 잰 수치 추가: 배달 1회 소요 시간, 명령 해석 성공률 등"
    ]
   }
  ]
 }
};
