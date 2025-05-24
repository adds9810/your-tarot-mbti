import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const sentence =
  "당신의 성향은 바람처럼 흐르고, 타로는 그 바람을 따라 오는 작은 이야기입니다.";

export default function Home() {
  return (
    <>
      <Head>
        <title>MBTI x Tarot | 조용한 시작</title>
        <meta
          name="description"
          content="성향과 카드가 만나는 감정의 바람 속에서, 당신만의 조언이 들려옵니다."
        />
      </Head>

      <main className="min-h-screen bg-[#f8f6f2] text-[#4e4a45] px-6 py-12 flex flex-col items-center justify-center text-center relative overflow-hidden font-serif">
        {/* 1. 부드럽게 흐르는 배경 이미지 */}
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/background.png')" }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.1, 0.12, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 2. 나뭇잎 실루엣 흔들림 (leaf-shadow.svg 필요) */}
        <motion.div
          className="absolute inset-0 bg-[url('/assets/images/leaf-shadow.svg')] bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none z-0"
          animate={{
            x: [-1, 1, 0],
            y: [0, 1, -1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 max-w-xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-semibold tracking-wide"
          >
            조용한 감정의 지도
          </motion.h1>

          {/* 3. 한 글자씩 조용히 나타나는 문장 */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.5,
                  staggerChildren: 0.05,
                },
              },
            }}
            className="text-lg md:text-xl text-[#6e6861] leading-relaxed flex flex-wrap justify-center"
          >
            {sentence.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link href="/test">
              <Button
                variant="outline"
                className="bg-transparent border-[#c2b9a8] text-[#4e4a45] hover:bg-[#ede9e2] transition rounded-lg px-6 py-3 text-base shadow-none"
                aria-label="조용히 시작하기"
              >
                조용히 시작하기
              </Button>
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 space-y-3 text-left text-lg text-[#5f564f]"
          >
            <li>🌱 성향을 알아봅니다</li>
            <li>🌫 마음속 질문을 정합니다</li>
            <li>🌙 카드 한 장을 뽑습니다</li>
            <li>📜 감정에 맞는 말 한 줄을 받습니다</li>
          </motion.ul>

          <footer className="pt-12 text-sm text-[#a1988a]">
            2025 © TarotCat | Created like wind and time
          </footer>
        </div>
      </main>
    </>
  );
}
