"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackFormModal({
  onClose,
  page,
}: {
  onClose: () => void;
  page: string;
}) {
  const [nickname, setNickname] = useState("");
  const [mbti, setMbti] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!content.trim()) {
      setErrorMessage("후기를 작성해주세요.");
      contentRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const { error } = await supabase.from("mbti_feedbacks").insert({
      nickname,
      mbti,
      content,
      page,
      created_at: new Date().toISOString(),
    });

    if (!error) {
      // alert(
      //   "후기 감사합니다.\n작성한 후기는 [소개] 페이지에서 확인할 수 있습니다."
      // );
      setSuccess(true);
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "review_submitted", {
          type: "tarot_feedback",
        });
      }
      setTimeout(() => {
        setNickname("");
        setMbti("");
        setContent("");
        setIsSubmitting(false);
        onClose();
        if (page === "about") {
          window.location.reload();
        }
      }, 1500);
    } else {
      console.error("후기 저장 실패", error);
      setErrorMessage("후기 저장에 실패했어요. 잠시 후 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      aria-describedby="feedback-description"
    >
      <div className="bg-[#1a2320] rounded-lg p-6 w-full max-w-[90%] md:max-w-md relative text-white shadow-lg">
        <Button
          className="absolute top-3 right-4 text-white hover:text-red-400 text-xl"
          onClick={onClose}
          aria-label="닫기"
        >
          &times;
        </Button>

        {/* 제목 */}
        <h3 id="feedback-title" className="text-lg font-semibold mb-1">
          후기를 남겨주세요
        </h3>
        <p id="feedback-description" className="text-xs text-gray-400 mb-4">
          ※ 작성한 후기는 [소개] 페이지에서 확인할 수 있습니다.
        </p>

        {/* 닉네임 입력 */}
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 (선택)"
          className="w-full mb-2 p-2 rounded bg-transparent border border-gray-600 text-sm"
          aria-label="닉네임 (선택)"
        />

        {/* MBTI 입력 */}
        <Input
          type="text"
          value={mbti}
          onChange={(e) => setMbti(e.target.value)}
          placeholder="MBTI (선택, 예: INFP)"
          className="w-full mb-2 p-2 rounded bg-transparent border border-gray-600 text-sm"
          aria-label="MBTI (선택)"
        />

        {/* 후기 입력 */}
        <Textarea
          ref={contentRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          placeholder="이 서비스에 대한 생각이나 이용 후기를 남겨주세요 :) (필수)"
          className="w-full h-24 p-3 bg-transparent border border-gray-600 rounded resize-none text-sm"
          maxLength={300}
          aria-label="후기 내용 (필수)"
          aria-required="true"
        />

        {errorMessage && (
          <p className="text-red-400 text-xs mb-4" role="alert">
            {errorMessage}
          </p>
        )}

        <p className="text-right text-xs text-gray-400 mb-2">
          {content.length}/300자
        </p>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? "보내는 중..." : "보내기"}
        </Button>

        {success && (
          <p
            className="mt-2 text-green-300 text-sm"
            role="status"
            aria-live="polite"
          >
            후기 감사합니다.
            <br />
            작성한 후기는 [소개] 페이지에서 확인할 수 있습니다. :)
          </p>
        )}
      </div>
    </div>
  );
}
