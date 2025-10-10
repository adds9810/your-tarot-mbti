import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST 메서드만 허용
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { question, card, mbti } = req.body;

  // 필수 파라미터 검증
  if (!question || !card || !mbti) {
    return res.status(400).json({ error: "필수 파라미터가 누락되었습니다." });
  }

  try {
    const prompt = `
당신은 감성적인 타로 리더이자 성향 분석가입니다.
사용자의 MBTI는 ${mbti}이고, 질문은 "${question}"입니다.
선택한 타로 카드는 '${card.name}'입니다.

이 사이트는 조용하고 서정적인 분위기를 지향합니다.
하지만 감성적인 위로에만 그치지 말고, 반드시 **질문과 타로 카드의 의미를 연결**하여,
사용자가 고민에 대해 명확한 방향성을 얻을 수 있도록 해석해주세요.

카드의 메시지는 사용자의 질문 맥락에 맞춰 조율해야 하며,
MBTI 성향에 기반한 감성적 접근은 유지하되, 구체적인 행동 조언과 판단의 실마리를 포함해주세요.

1~2문단 분량으로, 말은 조용하지만 통찰력 있게 마무리해주세요.
`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    res.status(200).json({ output: text });
  } catch (error) {
    console.error("Gemini API 오류:", error);
    res.status(500).json({ error: "AI 응답 생성 중 오류가 발생했습니다." });
  }
}
