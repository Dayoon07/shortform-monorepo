# shortform-client

```
src/
├── features/           # 도메인별 비즈니스 로직
│   ├── user/
│   │   ├── api/       # API 호출
│   │   └── hooks/     # 커스텀 훅
│   └── video/
│       ├── api/
│       ├── components/
│       └── hooks/
│
├── widgets/           # 복합 UI 컴포넌트 (여러 feature 조합)
│   ├── common/
│   │   ├── AppBar/
│   │   ├── SideBar/
│   │   └── BottomNavBar/
│   ├── icon/
│   └── video/
│
├── pages/             # 라우트별 페이지
│   └── HomePage/
│
└── shared/            # 공통 유틸리티
    ├── constants/     # 상수
    ├── context/       # React Context
    ├── hooks/         # 공통 훅
    └── utils/         # 유틸 함수
```
<!-- 리액트 프로젝트에서 **FSD (Feature-Sliced Design)** 아키텍처는 애플리케이션을 기능(feature) 중심으로 나누고, 명확한 규칙을 통해 코드의 응집도를 높이고 유지보수성을 향상시킵니다. 

전형적인 FSD 아키텍처의 구조 예시는 다음과 같습니다.
```
/src
├── app/               # 애플리케이션 전역 설정 (라우팅, 테마, 스토어 프로바이더 등)
├── processes/         # 복잡한 다중 기능 비즈니스 흐름 (예: 인증 플로우)
├── pages/             # 라우팅에 매핑되는 최상위 페이지 컴포넌트
├── widgets/           # 여러 features/entities를 조합한 복합 UI 블록 (예: 헤더, 푸터, 사이드바)
├── features/          # 사용자 상호작용 및 특정 비즈니스 로직 (예: 로그인 기능, 장바구니 추가)
├── entities/          # 비즈니스 도메인 모델 및 로직 (예: 사용자, 제품, 게시물)
└── shared/            # 애플리케이션 전반에서 재사용되는 공통 코드 (UI 키트, 유틸리티, API 클라이언트 등)
```

### FSD 주요 구성 요소 (레이어) 
FSD는 위와 같은 **레이어(Layer)** f로 구성되며, 각 레이어는 특정 역할을 담당합니다. 레이어 간의 의존성은 **하위 레이어는 상위 레이어를 알 수 없으며, 상위 레이어만 하위 레이어를 참조할 수 있다는 단방향 규칙을 따릅니다.** 
- app/: 애플리케이션의 진입점 및 전역 설정을 처리합니다.
- processes/: 여러 features를 포함하는 복잡한 사용자 흐름을 관리합니다 (선택 사항이며 초기에는 생략 가능).
- pages/: 라우터와 연결되는 페이지 컴포넌트를 정의하며, 주로 widgets나 features, entities를 조합합니다.
- widgets/: 여러 엔티티나 피처를 조합하여 재사용 가능한 큰 UI 블록을 만듭니다.
- features/: 독립적인 사용자 기능(예: 검색 바, 사용자 프로필 수정)을 캡슐화합니다.
- entities/: 핵심 비즈니스 도메인(예: User, Product)의 데이터 구조, 타입, 관련 로직을 정의합니다.
- shared/: UI 컴포넌트 (ui/), 헬퍼 함수 (lib/), 상수 (const/), API 클라이언트 등 가장 범용적인 코드를 포함합니다.

### 각 레이어 내의 구조 (슬라이스 및 세그먼트) 
각 레이어는 **슬라이스(Slice)** 라는 기능/도메인 단위의 폴더로 나뉘며, 각 슬라이스는 다시 **세그먼트(Segment)** 로 세분화됩니다.

예를 들어, entities/user 슬라이스의 구조는 다음과 같을 수 있습니다. 
```
/src/entities/user/
├── ui/         # User 관련 React 컴포넌트 (예: UserAvatar.tsx)
├── model/      # 상태 관리, 커스텀 훅 (예: useUserModel.ts)
├── api/        # 서버 통신 로직 (예: userApi.ts)
├── lib/        # 유틸리티 함수
└── index.ts    # Public API (외부에서 이 슬라이스로 접근할 수 있는 유일한 경로)
```
이 구조를 통해 코드가 기능별로 응집되고, 불필요한 의존성을 방지하여 대규모 애플리케이션의 유지보수성과 확장성을 크게 향상시킬 수 있습니다.  -->