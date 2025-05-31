import Link from "next/link";

export default function Custom404() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4 text-[#f7f5f0]">
      <h1 className="text-6xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(30,30,30,0.18)]">
        404
      </h1>
      <p className="text-xl mb-2 text-[#e6e1d6]">길을 잃은 것 같아요.</p>
      <p className="text-sm text-gray-400">이 페이지는 존재하지 않아요.</p>
      <Link
        href="/"
        className="z-[999] relative mt-4 px-6 py-2 rounded-xl bg-white/90 text-black hover:bg-white transition"
      >
        메인으로 가기
      </Link>
    </main>
  );
}
