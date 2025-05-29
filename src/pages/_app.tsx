import "@/styles/globals.css";
import { useEffect, useRef } from "react";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
// 반딧불 particle 컴포넌트
function Fireflies({ count = 24 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx?.scale(dpr, dpr);

    // 반딧불 파티클 초기화 (최적화 버전)
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 1.5,
      alpha: 0.5 + Math.random() * 0.4,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.2,
      twinkle: Math.random() * Math.PI * 2,
    }));

    let animationId: number;
    function animate() {
      ctx?.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        p.twinkle += 0.03;
        const twinkleAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle));

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx!.fillStyle = `rgba(255, 255, 200, ${twinkleAlpha})`;
        ctx!.shadowColor = "rgba(255, 255, 220, 0.8)";
        ctx!.shadowBlur = 10;
        ctx!.fill();
        ctx!.shadowBlur = 0;

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }
      });

      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.pathname;
  const backgroundImage =
    path === "/"
      ? "intro-background.png"
      : path.includes("/test")
      ? "test-background.png"
      : path.includes("/draw")
      ? "draw-background.png"
      : "result-background.png";

  const FirefliesCount =
    path === "/"
      ? 28
      : path.includes("/test")
      ? 10
      : path.includes("/draw")
      ? 5
      : 24;
  useEffect(() => {
    // 페이지 이동 시마다 스크롤 최상단으로
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex flex-col justify-between min-h-screen bg-[#1a2320] overflow-hidden"
        style={{
          background: `url('/assets/images/${backgroundImage}') center/cover no-repeat`,
          filter: "blur(0.5px) brightness(0.85)",
        }}
      >
        <motion.div
          aria-hidden
          className="fixed inset-0 w-full h-full z-0"
          initial={{ scale: 1.025 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {/* 반딧불 */}
          <Fireflies count={FirefliesCount} />
        </motion.div>
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}
