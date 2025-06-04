import "@/styles/globals.css";
import { useEffect, useRef, useState } from "react";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { MBTI_PROFILE, MBTIType } from "@/constants/mbtiProfile";
import { GA_ID, pageView } from "@/lib/gtag";
import LoadingOverlay from "@/components/LoadingOverlay";
import GoogleAnalytics from "@/components/GoogleAnalytics";

function Fireflies({ count = 24 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // eslint-disable-next-line prefer-const
    let dpr = window.devicePixelRatio || 1;
    // eslint-disable-next-line prefer-const
    let width = window.innerWidth;
    // eslint-disable-next-line prefer-const
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
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [backgroundImage, setBackgroundImage] = useState(
    "/assets/images/background/result-background.jpg"
  );
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  useEffect(() => {
    // 최초 방문 referrer 이벤트
    if (
      typeof window !== "undefined" &&
      typeof window.gtag === "function" &&
      GA_ID
    ) {
      window.gtag("event", "visit_with_referrer", {
        referrer: document.referrer || "direct",
      });
    }

    // 페이지 이동 시 GA 추적
    const handleRouteChange = (url: string) => {
      if (GA_ID) {
        pageView(url);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    let image = "/assets/images/background/result-background.jpg";

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("tarot_result");
        const parsed = stored ? JSON.parse(stored) : null;
        const mbti = parsed?.mbti?.toUpperCase() as MBTIType;
        if (path === "/")
          image = "/assets/images/background/intro-background.jpg";
        else if (path.includes("/test"))
          image = "/assets/images/background/test-background.jpg";
        else if (path.includes("/draw"))
          image = "/assets/images/background/draw-background.jpg";
        else if (path.includes("/about"))
          image = "/assets/images/background/about-background.jpg";
        else if (path.includes("/result") && mbti && MBTI_PROFILE[mbti]) {
          image = MBTI_PROFILE[mbti].backgroundImage;
        }
      } catch (e) {
        console.error("❌ tarot_result 파싱 오류:", e);
      }
    }

    const img = new Image();
    img.src = image;
    img.onload = () => {
      setIsReady(true);
    };

    setBackgroundImage(image);
  }, [path]);

  if (!mounted) return null;
  const FirefliesCount =
    path === "/"
      ? 28
      : path.includes("/test")
      ? 10
      : path.includes("/draw")
      ? 5
      : 24;

  return (
    <>
      <GoogleAnalytics />
      <AnimatePresence mode="wait" initial={false}>
        {/* 로딩 완료 후에만 콘텐츠 표시 */}
        {isReady ? (
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`flex flex-col justify-between min-h-screen ${
              !path.includes("/result") ? "bg-[#1a2320]" : "bg-[#000706]"
            } overflow-hidden`}
          >
            {/* 배경 이미지 */}
            <motion.div
              className={`fixed top-0 left-0 w-full h-screen z-0 bg-no-repeat ${
                !path.includes("/result")
                  ? "bg-cover bg-center"
                  : "bg-cover bg-[22%] sm:-bg-[5%] lg:bg-center"
              }`}
              style={{
                backgroundImage: `url('${backgroundImage}')`,
                filter: "blur(0.5px) brightness(0.85)",
              }}
            />

            {/* 파이어플라이 애니메이션 */}
            <motion.div
              aria-hidden
              className="fixed inset-0 w-full h-full z-0"
              initial={{ scale: 1.025 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <Fireflies count={FirefliesCount} />
            </motion.div>
            <Component {...pageProps} />
          </motion.div>
        ) : (
          <LoadingOverlay />
        )}
      </AnimatePresence>
    </>
  );
}
