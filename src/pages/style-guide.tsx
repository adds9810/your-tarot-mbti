import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const palette = [
  { name: "Deep Forest", color: "#1a2320", tw: "bg-[#1a2320]" },
  { name: "Soft Beige", color: "#e6e1d6", tw: "bg-[#e6e1d6]" },
  { name: "Warm Light", color: "#fffbe6", tw: "bg-[#fffbe6]" },
  { name: "Stone Gray", color: "#bcb8b1", tw: "bg-[#bcb8b1]" },
  { name: "Text Main", color: "#f7f5f0", tw: "bg-[#f7f5f0]" },
];

export default function StyleGuide() {
  return (
    <Layout>
      {/* SEO Head 샘플 */}
      <Head>
        <title>Style Guide | TarotCat</title>
        <meta
          name="description"
          content="타로와 성향 기반 조언의 감성적 웹서비스 스타일 가이드"
        />
        <meta property="og:title" content="Style Guide | TarotCat" />
        <meta
          property="og:description"
          content="타로와 성향 기반 조언의 감성적 웹서비스 스타일 가이드"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="max-w-screen-md mx-auto space-y-16">
        {/* 1. 폰트 스타일 샘플 */}
        <section>
          <h2 className="text-xl font-bold mb-4">🅰️ 폰트 스타일 샘플</h2>
          <div className="space-y-2">
            <div className="text-4xl font-serif font-bold">
              Heading - 마음이 머무는 새벽의 숲
            </div>
            <div className="text-lg font-serif">
              Body - 조용히 번지는 감정과 이야기, 부드러운 서체
            </div>
            <div className="text-xs font-serif text-[#bcb8b1]">
              Caption - 보조 설명, 예시 텍스트
            </div>
          </div>
        </section>
        {/* 2. 색상 팔레트 */}
        <section>
          <h2 className="text-xl font-bold mb-4">🎨 색상 팔레트</h2>
          <div className="flex flex-wrap gap-4">
            {palette.map((p) => (
              <div
                key={p.name}
                className={`w-28 h-16 rounded-lg flex flex-col items-center justify-center shadow-inner border border-[#222] ${p.tw}`}
              >
                <span
                  className="text-xs font-semibold mb-1"
                  style={{
                    color: p.name === "Deep Forest" ? "#e6e1d6" : "#1a2320",
                  }}
                >
                  {p.name}
                </span>
                <span
                  className="text-xs"
                  style={{
                    color: p.name === "Deep Forest" ? "#e6e1d6" : "#1a2320",
                  }}
                >
                  {p.color}
                </span>
              </div>
            ))}
          </div>
        </section>
        {/* 3. 버튼 스타일 샘플 */}
        <section>
          <h2 className="text-xl font-bold mb-4">
            🔘 버튼 스타일 샘플 (shadcn/ui)
          </h2>
          <div className="flex flex-wrap gap-4 items-end">
            <Button className="rounded-xl px-6 py-2 font-semibold bg-[#fffbe6] text-[#1a2320] shadow-md hover:bg-[#e6e1d6] transition">
              기본 버튼
            </Button>
            <Button
              className="rounded-xl px-6 py-2 font-semibold bg-[#fffbe6] text-[#1a2320] opacity-60 cursor-not-allowed"
              disabled
            >
              Disabled
            </Button>
            <Button
              variant="ghost"
              className="rounded-xl px-6 py-2 font-semibold text-[#e6e1d6] hover:bg-[#bcb8b1]/20"
            >
              Ghost
            </Button>
          </div>
        </section>
        {/* 4. Input 필드 샘플 */}
        <section>
          <h2 className="text-xl font-bold mb-4">
            🔤 Input 필드 스타일 샘플 (shadcn/ui)
          </h2>
          <div className="flex flex-col gap-4 max-w-xs">
            <Input
              placeholder="기본 입력"
              className="rounded-lg bg-[#fffbe6] text-[#1a2320] placeholder:text-[#bcb8b1] border-[#bcb8b1] focus:border-[#e6e1d6]"
            />
            <Input
              placeholder="포커스 상태"
              className="rounded-lg bg-[#fffbe6] text-[#1a2320] border-[#e6e1d6] ring-2 ring-[#e6e1d6]"
            />
            <Input
              placeholder="비활성화"
              className="rounded-lg bg-[#bcb8b1] text-[#a6a29a] border-[#bcb8b1]"
              disabled
            />
          </div>
        </section>
        {/* 5. 여백/그리드 가이드 */}
        <section>
          <h2 className="text-xl font-bold mb-4">🧱 여백/그리드 가이드</h2>
          <div className="space-y-2">
            <div className="bg-[#e6e1d6] text-[#1a2320] rounded-lg px-6 py-3 max-w-screen-md">
              max-w-screen-md, px-6, py-3
            </div>
            <div className="flex gap-4">
              <div className="bg-[#fffbe6] text-[#1a2320] rounded-lg px-4 py-2">
                gap-4
              </div>
              <div className="bg-[#fffbe6] text-[#1a2320] rounded-lg px-4 py-2">
                gap-4
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="bg-[#bcb8b1] text-[#1a2320] rounded-lg px-4 py-2">
                space-x-4
              </div>
              <div className="bg-[#bcb8b1] text-[#1a2320] rounded-lg px-4 py-2">
                space-x-4
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-[#fffbe6] text-[#1a2320] rounded-lg px-4 py-2">
                space-y-2
              </div>
              <div className="bg-[#fffbe6] text-[#1a2320] rounded-lg px-4 py-2">
                space-y-2
              </div>
            </div>
          </div>
        </section>
        {/* 6. Motion 가이드 */}
        <section>
          <h2 className="text-xl font-bold mb-4">
            🌀 Motion 가이드 (framer-motion)
          </h2>
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="bg-[#fffbe6] text-[#1a2320] rounded-lg px-6 py-3"
            >
              fade-in (opacity)
            </motion.div>
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2 }}
              className="bg-[#e6e1d6] text-[#1a2320] rounded-lg px-6 py-3"
            >
              blur-in (opacity + blur)
            </motion.div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="bg-[#bcb8b1] text-[#1a2320] rounded-lg px-6 py-3"
            >
              scale-in (scale + opacity)
            </motion.div>
          </div>
        </section>
        {/* 7. 접근성 반영 레이아웃 */}
        <section>
          <h2 className="text-xl font-bold mb-4">♿️ 접근성 반영 레이아웃</h2>
          <div className="rounded-lg bg-[#e6e1d6] text-[#1a2320] p-6">
            <header className="mb-2" aria-label="사이트 헤더">
              <nav>
                <a
                  href="#main"
                  className="focus-visible:ring-2 ring-[#bcb8b1] px-2 py-1 rounded"
                >
                  메인 바로가기
                </a>
              </nav>
            </header>
            <main id="main" tabIndex={-1} className="outline-none">
              <section aria-label="소개 영역" className="mb-2">
                메인 콘텐츠 예시
              </section>
            </main>
            <footer className="mt-2" aria-label="사이트 푸터">
              푸터 예시
            </footer>
          </div>
        </section>
        {/* 8. SEO-friendly Head 샘플 */}
        <section>
          <h2 className="text-xl font-bold mb-4">🔍 SEO-friendly Head 샘플</h2>
          <pre className="bg-[#1a2320] text-[#fffbe6] rounded-lg p-4 text-xs overflow-x-auto">
            {`<Head>
  <title>MBTI x Tarot | 성향 기반 타로 조언</title>
  <meta name="description" content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다." />
  <meta property="og:title" content="MBTI x Tarot | 성향 기반 타로 조언" />
  <meta property="og:description" content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://your-tarot-mbti.com/" />
  <meta property="og:image" content="/og-image.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>`}
          </pre>
        </section>
      </main>
    </Layout>
  );
}
