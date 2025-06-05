// AboutPage.tsx
"use client";

import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FeedbackList from "@/components/FeedbackList";
import FeedbackFormModal from "@/components/FeedbackFormModal";

export default function AboutPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: "-100px" });

  const serviceRef = useRef(null);
  const serviceInView = useInView(serviceRef, { once: true, margin: "-100px" });

  const feedbackRef = useRef(null);
  const isFeedbackInView = useInView(feedbackRef, {
    once: true,
    margin: "-100px",
  });

  const creatorRef = useRef(null);
  const creatorInView = useInView(creatorRef, { once: true, margin: "-100px" });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page: "/about",
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>MBTI x Tarot | 소개</title>
        <meta
          name="description"
          content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다. 조용한 흐름의 시작, MBTI x Tarot."
        />
        <meta property="og:title" content="MBTI x Tarot | 소개" />
        <meta
          property="og:description"
          content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다. 조용한 흐름의 시작, MBTI x Tarot."
        />
        <meta
          property="og:url"
          content="https://your-tarot-mbti.vercel.app/about"
        />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 py-12">
          {/* 인트로 섹션 */}
          <motion.section
            ref={introRef}
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#f7f5f0] mb-4">
              조용한 흐름의 시작, <br className="lg:hidden" />
              MBTI x Tarot
            </h1>
            <p className="text-xl text-[#e6e1d6]">
              당신의 성향에 어울리는 조언을 조용히 전해드립니다.
            </p>
          </motion.section>

          {/* 서비스 소개 섹션 */}
          <motion.section
            ref={serviceRef}
            initial={{ opacity: 0, x: -20 }}
            animate={serviceInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-serif font-bold text-[#f7f5f0] mb-6">
              서비스 소개
            </h2>
            <div className="space-y-6 text-[#e6e1d6]">
              <p className="leading-relaxed">
                MBTI x Tarot는 당신의 성향을 고려한 맞춤형 타로 조언을
                제공합니다. 기존의 타로 서비스와 달리, MBTI 성향을 기반으로 한
                해석으로 더욱 개인화된 통찰을 경험하실 수 있습니다.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-[#1a2320]/50 p-6 rounded-lg">
                  <h3 className="font-serif text-lg text-[#f7f5f0] mb-2">
                    1. 질문 선택
                  </h3>
                  <p className="text-sm">고민하는 주제를 선택하세요</p>
                </div>
                <div className="bg-[#1a2320]/50 p-6 rounded-lg">
                  <h3 className="font-serif text-lg text-[#f7f5f0] mb-2">
                    2. 카드 선택
                  </h3>
                  <p className="text-sm">마음에 드는 카드를 고르세요</p>
                </div>
                <div className="bg-[#1a2320]/50 p-6 rounded-lg">
                  <h3 className="font-serif text-lg text-[#f7f5f0] mb-2">
                    3. 결과 확인
                  </h3>
                  <p className="text-sm">맞춤형 해석을 받아보세요</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 후기 섹션 */}
          <motion.section
            ref={feedbackRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isFeedbackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-serif font-bold text-[#f7f5f0] mb-6">
              방문자들의 이야기
            </h2>
            <FeedbackList />
            <div className="text-center mt-10">
              <Button
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "feedback_click_about");
                  }
                  setShowModal(true);
                }}
                className="bg-[#f7f5f0] text-black hover:bg-[#e2e0d8] px-6 py-3 rounded-full transition"
              >
                ✍ 후기 남기기
              </Button>
            </div>

            {showModal && (
              <FeedbackFormModal
                page="about"
                onClose={() => setShowModal(false)}
              />
            )}
          </motion.section>

          {/* 제작자 소개 섹션 */}
          <motion.section
            ref={creatorRef}
            initial={{ opacity: 0, y: 20 }}
            animate={creatorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <h2 className="text-2xl font-serif font-bold text-[#f7f5f0] mb-6">
              제작자의 말
            </h2>
            <p className="text-[#e6e1d6] leading-relaxed">
              내향적인 사람들이 조용히 위로받을 수 있는 공간이 있었으면
              했습니다. MBTI와 타로를 결합하여, 각자의 성향에 맞는 맞춤형 조언을
              전달하고자 합니다.
            </p>
          </motion.section>

          {/* CTA 섹션 */}
          <motion.section
            ref={ctaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-2xl font-serif font-bold text-[#f7f5f0] mb-6">
              조용한 조언을 받아보고 싶다면?
            </h2>
            <Button
              onClick={() => router.push("/test")}
              className="bg-[#1a2320] hover:bg-[#2a3230] text-white px-8 py-6 rounded-full text-lg transition-all duration-300"
            >
              시작하러 가기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.section>
        </div>
      </Layout>
    </>
  );
}
