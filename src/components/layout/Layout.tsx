// src/components/Layout.tsx
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-12 relative z-10 min-h-[calc(100vh-150px)] flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
