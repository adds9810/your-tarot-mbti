import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";

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

const mbtiProfiles: Record<string, MBTIProfile> = {
  INFP: {
    title: "이상주의적인 탐험가",
    description:
      "따뜻한 감성을 가진 이상주의자로, 깊은 통찰력과 창의성을 지닌 당신. 내면의 가치와 의미를 중요시하며, 타인의 감정에 민감하게 반응합니다.",
  },
  // ... 다른 MBTI 프로필들
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TarotResult | null>(null);
  const [profile, setProfile] = useState<MBTIProfile | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("tarot_result");
    if (!savedResult) {
      router.push("/");
      return;
    }

    const parsedResult = JSON.parse(savedResult);
    setResult(parsedResult);
    setProfile(mbtiProfiles[parsedResult.mbti] || mbtiProfiles.INFP);
  }, [router]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "나의 타로 조언",
        text: `${result?.mbti} 성향의 나에게 전해진 타로 조언`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("공유하기 실패:", error);
    }
  };

  if (!result || !profile) return null;

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
        <div className="container mx-auto px-4 py-8">
          {/* 상단 내비게이션 */}
          <nav
            aria-label="페이지 내비게이션"
            className="flex justify-between items-center mb-8"
          >
            <Button
              variant="ghost"
              className="text-[#e6e1d6] hover:text-white"
              onClick={() => router.push("/")}
              role="link"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              처음으로
            </Button>
            <Button
              variant="ghost"
              className="text-[#e6e1d6] hover:text-white"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5 mr-2" />
              공유하기
            </Button>
          </nav>

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
                  {result.mbti} {profile.title}
                </h1>
                <p className="text-[#e6e1d6] text-lg leading-relaxed">
                  {profile.description}
                </p>
              </div>
            </motion.section>

            {/* 타로 결과 섹션 */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              aria-labelledby="tarot-section-title"
              className="bg-[#1a2320]/80 rounded-2xl mt-[70%] sm:mt-[60%] md:mt-0 p-6 md:p-8 md:max-h-[calc(100vh-200px)] overflow-y-auto"
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
        </div>
      </Layout>
    </>
  );
}
