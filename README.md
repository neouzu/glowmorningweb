# 🌅 GlowMorning Branding Website

> 세상이 잠든 사이, 나만의 시간이 시작됩니다.

프리미엄 웹 에이전시 수준의 GlowMorning 앱 브랜딩 웹사이트입니다. 미라클 모닝 습관 형성을 돕는 앱의 핵심 가치를 감성적으로 전달하고 다운로드를 유도하는 원페이지 사이트입니다.

## ✨ 주요 특징

### 🎨 디자인
- **다크 모드 프리미엄 디자인**: 딥 네이비/퍼플 그라데이션
- **글래스모피즘 효과**: 반투명 카드, backdrop-blur
- **감각적인 색상**: 보라색(#745DE9) & 골드(#FBBF24)
- **3D 아이콘**: 플로팅 애니메이션
- **완벽한 반응형**: 모바일/태블릿/데스크톱 최적화

### 🎬 인터랙션 & 애니메이션
- 히어로 섹션 그라데이션 전환 (밤 → 아침)
- 스크롤 기반 패럴랙스 효과
- 숫자 카운터 애니메이션 (시간 가치, 통계)
- 카드 호버 3D 효과
- 스크롤 진행 표시 바
- 부드러운 스크롤 네비게이션
- Intersection Observer 기반 등장 애니메이션

### 📱 주요 섹션
1. **히어로 섹션**: 시네마틱 무드, 메인 카피, CTA
2. **시간의 가치**: 90분/일 → 547시간/년 계산기
3. **핵심 기능 소개**: 4개 기능 카드 (기상 체크, 모닝 로그, 크루, 레벨업)
4. **사용자 여정**: 4단계 온보딩 스토리텔링
5. **소셜 프루프**: 사용자 후기 & 통계
6. **프리미엄 소개**: 무료/프리미엄 비교
7. **최종 CTA**: 앱 다운로드
8. **푸터**: 링크, SNS, 회사 정보

## 🚀 빠른 시작

### 필수 요구사항
- 웹 브라우저 (Chrome, Firefox, Safari, Edge 최신버전)
- (선택) Node.js & npm (로컬 서버 실행용)

### 설치 및 실행

#### 방법 1: 직접 열기 (가장 간단)
```bash
# 프로젝트 폴더에서
open index.html
# 또는 브라우저에서 index.html 파일을 드래그 앤 드롭
```

#### 방법 2: 로컬 서버 실행 (권장)
```bash
# npx serve 사용 (Node.js 설치 필요)
npx serve .

# 또는 Python 사용
python -m http.server 8000

# 또는 PHP 사용
php -S localhost:8000
```

그런 다음 브라우저에서 `http://localhost:8000` 접속

### 개발 모드
```bash
npm run dev
```

## 📁 프로젝트 구조

```
glowmorningweb/
├── index.html              # 메인 HTML 파일
├── css/
│   └── styles.css         # 모든 스타일링
├── js/
│   └── main.js            # 인터랙션 & 애니메이션
├── assets/                # 이미지, 아이콘 (추가 예정)
├── package.json           # 프로젝트 메타데이터
└── README.md             # 이 파일
```

## 🎨 디자인 시스템

### 컬러 팔레트
```css
--color-primary: #745DE9      /* Violet - 메인 브랜드 컬러 */
--color-accent: #FBBF24       /* Amber/Gold - 강조 컬러 */
--color-dark-bg: #0F1729      /* Dark Navy - 배경 */
--color-dark-secondary: #1A1F3A  /* 어두운 보조 배경 */
```

### 그라데이션
```css
--gradient-primary: linear-gradient(135deg, #745DE9 0%, #9D7FF5 100%)
--gradient-accent: linear-gradient(135deg, #FBBF24 0%, #FCD34D 100%)
--gradient-dark: linear-gradient(180deg, #0F1729 0%, #1A1F3A 100%)
```

### 타이포그래피
- **Font Family**: Noto Sans KR (한글 최적화)
- **제목**: 900 weight, 큰 사이즈
- **본문**: 400-500 weight, 가독성 최적화

### 브레이크포인트
- **모바일**: 320px ~ 767px
- **태블릿**: 768px ~ 1023px
- **데스크톱**: 1024px+

## 🎯 주요 기능 설명

### 1. 숫자 카운터 애니메이션
```javascript
// 자동으로 스크롤 시 카운터 애니메이션 실행
// data-target 속성으로 목표 숫자 지정
<div class="time-number" data-target="547">0</div>
```

### 2. 패럴랙스 효과
- 히어로 섹션의 별과 폰 목업이 스크롤에 따라 다른 속도로 움직임
- 깊이감과 입체감 제공

### 3. 3D 카드 호버
- 마우스 위치에 따라 카드가 3D로 회전
- `perspective`와 `transform` 활용

### 4. Intersection Observer
- 요소가 화면에 나타날 때 애니메이션 트리거
- 성능 최적화 (필요할 때만 애니메이션 실행)

### 5. 스크롤 진행 바
- 페이지 상단에 그라데이션 진행 바
- 현재 스크롤 위치를 시각적으로 표시

## 🔧 커스터마이징

### 컬러 변경
`css/styles.css` 파일 상단의 CSS Variables 수정:
```css
:root {
    --color-primary: #YOUR_COLOR;
    --color-accent: #YOUR_COLOR;
}
```

### 콘텐츠 수정
`index.html` 파일에서 텍스트 직접 수정

### 애니메이션 속도 조절
`js/main.js`에서 duration 값 변경:
```javascript
const counter = new CounterAnimation(element, target, 2000); // 2000ms = 2초
```

## 📊 성능 최적화

- ✅ CSS 애니메이션 사용 (GPU 가속)
- ✅ Debounce로 스크롤 이벤트 최적화
- ✅ Intersection Observer로 불필요한 계산 방지
- ✅ RequestAnimationFrame 활용
- ✅ Lazy Loading 준비 (이미지 추가 시)

## 🌐 브라우저 지원

- ✅ Chrome (최신 2개 버전)
- ✅ Firefox (최신 2개 버전)
- ✅ Safari (최신 2개 버전)
- ✅ Edge (최신 2개 버전)
- ⚠️ IE11 (부분 지원, 폴리필 필요)

## 📱 SEO 최적화

### 메타 태그
- 타이틀, 설명, 키워드 최적화
- Open Graph 태그 (소셜 미디어 공유)
- 반응형 뷰포트 설정

### 핵심 키워드
- 미라클 모닝 앱
- 기상 알람 앱
- 아침 루틴 앱
- 습관 형성 앱

## 🎨 디자인 레퍼런스

기획안에서 참고한 디자인 스타일:
- **Headspace**: 감성적 일러스트, 편안한 색감
- **Notion**: 깔끔한 레이아웃, 스크롤 애니메이션
- **Linear**: 다크 모드, 글로우 효과
- **Raycast**: 그라데이션, 3D 요소

## 🐛 알려진 이슈 및 개선 예정

- [ ] 실제 앱 스크린샷 추가
- [ ] QR 코드 생성
- [ ] 고해상도 이미지 최적화
- [ ] 다국어 지원 (영어)
- [ ] 다크/라이트 모드 토글

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 🙋‍♂️ 문의

프로젝트 관련 문의:
- 이메일: contact@glowmorning.app
- Instagram: @glowmorning
- TikTok: @glowmorning

---

**Made with ❤️ for early birds everywhere**

🌅 *세상이 잠든 사이, 당신은 빛납니다* ✨
