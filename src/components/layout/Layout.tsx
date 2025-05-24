// src/components/Layout.tsx
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="flex flex-col justify-between min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <Header />
      <motion.div
        aria-hidden
        className="fixed inset-0 w-full h-full bg-[#1a2320] z-0"
        initial={{ scale: 1.025 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        style={{
          background:
            "url('/assets/images/background.png') center/cover no-repeat",
          filter: "blur(0.5px) brightness(0.85)",
        }}
      >
        {/* 반딧불 */}
        <Fireflies count={28} />
      </motion.div>
      <main className="relative z-10">{children}</main>
      <Footer />
    </motion.div>
  );
}
