import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useEffect } from "react";

const sentences = [
  "마음이 머무는 새벽의 숲에서,",
  "당신에게만 속삭이는 조언을 전합니다.",
];

const steps = [
  { icon: "📝", label: "1. MBTI 테스트", aria: "MBTI 테스트" },
  { icon: "❓", label: "2. 질문 선택", aria: "질문 선택" },
  { icon: "🔮", label: "3. 타로 카드 뽑기", aria: "타로 카드 뽑기" },
  { icon: "💌", label: "4. 맞춤형 조언 받기", aria: "맞춤형 조언 받기" },
];

export default function Home() {
  useEffect(() => {
    localStorage.removeItem("tarot_session");
  }, []);

  return (
    <>
      <Head>
        <title>MBTI x Tarot | 성향 기반 타로 조언</title>
        <meta
          name="description"
          content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다."
        />
        <meta
          property="og:title"
          content="MBTI x Tarot | 성향 기반 타로 조언"
        />
        <meta
          property="og:description"
          content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-tarot-mbti.com/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <section className="flex flex-col items-center justify-center flex-1 py-2 md:py-20 px-4 text-center">
          {/* 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-[#f7f5f0] drop-shadow-[0_2px_8px_rgba(30,30,30,0.18)]"
          >
            조용한 흐름의 시작
          </motion.h1>
          {/* 설명 문장 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 1.0,
                  staggerChildren: 0.045,
                },
              },
            }}
            className="flex flex-wrap gap-1 justify-center text-lg md:text-xl text-[#e6e1d6] mb-10 font-normal text-center"
            aria-label={sentences.join(" ")}
          >
            {sentences.map((line, idx) => (
              <motion.p key={idx} className="mb-2">
                {line.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, filter: "blur(2px)" },
                      visible: { opacity: 1, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "inline-block" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
            ))}
          </motion.div>

          {/* 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <Link
              href="/test"
              className="rounded-xl shadow-md bg-white/80 hover:bg-muted transition font-semibold px-8 py-3 text-lg text-gray-700 inline-block text-center"
              aria-label="질문에 답하고, 당신만의 조언을 들어보세요"
            >
              질문에 답하고, <br className="md:hidden" />
              당신만의 조언을 들어보세요
            </Link>
          </motion.div>
          {/* 4단계 리스트 */}
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-[#e6e1d6]">
            {steps.map((step, idx) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6 + idx * 0.3, duration: 0.7 }}
                className="flex flex-col items-center"
              >
                <span
                  className="mb-2 text-3xl"
                  role="img"
                  aria-label={step.aria}
                >
                  {step.icon}
                </span>
                <span>{step.label}</span>
              </motion.li>
            ))}
          </ol>
        </section>
      </Layout>
    </>
  );
}
