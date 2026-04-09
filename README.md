# 🔮 MBTI x Tarot – 성향 기반 타로 리딩 웹서비스

> MBTI 성향 해석과 타로 카드 리딩을 결합한 감성형 퍼스널 콘텐츠 플랫폼

> 📎 [라이브 데모](https://your-tarot-mbti.vercel.app/)

---

## 📌 프로젝트 개요

사용자가 입력한 질문과 MBTI 성향을 바탕으로, 무작위로 뽑힌 타로 카드에 대해 카드의 상징 + 성향 맞춤형 조언을 함께 제공하는 퍼스널 타로 리딩 서비스입니다.

- **개발 기간**: 2025.05.23 ~ 05.31 (9일 / 1인 개발)
- **개발 인원**: 1인 (기여도 100%)
- **배포**: Vercel

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| 프레임워크 | Next.js (Pages Router), TypeScript |
| 스타일 | Tailwind CSS, shadcn/ui |
| AI | Gemini API (최신 모델 자동 조회) |
| DB | Supabase |
| 이미지 처리 | html2canvas |
| 분석 | Google Analytics (GA4) |
| 배포 | Vercel |

---

## 📁 폴더 구조

```
src/
├── pages/
│   ├── api/
│   │   └── gemini.ts      # Gemini API 라우트 핸들러 (최신 모델 자동 조회)
│   ├── index.tsx          # 메인/랜딩 페이지
│   ├── test.tsx           # MBTI 성향 질문 페이지
│   ├── draw.tsx           # 질문 입력 및 카드 뽑기
│   ├── result.tsx         # 결과 출력 + 이미지 저장
│   ├── about.tsx          # 서비스 소개 및 후기
│   └── 404.tsx / 500.tsx  # 예외 페이지
├── components/
│   ├── CaptureView.tsx        # html2canvas 이미지 캡처 영역
│   ├── FeedbackFormModal.tsx  # 후기 작성 모달
│   ├── FeedbackDetailModal.tsx
│   ├── FeedbackList.tsx       # 후기 목록
│   ├── GoogleAnalytics.tsx    # GA4 연동
│   ├── LoadingOverlay.tsx
│   └── layout/                # Header, Footer, Layout
├── constants/
│   ├── tarotCards.ts      # 타로 카드 데이터
│   └── mbtiProfile.ts     # MBTI 성향별 프로필 데이터
└── lib/
    ├── supabase.ts        # Supabase 클라이언트 설정
    └── gtag.ts            # GA4 이벤트 유틸
```

---

## 🧭 사용자 흐름

```
/test   → MBTI 성향 질문 답변
/draw   → 질문 입력 및 카드 뽑기
/result → 타로 카드 + MBTI 맞춤 조언 확인 → 결과 이미지 저장
/about  → 서비스 소개 및 후기 목록
```

---

## ✨ 주요 기능

**타로 리딩**
- MBTI + 질문 + 카드 조합으로 Gemini API 프롬프트 구성
- 감성적이되 구체적인 행동 조언 포함하는 리딩 제공

**결과 이미지 저장**
- html2canvas로 결과 화면을 이미지로 캡처 후 다운로드
- SNS 공유용 별도 레이아웃(CaptureView) 분리 구성

**후기 기능**
- 비로그인 방식으로 누구나 후기 작성 가능
- Supabase DB 연동으로 저장 및 조회

**분석**
- GA4 연동으로 유입 경로 및 사용자 이벤트 추적

**UI / UX**
- MBTI 16개 유형별 개인화 배경 이미지 적용
- 페이지별 무드에 맞는 배경 이미지 구성
- 404 / 500 예외 페이지 구성

---

## 🔥 트러블슈팅

**Gemini API 모델 deprecated로 인한 500 오류 → 자동 조회 구조로 개선**

**1단계 - 문제 발생**
- 현상: 배포 환경에서 `POST /api/gemini` 호출 시 405 → 500 오류 반복 발생
- 원인 파악 과정: 메서드 검증 추가 → 환경변수 확인 → 공식 출시노트 확인
- 진짜 원인: 하드코딩한 `gemini-1.5-flash` 모델이 2025년 9월 29일부로 지원 종료됨. deprecated 모델 호출 시 명확한 메시지 없이 500만 반환되어 원인 파악이 어려웠음
- 1차 해결: 모델명을 `gemini-2.0-flash`로 수정해 임시 조치

```ts
// ❌ Before
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ 1차 After
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
```

**2단계 - 구조적 개선**
- 문제: 모델명 하드코딩은 향후 또 같은 오류를 유발하는 시한폭탄
- 해결: Google의 `/v1/models` 엔드포인트로 사용 가능한 모델 목록을 동적 조회 후 정규식으로 최신 flash 모델을 자동 선택하는 구조로 변경

```ts
async function getLatestModel(pattern = /gemini-\d+\.\d+-flash/): Promise<string> {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`);
  const data = await res.json();
  const candidates = data.models
    .map((m) => m.name.replace("models/", ""))
    .filter((name) => pattern.test(name))
    .sort()
    .reverse();
  return candidates[0]; // 최신 모델 자동 선택
}
```

- 결과: 모델명 하드코딩 제거, 이후 모델 업데이트에도 자동 대응 가능한 구조 완성
- 배운 점: 에러 코드는 원인이 아닌 단서일 뿐, 외부 API 정책 변화도 디버깅 범위에 포함해야 함

---

## 🎨 타로 카드 이미지

모든 타로 카드 이미지는 DALL·E를 활용해 직접 작성한 프롬프트로 생성했습니다.  
비상업적 포트폴리오 용도로만 사용됩니다.

---

## 📄 License

MIT License © 2025 김지혜  
단, 타로 카드 이미지 및 콘텐츠 구성은 무단 복제·상업적 사용을 금합니다.
