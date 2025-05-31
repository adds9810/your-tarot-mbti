import { Html, Head, Main, NextScript } from "next/document";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-tarot-mbti.vercel.app/" />
        <link rel="icon" href="/assets/images/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/images/favicon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/images/favicon-192x192.png"
        />
        <meta
          property="og:image"
          content="https://your-tarot-mbti.vercel.app/assets/images/sns-share.jpg"
        />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics />}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
