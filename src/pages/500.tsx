export default function Custom500() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4 text-[#f7f5f0]">
      <h1 className="text-6xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(30,30,30,0.18)]">
        500
      </h1>
      <p className="text-xl mb-2 text-[#e6e1d6]">문제가 생겼어요.</p>
      <p className="text-sm text-gray-400"> 잠시 후 다시 시도해 주세요.</p>
    </main>
  );
}
