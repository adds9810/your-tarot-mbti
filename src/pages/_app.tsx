import "@/styles/globals.css";
import { useEffect, useRef, useState } from "react";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { MBTI_PROFILE, MBTIType } from "@/constants/mbtiProfile";
// import LoadingOverlay from "@/components/LoadingOverlay";

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
  // const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    "/assets/images/result-background.png"
  );
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  // useEffect(() => {
  //   const handleStart = () => setIsRouteChanging(true);
  //   const handleComplete = () => setIsRouteChanging(false);

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // }, [router]);
  useEffect(() => {
    let image = "/assets/images/result-background.png";
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tarot_result");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const mbti = parsed.mbti?.toUpperCase() as MBTIType;
          if (path === "/") image = "/assets/images/intro-background.png";
          else if (path.includes("/test"))
            image = "/assets/images/test-background.png";
          else if (path.includes("/draw"))
            image = "/assets/images/draw-background.png";
          else if (path.includes("/result") && MBTI_PROFILE[mbti]) {
            image = MBTI_PROFILE[mbti].backgroundImage;
          }
        } catch (e) {
          console.error("tarot_result 파싱 오류:", e);
        }
      }
    }
    setBackgroundImage(image);
  }, [path]);

  const FirefliesCount =
    path === "/"
      ? 28
      : path.includes("/test")
      ? 10
      : path.includes("/draw")
      ? 5
      : 24;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={`flex flex-col justify-between min-h-screen ${
          !path.includes("/result") ? "bg-[#1a2320]" : "bg-[#000706]"
        } overflow-hidden`}
      >
        <motion.div
          className={`fixed top-0 left-0 w-full h-screen z-0 bg-no-repeat ${
            !path.includes("/result")
              ? "bg-cover bg-center"
              : "bg-cover bg-[15%] sm:bg-[0%] lg:bg-center"
          }`}
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            filter: "blur(0.5px) brightness(0.85)",
          }}
        />
        <motion.div
          aria-hidden
          className="fixed inset-0 w-full h-full z-0"
          initial={{ scale: 1.025 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Fireflies count={FirefliesCount} />
        </motion.div>
        {/* {isRouteChanging && <LoadingOverlay />} */}
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}
