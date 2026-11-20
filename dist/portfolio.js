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
 "records": [
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
   "project_ref": "[관련 프로젝트 ID, 예: PRJ-01]",
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
   "id": "PRJ-01",
   "type": "project",
   "status": "template",
   "title": "[프로젝트 이름]",
   "subtitle": "[무엇을 만들었는지 한 줄]",
   "org": "[과정·수업·대회명 · 팀명]",
   "period": {
    "start": "[YYYY-MM]",
    "end": "[YYYY-MM]",
    "note": ""
   },
   "team": {
    "size": null,
    "my_role": "[내 역할]"
   },
   "tags": [],
   "roles": [],
   "summary": {
    "line": "[이력서 표 한 칸에 들어갈 한 문장]",
    "short": "[자기소개서·요약란용 2~3문장]"
   },
   "problem": "[누가, 무엇 때문에, 어떤 손해를 보는지. 숫자 하나 포함]",
   "goal": "[완료 기준]",
   "architecture": [
    "[구성 요소 → 구성 요소 흐름 한 줄]"
   ],
   "my_work": [
    {
     "text": "[내가 직접 한 일, 명사형 종결]",
     "roles": []
    }
   ],
   "results": [
    {
     "text": "[직접 잰 결과와 측정 기준]",
     "metric": "[짧은 수치]"
    }
   ],
   "troubleshooting": [
    {
     "title": "[문제 이름]",
     "problem": "[증상]",
     "cause": "[원인]",
     "fix": "[해결]",
     "result": "[결과]",
     "roles": []
    }
   ],
   "decisions": [
    {
     "choice": "[고른 기술·방법]",
     "reason": "[다른 방법 대신 고른 근거]"
    }
   ],
   "stack": [],
   "lessons": [],
   "next": [],
   "links": [],
   "evidence": [],
   "materials": [],
   "todo": [
    "프로젝트 내용 검증 후 입력, 입력이 끝나면 status를 draft 또는 confirmed로 변경"
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
  "records": [],
  "by_type": {
   "education": [
    "EDU-UNIV"
   ],
   "military": [
    "MIL-01"
   ],
   "award": [
    "AWD-01"
   ],
   "project": [
    "PRJ-01"
   ],
   "research": [
    "RES-01"
   ]
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
   "template": [
    "EDU-UNIV",
    "MIL-01",
    "AWD-01",
    "PRJ-01",
    "RES-01"
   ]
  },
  "by_year": {},
  "by_tag": {},
  "skills": [],
  "todo": []
 }
};
