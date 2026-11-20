/* scripts/build.py가 생성한 파일. 직접 수정하지 말고 data/*.json을 고친 뒤 다시 빌드 */
window.PORTFOLIO = {
 "profile": {
  "name": "오준서",
  "name_en": "[작성 필요: 영문 이름]",
  "headline": "로봇·피지컬 AI 분야 AI 연구원 지망",
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
   "github": "juunseo",
   "blog": ""
  },
  "intro": [],
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
 "records": [],
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
   "education": 0,
   "military": 0,
   "award": 0,
   "project": 0,
   "research": 0
  },
  "attachments": 0,
  "records": [],
  "by_type": {
   "education": [],
   "military": [],
   "award": [],
   "project": [],
   "research": []
  },
  "by_role": {
   "research": [],
   "robotics": [],
   "autonomy": [],
   "vision": [],
   "llm": [],
   "eval": []
  },
  "by_status": {
   "confirmed": [],
   "draft": [],
   "template": []
  },
  "by_year": {},
  "by_tag": {},
  "skills": [],
  "todo": []
 }
};
