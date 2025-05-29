// components/Header.tsx

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 flex items-center justify-between px-4 md:px-6 py-4 text-[#eae6e0] text-sm ransition-[backdrop-filter] duration-100 ${
        scrolled
          ? "bg-[#1a2320]/60 shadow-md backdrop-blur-md"
          : "bg-transparent shadow-none backdrop-blur-0"
      }`}
    >
      {/* 왼쪽: 브랜드 + 서브문구 */}
      <div className="flex flex-col leading-tight">
        <Link
          href="/"
          className="text-base font-semibold tracking-wide hover:opacity-90"
        >
          조용한 시작
        </Link>
        <span className="text-xs opacity-70 italic">
          마음이 흐르는 곳에, 조용한 조언이 도착합니다.
        </span>
      </div>

      {/* 오른쪽: 네비게이션 */}
      <nav className="flex gap-4 items-center pt-1 text-xs text-right">
        <Link
          href="/about"
          className="hover:underline hover:text-white transition"
        >
          소개
        </Link>
        <Link
          href="https://github.com/adds9810"
          className="hover:underline hover:text-white transition"
        >
          개발자 GitHub
        </Link>
      </nav>
    </header>
  );
}
