"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FeedbackDetailModal from "./FeedbackDetailModal";

interface Feedback {
  id: string;
  nickname: string | null;
  mbti: string | null;
  content: string;
  created_at: string;
  page?: string;
}
export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalFeedback, setModalFeedback] = useState<Feedback | null>(null);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data, error } = await supabase
        .from("mbti_feedbacks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setFeedbacks(data);
      }
    };

    fetchFeedbacks();
  }, []);

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const currentItems = feedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (feedbacks.length === 0) {
    return (
      <p className="mb-6 text-center text-[#bcb8b1]">
        아직 남겨진 이야기가 없어요.
      </p>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {currentItems.map((fb) => (
          <button
            key={fb.id}
            onClick={() => setModalFeedback(fb)}
            className="text-left bg-[#1a2320]/50 p-6 rounded-lg hover:bg-[#1a2320]/70 transition"
          >
            <p className="text-[#e6e1d6] italic line-clamp-2">{`"${fb.content}"`}</p>
            <p className="text-sm text-[#bcb8b1] mt-4">
              -{" "}
              {fb.mbti || fb.nickname
                ? `${fb.mbti ?? ""} ${fb.nickname ?? ""}`.trim() + "의 기록"
                : "누군가의 기록"}
            </p>
          </button>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-full text-sm ${
              currentPage === 1
                ? "bg-[#2a2f2c] text-gray-500 cursor-not-allowed"
                : "bg-[#2a2f2c] text-white hover:bg-[#3a3f3c]"
            }`}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full text-sm ${
                page === currentPage
                  ? "bg-white text-black"
                  : "bg-[#2a2f2c] text-white hover:bg-[#3a3f3c]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-full text-sm ${
              currentPage === totalPages
                ? "bg-[#2a2f2c] text-gray-500 cursor-not-allowed"
                : "bg-[#2a2f2c] text-white hover:bg-[#3a3f3c]"
            }`}
          >
            다음
          </button>
        </div>
      )}

      {modalFeedback && (
        <FeedbackDetailModal
          onClose={() => setModalFeedback(null)}
          content={modalFeedback.content}
          title={
            modalFeedback.mbti || modalFeedback.nickname
              ? `${modalFeedback.mbti ?? ""} ${
                  modalFeedback.nickname ?? ""
                }`.trim() + "의 기록"
              : "누군가의 기록"
          }
        />
      )}
    </>
  );
}
