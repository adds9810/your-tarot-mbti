/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, MessageCircleMore } from "lucide-react";
import { MBTI_PROFILE, isMBTIType } from "@/constants/mbtiProfile";
import CaptureView from "@/components/CaptureView";
import html2canvas from "html2canvas";
import FeedbackFormModal from "@/components/FeedbackFormModal"; // 💡 모달 import

interface TarotResult {
  card: {
    id: number;
    name: string;
    image: string;
  };
  question: string;
  mbti: string;
  interpretation: string;
  createdAt: string;
}

interface MBTIProfile {
  title: string;
  description: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<TarotResult | null>(null);
  const [profile, setProfile] = useState<MBTIProfile | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const hasCheckedSession = useRef(false);

  useEffect(() => {
    if (hasCheckedSession.current) return; // 이미 실행한 경우 스킵
    hasCheckedSession.current = true;
    const savedResult = localStorage.getItem("tarot_result");

    if (!savedResult) {
      alert("비정상적인 접근입니다. 메인 페이지로 이동합니다.");
      router.replace("/");
      return;
    }

    try {
      const parsed = JSON.parse(savedResult);

      const hasRequiredFields =
        parsed &&
        parsed.mbti &&
        parsed.question &&
        parsed.card &&
        parsed.card.name &&
        parsed.card.image &&
        parsed.interpretation;

      if (!hasRequiredFields) {
        alert("결과 정보가 불완전합니다. 메인 페이지로 이동합니다.");
        router.replace("/");
        return;
      }

      const mbtiRaw = parsed.mbti.toUpperCase();

      if (!isMBTIType(mbtiRaw)) {
        alert("올바르지 않은 MBTI 정보입니다. 메인 페이지로 이동합니다.");
        router.replace("/");
        return;
      }

      const mbti = mbtiRaw;

      setResult({ ...parsed, mbti });
      setProfile(MBTI_PROFILE[mbti]);
    } catch (e) {
      console.error("tarot_result 파싱 오류:", e);
      alert("저장된 결과를 불러오는 데 문제가 발생했습니다.");
      router.replace("/");
    }
  }, [router]);

  //   const handleShare = async () => {
  //     try {
  //       await navigator.share({
  //         title: "나의 타로 조언",
  //         text: `${result?.mbti} 성향의 나에게 전해진 타로 조언`,
  //         url: window.location.href,
  //       });
  //     } catch (error) {
  //       console.error("공유하기 실패:", error);
  //     }
  //   };
  const handleDownloadImage = async () => {
    if (!captureRef.current || !isImageLoaded) return;

    const canvas = await html2canvas(captureRef.current, {
      scale: 2,
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "tarot-result.png";
    link.click();
  };

  if (!result || !profile) return null;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-8 pb-[100px] sm:pb-0">
          {/* 숨겨진 공유용 캡처 뷰 */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              transform: "translateX(-9999px)",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <CaptureView
              ref={captureRef}
              result={result}
              onImageLoad={() => setIsImageLoaded(true)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* MBTI 프로필 섹션 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              aria-labelledby="mbti-profile-title"
              className="flex flex-col justify-between"
            >
              <div className="mb-8">
                <h1
                  id="mbti-profile-title"
                  className="text-3xl md:text-4xl font-serif font-bold text-[#f7f5f0] mb-4"
                >
                  {result.mbti} {profile?.title ?? ""}
                </h1>
                <p className="text-[#e6e1d6] text-lg leading-relaxed">
                  {profile?.description ?? ""}
                </p>
              </div>
            </motion.section>

            {/* 타로 결과 섹션 */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              aria-labelledby="tarot-section-title"
              className="bg-[#1a2320]/80 rounded-2xl mt-[100%] sm:mt-[60%] md:mt-0 p-6 md:p-8 md:max-h-[calc(100vh-220px)] overflow-y-auto"
            >
              <h2 id="tarot-section-title" className="sr-only">
                타로 리딩 결과
              </h2>

              <div className="space-y-6">
                <section
                  aria-labelledby="question-title "
                  className="flex items-start justify-start gap-2 mb-2"
                >
                  <h3
                    id="question-title"
                    className="text-xl text-[#bcb8b1] inline-block "
                  >
                    당신의 질문
                  </h3>
                  <p className="text-[#f7f5f0] text-lg">{result.question}</p>
                </section>

                <figure className="relative w-full aspect-[3/4] max-w-[240px] mx-auto">
                  <img
                    src={`/assets/images/${result.card.image.toLowerCase()}`}
                    alt={`${result.card.name} 카드 이미지`}
                    className="w-full h-full object-contain rounded-lg shadow-lg"
                  />
                  <figcaption className="text-center text-[#e6e1d6] mt-2 text-lg">
                    {result.card.name}
                  </figcaption>
                </figure>

                <section aria-labelledby="advice-title">
                  <h3 id="advice-title" className="text-xl text-[#bcb8b1] mb-4">
                    타로의 조언
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-[#f7f5f0] leading-relaxed whitespace-pre-line">
                      {result.interpretation}
                    </p>
                  </div>
                </section>
              </div>
            </motion.section>
          </div>
          {/* ✅ 하단 플로팅 버튼 */}
          <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 sm:static sm:flex-row sm:justify-end sm:mt-4 sm:mb-0">
            <Button
              variant="default"
              onClick={() => router.push("/")}
              className="rounded-full bg-[#1a1a1a]/90 text-white shadow-md px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              처음으로
            </Button>
            <Button
              variant="default"
              onClick={handleDownloadImage}
              className="rounded-full bg-[#1a1a1a]/90 text-white shadow-md px-4 py-2"
            >
              <Share2 className="w-4 h-4 mr-1" />
              이미지 저장
            </Button>
            <Button
              variant="default"
              onClick={() => setShowModal(true)}
              className="rounded-full bg-[#1a1a1a]/90 text-white shadow-md px-4 py-2"
            >
              <MessageCircleMore className="w-4 h-4 mr-1" />
              후기 남기기
            </Button>
          </div>
          {/* ✅ 후기 모달 */}
          {showModal && (
            <FeedbackFormModal
              page="result"
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </Layout>
    </>
  );
}
