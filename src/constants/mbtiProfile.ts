export type MBTIType =
  | "INFP"
  | "INFJ"
  | "INTJ"
  | "INTP"
  | "ENFP"
  | "ENFJ"
  | "ENTJ"
  | "ENTP"
  | "ISFP"
  | "ISFJ"
  | "ISTJ"
  | "ISTP"
  | "ESFP"
  | "ESFJ"
  | "ESTJ"
  | "ESTP";
export function isMBTIType(value: unknown): value is MBTIType {
  return (
    typeof value === "string" &&
    [
      "INFP",
      "INFJ",
      "INTJ",
      "INTP",
      "ENFP",
      "ENFJ",
      "ENTJ",
      "ENTP",
      "ISFP",
      "ISFJ",
      "ISTJ",
      "ISTP",
      "ESFP",
      "ESFJ",
      "ESTJ",
      "ESTP",
    ].includes(value)
  );
}

export const MBTI_PROFILE: Record<
  MBTIType,
  {
    title: string;
    description: string;
    backgroundImage: string;
    themeColor: string;
  }
> = {
  INFP: {
    title: "조용한 이상주의자",
    description: "깊은 내면과 상상력을 바탕으로 조용히 세상과 연결됩니다.",
    backgroundImage: "/assets/images/mbti/infp-background.png",
    themeColor: "#D1C4E9",
  },
  INFJ: {
    title: "통찰력 있는 조언자",
    description: "깊은 통찰과 배려로 타인의 마음을 읽고 공감합니다.",
    backgroundImage: "/assets/images/mbti/infj-background.png",
    themeColor: "#C5CAE9",
  },
  INTJ: {
    title: "전략적인 비전가",
    description: "미래를 내다보는 사고력으로 조용히 목표를 향해 나아갑니다.",
    backgroundImage: "/assets/images/mbti/intj-background.png",
    themeColor: "#B3E5FC",
  },
  INTP: {
    title: "논리적인 사색가",
    description:
      "호기심 많은 탐색자로, 논리와 이론을 바탕으로 세상을 이해합니다.",
    backgroundImage: "/assets/images/mbti/intp-background.png",
    themeColor: "#B2EBF2",
  },
  ENFP: {
    title: "열정적인 탐험가",
    description: "다양한 가능성을 향해 마음껏 펼쳐지는 아이디어 뱅크입니다.",
    backgroundImage: "/assets/images/mbti/enfp-background.png",
    themeColor: "#FFE082",
  },
  ENFJ: {
    title: "정의로운 리더",
    description: "타인을 돕고 이끄는 데서 보람을 느끼는 따뜻한 사람입니다.",
    backgroundImage: "/assets/images/mbti/enfj-background.png",
    themeColor: "#FFCCBC",
  },
  ENTJ: {
    title: "결단력 있는 통솔자",
    description: "효율성과 논리를 중시하며 리더십을 발휘합니다.",
    backgroundImage: "/assets/images/mbti/entj-background.png",
    themeColor: "#D7CCC8",
  },
  ENTP: {
    title: "창의적인 발명가",
    description: "토론과 새로운 아이디어를 즐기는 도전적인 유형입니다.",
    backgroundImage: "/assets/images/mbti/entp-background.png",
    themeColor: "#FFECB3",
  },
  ISFP: {
    title: "감성적인 예술가",
    description:
      "감각적이고 자유로운 분위기 속에서 자신만의 방식으로 살아갑니다.",
    backgroundImage: "/assets/images/mbti/isfp-background.png",
    themeColor: "#DCEDC8",
  },
  ISFJ: {
    title: "헌신적인 수호자",
    description: "섬세하고 성실하며, 주변 사람들을 조용히 보살핍니다.",
    backgroundImage: "/assets/images/mbti/isfj-background.png",
    themeColor: "#C8E6C9",
  },
  ISTJ: {
    title: "신중한 관리자",
    description: "규칙과 질서를 중시하며 묵묵히 책임을 다합니다.",
    backgroundImage: "/assets/images/mbti/istj-background.png",
    themeColor: "#CFD8DC",
  },
  ISTP: {
    title: "논리적인 탐험가",
    description: "객관적인 사고와 손재주를 통해 문제를 해결하는 데 능합니다.",
    backgroundImage: "/assets/images/mbti/istp-background.png",
    themeColor: "#B0BEC5",
  },
  ESFP: {
    title: "자유로운 활동가",
    description: "밝고 에너지 넘치는 분위기로 사람들과 어울리는 걸 즐깁니다.",
    backgroundImage: "/assets/images/mbti/esfp-background.png",
    themeColor: "#FFF59D",
  },
  ESFJ: {
    title: "사교적인 돌봄꾼",
    description: "주변을 따뜻하게 감싸주는 분위기로 조화와 질서를 추구합니다.",
    backgroundImage: "/assets/images/mbti/esfj-background.png",
    themeColor: "#F8BBD0",
  },
  ESTJ: {
    title: "현실적인 리더",
    description: "체계와 논리를 중시하며 책임감 있게 상황을 관리합니다.",
    backgroundImage: "/assets/images/mbti/estj-background.png",
    themeColor: "#FFE0B2",
  },
  ESTP: {
    title: "모험적인 해결사",
    description: "즉흥적이고 활동적인 성격으로 다양한 도전에 나섭니다.",
    backgroundImage: "/assets/images/mbti/estp-background.png",
    themeColor: "#FFAB91",
  },
};
