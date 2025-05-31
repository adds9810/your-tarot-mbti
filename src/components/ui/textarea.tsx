"use client";

import * as React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full min-h-[80px] px-3 py-2 border border-gray-600 rounded bg-black text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
