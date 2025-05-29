import { motion } from "framer-motion";
import { useMemo } from "react";

export default function LoadingOverlay() {
  const message = useMemo(() => {
    const messages = [
      "별의 속삭임을 불러오는 중입니다.",
      "당신을 위한 운명의 한 줄을 고르고 있어요.",
      "조용한 마음으로 기다려 주세요.",
      "별빛 아래서 당신의 이야기를 듣고 있어요.",
      "곧, 당신만을 위한 답이 도착할 거예요.",
      "천천히, 그리고 정확하게 길을 그리고 있어요.",
      "이 순간, 당신의 질문에 응답하는 중입니다.",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0f1312]/95 flex flex-col items-center justify-center text-[#e6e1d6]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-xl md:text-2xl font-serif text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {message}
      </motion.div>

      <motion.div
        className="flex gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.3, repeat: Infinity },
          },
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#e6e1d6] rounded-full"
            variants={{
              hidden: { opacity: 0.2, scale: 0.8 },
              visible: {
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.1, 0.8],
              },
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
