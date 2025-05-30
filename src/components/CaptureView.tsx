import { forwardRef } from "react";
import { MBTI_PROFILE, MBTIType } from "@/constants/mbtiProfile";

interface TarotResult {
  card: { id: number; name: string; image: string };
  question: string;
  mbti: string;
  interpretation: string;
  createdAt: string;
}

interface Props {
  result: TarotResult;
  onImageLoad?: () => void; // ✅ 이미지 로드 완료 콜백
}

const CaptureView = forwardRef<HTMLDivElement, Props>(
  ({ result, onImageLoad }, ref) => {
    const profile = MBTI_PROFILE[result.mbti as MBTIType];

    return (
      <div
        ref={ref}
        style={{
          width: "400px",
          position: "relative",
          color: "#f7f5f0",
          padding: "24px",
          fontFamily: "serif",
          overflow: "hidden",
        }}
      >
        {/* 🔽 백그라운드 이미지 실제로 넣기 */}
        <img
          src="/assets/images/result-background.png"
          alt="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* 🔼 모든 콘텐츠는 위에 올라가게 zIndex: 1 적용 */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginBottom: "12px",
            }}
          >
            조용한 흐름의 시작
          </h2>

          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              marginBottom: "6px",
              color: "#c0bbb3",
            }}
          >
            {result.mbti} · {profile.title}에게 전하는 메시지
          </p>

          <p style={{ marginBottom: "8px", color: "#bcb8b1" }}>
            질문: {result.question}
          </p>

          <img
            src={`/assets/images/${result.card.image.toLowerCase()}`}
            alt={result.card.name}
            onLoad={onImageLoad}
            style={{
              width: "90%",
              margin: "0 auto",
              padding: "8px 0",
            }}
          />

          <p
            style={{
              textAlign: "center",
              marginBottom: "16px",
              fontWeight: "bold",
            }}
          >
            {result.card.name}
          </p>

          <p style={{ whiteSpace: "pre-line" }}>{result.interpretation}</p>

          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#999",
              marginTop: "24px",
            }}
          >
            tarot.mysite.com <br />
            created with ✨ Whispers of the Stars by 지혜
          </p>
        </div>
      </div>
    );
  }
);

CaptureView.displayName = "CaptureView";

export default CaptureView;
