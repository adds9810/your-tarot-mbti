import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, card, mbti } = req.body;

  const prompt = `
당신은 타로 리더이자 성격 분석가입니다.
사용자의 MBTI는 ${mbti}이고, 질문은 "${question}"입니다.
선택한 타로 카드는 '${card.name}'입니다.
감성적이고 서정적인 어조로 카드의 의미와 조언을 전달해주세요.
`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  res.status(200).json({ output: text });
}
