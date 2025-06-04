/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { MBTI_PROFILE, MBTIType } from "@/constants/mbtiProfile";
import Image from "next/image";

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
          padding: "24px",
          overflow: "hidden",
          backgroundColor: "#1a2320",
        }}
      >
        <Image
          src="/assets/images/background/result-background.jpg"
          alt="background"
          width={1536}
          height={1024}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "inherit",
            zIndex: 0,
            transform: "translateX(-50%)",
          }}
        />
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
            https://your-tarot-mbti.vercel.app/ <br />
            created with ✨ Whispers of the Stars by 지혜
          </p>
        </div>
      </div>
    );
  }
);

CaptureView.displayName = "CaptureView";

export default CaptureView;
