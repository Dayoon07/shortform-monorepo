# shortform-client

### Feature-Sliced Design (FSD) 아키텍처

#### 프로젝트 아키텍처 개요
FSD(Feature-Sliced Design)는 프론트엔드 애플리케이션을 **기능(feature) 중심**으로 구조화하는 현대적인 아키텍처 패턴입니다. 
이 프로젝트는 FSD의 핵심 원칙을 따라 **확장 가능하고 유지보수가 용이한** 구조로 설계되었습니다.

#### 핵심 설계 원칙

1. **단방향 의존성 흐름**
   - `shared` ← `features` ← `widgets` ← `pages` ← `app`
   - 하위 레이어는 상위 레이어를 참조할 수 없어 의존성 순환 방지

2. **도메인 주도 설계 (Domain-Driven)**
   - 비즈니스 도메인(user, video 등)을 중심으로 코드 구조화
   - 각 도메인은 독립적으로 개발 및 테스트 가능

3. **관심사의 분리 (Separation of Concerns)**
   - API 로직, UI 컴포넌트, 비즈니스 로직이 명확히 분리
   - 각 파일은 단일 책임 원칙(SRP) 준수

#### 디렉토리 구조
```
src/
├── app/                    # 애플리케이션 진입점 및 전역 설정
│   ├── App.js             # 라우터, Provider 등 최상위 설정
│   └── App.css            # 전역 스타일
│
├── pages/                  # 라우트별 페이지 컴포넌트
│   └── HomePage/          # 각 페이지는 widgets를 조합하여 구성
│       └── HomePage.jsx
│
├── widgets/               # 복합 UI 블록 (비즈니스 로직 포함)
│   ├── common/            # 공통 위젯
│   │   ├── AppBar/       # 상단 네비게이션 바
│   │   ├── SideBar/      # 사이드 메뉴 (로그인/회원가입 포함)
│   │   └── BottomNavBar/ # 모바일 하단 네비게이션
│   ├── video/            # 비디오 관련 위젯
│   │   └── VideoList.jsx # 비디오 목록 컨테이너
│   └── icon/             # 아이콘 컴포넌트 모음
│
├── features/              # 비즈니스 기능 단위
│   ├── user/             # 사용자 도메인
│   │   ├── api/          # 사용자 API (로그인, 회원가입, 로그아웃)
│   │   │   ├── userService.js
│   │   │   └── validationService.js
│   │   └── hooks/        # 사용자 관련 커스텀 훅
│   │       └── useUsers.js
│   │
│   └── video/            # 비디오 도메인
│       ├── api/          # 비디오 API
│       │   └── videoService.js
│       ├── components/   # 비디오 UI 컴포넌트
│       │   ├── VideoCard.jsx      # 개별 비디오 카드
│       │   └── VideoGrid.jsx      # 비디오 그리드 레이아웃
│       └── hooks/        # 비디오 관련 커스텀 훅
│           └── useLazyHoverVideo.js
│
└── shared/                # 공통 재사용 코드
    ├── constants/         # 상수 정의
    │   ├── ApiList.js    # API 엔드포인트 목록
    │   ├── ApiServer.js  # 서버 설정
    │   └── Route.js      # 라우트 경로
    ├── context/          # React Context
    │   └── UserContext.jsx
    ├── hooks/            # 공통 커스텀 훅
    │   └── useSearch.js
    └── utils/            # 유틸리티 함수
        ├── toast.jsx
        └── showMessage.jsx
```

#### 레이어별 역할

| 레이어 | 역할 | 예시 |
|--------|------|------|
| **app** | 앱 초기화, 라우팅, 전역 Provider | `App.js`, `App.css` |
| **pages** | 라우트별 페이지, widgets 조합 | `HomePage` |
| **widgets** | 독립적인 UI 블록, 여러 features 조합 | `SideBar`, `VideoList` |
| **features** | 비즈니스 기능 단위, 도메인 로직 | `user`, `video` |
| **shared** | 전역 공통 코드, 순수 함수 | `constants`, `utils`, `hooks` |

#### 주요 이점

**확장성**: 새로운 기능 추가 시 기존 코드 영향 최소화  
**유지보수성**: 도메인별 응집도 높고 결합도 낮은 구조  
**테스트 용이성**: 각 레이어가 독립적으로 테스트 가능  
**협업 효율성**: 명확한 구조로 팀원 간 코드 이해도 향상  
**재사용성**: shared 레이어를 통한 코드 중복 최소화

#### 개발 규칙

- 상위 레이어는 하위 레이어만 import 가능 (역방향 참조 금지)
- 같은 레이어 내에서는 서로 참조 불가 (features 간 독립성 유지)
- 공통 로직은 반드시 `shared`로 추출
- 각 feature는 `api/`, `components/`, `hooks/` 구조 유지