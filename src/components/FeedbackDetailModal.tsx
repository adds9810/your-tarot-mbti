"use client";

import { Button } from "@/components/ui/button";

export default function FeedbackDetailModal({
  content,
  title,
  onClose,
}: {
  content: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-detail-title"
      aria-describedby="feedback-detail-content"
    >
      <div
        role="document"
        className="bg-[#1a2320] text-white p-6 rounded-lg max-w-[90%] md:max-w-md w-full relative"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-white hover:text-red-400"
          aria-label="닫기"
        >
          &times;
        </button>

        {/* 제목 */}
        <h3 id="feedback-detail-title" className="text-lg font-semibold mb-4">
          {title}
        </h3>

        {/* 본문 */}
        <p
          id="feedback-detail-content"
          className="whitespace-pre-line leading-relaxed text-sm max-h-60 overflow-auto"
        >
          {content}
        </p>

        {/* 하단 버튼 */}
        <div className="mt-4 text-right">
          <Button
            onClick={onClose}
            className="text-sm bg-white text-black hover:bg-gray-200"
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
