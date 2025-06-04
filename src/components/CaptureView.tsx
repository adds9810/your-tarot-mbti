/* eslint-disable @next/next/no-img-element */
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
  onImageLoad?: () => void;
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
          padding: "12px",
          overflow: "hidden",
          backgroundColor: "#1a2320",
          backgroundImage:
            "url(/assets/images/background/result-background.jpg)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "relative", zIndex: 1, padding: "12px" }}>
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
            https://your-tarot-mbti.vercel.app/ <br />
            created with ✨ Whispers of the Stars by 지혜
          </p>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              zIndex: "-1",
              width: "100%",
              opacity: 0.6,
              height: "100%",
              borderRadius: "12px",
              background: "#1a2320",
            }}
          ></div>
        </div>
      </div>
    );
  }
);

CaptureView.displayName = "CaptureView";

export default CaptureView;
