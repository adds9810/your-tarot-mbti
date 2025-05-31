/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { tarotCards, TarotCard } from "@/constants/tarotCards";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function DrawPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [questionType, setQuestionType] = useState<"today" | "custom" | null>(
    null
  );
  const [customQuestion, setCustomQuestion] = useState("");
  const [shuffled, setShuffled] = useState<TarotCard[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const SHUFFLE_DISPLAY_COUNT = 4;
  const [mbti, setMbti] = useState<string | null>(null);
  const hasCheckedSession = useRef(false);
  const [questionError, setQuestionError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasCheckedSession.current) return; // 이미 실행한 경우 스킵
    hasCheckedSession.current = true;

    const session = localStorage.getItem("tarot_result");
    let parsedMbti;

    try {
      parsedMbti = session ? JSON.parse(session).mbti : null;
    } catch {
      parsedMbti = null;
    }

    if (!parsedMbti) {
      alert("비정상적인 접근입니다. 메인 페이지로 이동합니다.");
      router.replace("/");
    } else {
      setMbti(parsedMbti);
    }
  }, [router]);

  // 카드 셔플 함수
  const shuffleCards = () => {
    const arr = [...tarotCards];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffled(arr);
  };

  // 질문 선택 완료
  const handleNext = () => {
    setStep(1);
    shuffleCards();
    setTimeout(() => setStep(2), 1800);
  };

  // 카드 선택 완료
  const handleCardSelect = async (card: TarotCard) => {
    setLoading(true);
    const question = questionType === "today" ? "오늘의 운세" : customQuestion;

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, card, mbti }), // ✅ 여기서도 동일 변수 사용
      });

      const data = await res.json();

      localStorage.setItem(
        "tarot_result",
        JSON.stringify({
          card,
          question,
          mbti,
          interpretation: data.output,
          createdAt: new Date().toISOString(),
        })
      );

      setLoading(false);
      router.push("/result");
    } catch (error) {
      console.error("Gemini 호출 실패:", error);
      alert("결과를 불러오는 데 문제가 발생했어요.");
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>카드 선택 | 당신의 조언을 들어보세요</title>
        <meta
          name="description"
          content="성향에 따라 조용히 건네는 타로 조언을 위한 카드 선택 페이지입니다."
        />
        <meta property="og:title" content="카드 선택 | 조용한 새벽의 타로" />
        <meta
          property="og:description"
          content="직접 질문을 입력하거나, 오늘의 운세를 선택해 타로카드를 뽑아보세요."
        />
      </Head>
      <Layout>
        <section
          aria-labelledby="draw-heading"
          className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-4"
        >
          <div
            className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center bg-[#1a2320]/80 rounded-2xl shadow-lg p-6 md:p-10"
            role="region"
            aria-label="카드 선택 영역"
          >
            <AnimatePresence mode="wait">
              {/* 1단계: 질문 선택 */}
              {step === 0 && (
                <motion.section
                  key="question"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  aria-labelledby="question-heading"
                  className="w-full"
                >
                  <h2
                    id="question-heading"
                    className="text-2xl md:text-3xl font-bold text-[#f7f5f0] font-serif text-center mb-6"
                  >
                    어떤 질문으로 카드를 뽑을까요?
                  </h2>

                  <div className="flex flex-col gap-6 mb-6">
                    {/* 1️⃣ 오늘의 운세 보기 단독 버튼 */}
                    <div className="flex flex-col items-center">
                      <span className="text-[#e6e1d6] mb-2 font-serif text-lg">
                        간단히 오늘의 운세를 보고 싶다면
                      </span>
                      <Button
                        aria-label="오늘의 운세 보기"
                        className="rounded-xl px-8 py-3 text-lg font-semibold shadow-md bg-[#fffbe6] text-[#1a2320] hover:bg-[#e6e1d6] focus-visible:ring-2 focus-visible:ring-[#bcb8b1] transition"
                        onClick={() => {
                          setQuestionType("today");
                          setCustomQuestion("오늘의 운세가 궁금해요");
                          handleNext();
                        }}
                      >
                        오늘의 운세 보기
                      </Button>
                    </div>

                    <div className="border-t border-[#bcb8b1]/40" />

                    {/* 2️⃣ 직접 질문 입력 */}
                    <div className="flex flex-col items-center">
                      <span className="text-[#e6e1d6] mb-2 font-serif text-lg">
                        특정한 질문이 있다면 적어보세요
                      </span>
                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                        <div className="flex-1">
                          <Input
                            ref={inputRef}
                            value={customQuestion}
                            onChange={(e) => {
                              setCustomQuestion(e.target.value);
                              setQuestionType("custom");
                              if (questionError) setQuestionError("");
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                customQuestion.trim().length >= 2
                              ) {
                                e.preventDefault(); // 엔터 기본 제출 방지
                                handleNext();
                              }
                            }}
                            placeholder="예: 내일 중요한 일이 잘 풀릴까요?"
                            className="rounded-xl bg-[#fffbe6] text-[#1a2320] placeholder:text-[#bcb8b1] border-[#bcb8b1] focus:border-[#e6e1d6] w-full"
                            maxLength={40}
                          />
                          {questionError && (
                            <p className="text-red-400 text-xs mt-1">
                              {questionError}
                            </p>
                          )}
                        </div>

                        <Button
                          onClick={() => {
                            if (customQuestion.trim().length < 2) {
                              setQuestionError("질문을 2자 이상 입력해주세요.");
                              inputRef.current?.focus();
                              return;
                            }
                            handleNext();
                          }}
                          disabled={customQuestion.trim().length < 2}
                          className="px-6 py-3 rounded-xl bg-white/80 hover:bg-muted text-gray-700 transition font-semibold text-lg"
                        >
                          운세 보기
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* 2단계: 셔플 중 */}
              {step === 1 && (
                <motion.section
                  key="shuffle"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  aria-labelledby="shuffle-heading"
                  className="w-full flex flex-col items-center"
                >
                  <h2
                    id="shuffle-heading"
                    className="text-2xl md:text-3xl font-bold text-[#f7f5f0] font-serif text-center mb-8"
                  >
                    카드를 셔플합니다.
                  </h2>

                  <div className="flex justify-center items-center gap-2 h-44 md:h-56">
                    {Array.from({ length: SHUFFLE_DISPLAY_COUNT }).map(
                      (_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ y: 40, rotate: 0 }}
                          animate={{
                            y: [40, -10, 0, 10, 0],
                            rotate: [0, 8, -8, 8, 0],
                          }}
                          transition={{
                            delay: idx * 0.12,
                            duration: 1.2,
                            repeat: 1,
                            repeatType: "reverse",
                          }}
                          className="w-14 h-24 md:w-28 md:h-44 bg-[#e6e1d6] rounded-xl shadow-lg border-2 border-[#bcb8b1] flex items-center justify-center"
                          aria-label="셔플 카드"
                        >
                          <span className="text-[#bcb8b1] font-serif text-2xl select-none">
                            ?
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.section>
              )}

              {/* 3단계: 카드 선택 */}
              {step === 2 && (
                <motion.section
                  key="pick"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  aria-labelledby="pick-heading"
                  className="w-full flex flex-col items-center"
                >
                  <h2
                    id="pick-heading"
                    className="text-2xl md:text-3xl font-bold text-[#f7f5f0] font-serif text-center mb-4 md:mb-8"
                  >
                    한 장의 카드를 선택해 주세요
                  </h2>

                  <div
                    className="w-full flex flex-wrap justify-center items-center gap-y-2"
                    role="list"
                    aria-label="카드 목록"
                  >
                    {shuffled.slice(0, 22).map((card, idx) => (
                      <motion.button
                        key={card.id}
                        role="listitem"
                        aria-label={`카드 ${idx + 1} 선택`}
                        className={`relative w-14 -ml-8 translate-x-1/4 md:-ml-12 md:w-24 bg-[#e6e1d6] rounded-lg shadow-md border border-[#bcb8b1] flex items-center justify-center transition-transform duration-200 hover:z-10 focus-visible:ring-2 ring-[#bcb8b1] ${
                          selected === card.id
                            ? "ring-4 ring-[#fffbe6] scale-105"
                            : "hover:scale-105"
                        }`}
                        onClick={() => {
                          setSelected(card.id);
                          setLoading(true);
                          setStep(3);
                          setTimeout(() => handleCardSelect(card), 600);
                        }}
                        tabIndex={0}
                        whileTap={{ scale: 0.97 }}
                        style={{ outline: "none" }}
                      >
                        <img
                          src="/assets/images/cards/back.png"
                          alt="타로 카드 뒷면"
                          className="w-full h-full object-contain select-none pointer-events-none"
                          draggable={false}
                        />
                      </motion.button>
                    ))}
                  </div>
                </motion.section>
              )}

              {loading && <LoadingOverlay />}
            </AnimatePresence>
          </div>
        </section>
      </Layout>
    </>
  );
}
