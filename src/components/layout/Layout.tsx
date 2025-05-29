// src/components/Layout.tsx
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
