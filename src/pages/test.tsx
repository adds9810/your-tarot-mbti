import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";

const questions = [
  "혼자 있는 시간이 나를 다시 숨 쉬게 한다.",
  "말보다 눈빛이 더 많은 걸 전한다고 느낀다.",
  "계획이 틀어졌을 때, 오히려 마음이 가벼워질 때가 있다.",
  "사람 많은 곳에선 에너지가 조금씩 빠져나간다.",
  "세상의 규칙보단, 내 직감이 더 정확하다고 믿는다.",
  "누군가의 슬픔을, 말하지 않아도 느낄 수 있다.",
];

const choices = [
  { label: "공감해요", value: 1 },
  { label: "그렇진 않아요", value: 0 },
];

export default function TestPage() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false); // 인트로 여부
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelect = (value: number) => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      // MBTI 4축 계산
      const axes = {
        EI: 0, // +면 I, -면 E
        NS: 0, // +면 N, -면 S
        FT: 0, // +면 F, -면 T
        PJ: 0, // +면 P, -면 J
      };

      // 각 질문별로 MBTI 축 연결
      updatedAnswers.forEach((ans, idx) => {
        switch (idx) {
          case 0:
          case 3:
            axes.EI += ans ? 1 : -1;
            break;
          case 1:
          case 4:
            axes.NS += ans ? 1 : -1;
            break;
          case 2:
            axes.PJ += ans ? 1 : -1;
            break;
          case 5:
            axes.FT += ans ? 1 : -1;
            break;
        }
      });

      const mbti =
        (axes.EI >= 0 ? "I" : "E") +
        (axes.NS >= 0 ? "N" : "S") +
        (axes.FT >= 0 ? "F" : "T") +
        (axes.PJ >= 0 ? "P" : "J");

      localStorage.setItem(
        "tarot_result",
        JSON.stringify({
          answers: updatedAnswers,
          mbti,
          createdAt: new Date().toISOString(),
        })
      );

      console.log("MBTI 결과:", mbti);
      router.push("/draw");
    }
  };

  return (
    <>
      <Head>
        <title>성향 테스트 | 마음의 흐름 따라가기</title>
        <meta
          name="description"
          content="당신의 성향을 감성적인 6문항 테스트로 알아보세요. 그리고 맞춤형 타로 조언을 받아보세요."
        />
        <meta property="og:title" content="성향 테스트 | 조용한 새벽의 타로" />
        <meta
          property="og:description"
          content="당신의 성향을 감성적인 6문항 테스트로 알아보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-tarot-mbti.com/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <section
          aria-labelledby="test-heading"
          className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-4"
        >
          {!started ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-xl bg-[#1a2320]/80 rounded-2xl shadow-lg px-6 py-14"
            >
              <h1
                id="test-heading"
                className="text-3xl md:text-4xl font-semibold text-[#f7f5f0] mb-6 font-serif"
              >
                조용한 새벽의 시작
              </h1>
              <p className="text-lg md:text-xl text-[#e6e1d6] font-serif leading-relaxed mb-4">
                마음이 흔들릴 때,
                <br />
                나는 어떤 방향으로 흐르는 사람일까요?
              </p>
              <p className="text-md md:text-lg text-[#d9d6cc] font-serif">
                조용히, 당신의 성향을 따라가 봐요.
              </p>

              <Button
                onClick={() => setStarted(true)}
                className="mt-10 px-8 py-3 rounded-xl bg-white/80 hover:bg-muted text-gray-700 transition font-semibold text-lg"
                aria-label="성향 테스트 시작하기"
              >
                조용히 시작하기
              </Button>
            </motion.div>
          ) : (
            <section
              aria-labelledby="question-heading"
              className="w-full max-w-xl mx-auto flex flex-col items-center justify-center bg-[#1a2320]/80 rounded-2xl shadow-lg p-6 md:p-10"
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={step}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="w-full"
                  aria-live="polite"
                >
                  <div className="mb-8 text-center">
                    <h2
                      id="question-heading"
                      className="text-2xl md:text-3xl font-bold text-[#f7f5f0] font-serif mb-4"
                    >
                      {step + 1} / {questions.length}
                    </h2>
                    <p
                      className="text-lg md:text-xl text-[#e6e1d6] font-serif"
                      aria-label={`질문 ${step + 1}: ${questions[step]}`}
                    >
                      {questions[step]}
                    </p>
                  </div>

                  <div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4"
                    role="radiogroup"
                    aria-label="답변 선택지"
                  >
                    {choices.map((choice, idx) => (
                      <Button
                        key={choice.label}
                        type="button"
                        aria-label={choice.label}
                        className="rounded-xl px-8 py-3 text-lg font-semibold shadow-md bg-[#fffbe6] text-[#1a2320] hover:bg-[#e6e1d6] focus-visible:ring-2 focus-visible:ring-[#bcb8b1] transition min-w-[120px]"
                        onClick={() => handleSelect(choice.value)}
                        tabIndex={0}
                        autoFocus={idx === 0}
                      >
                        {choice.label}
                      </Button>
                    ))}
                  </div>
                </motion.article>
              </AnimatePresence>
            </section>
          )}
        </section>
      </Layout>
    </>
  );
}
