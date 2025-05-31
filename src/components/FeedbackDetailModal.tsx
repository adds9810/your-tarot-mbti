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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-[#1a2320] text-white p-6 rounded-lg max-w-[90%] md:max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-white hover:text-red-400"
          aria-label="닫기"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="word-break whitespace-pre-line leading-relaxed text-sm max-h-60 overflow-auto">
          {content}
        </p>
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
