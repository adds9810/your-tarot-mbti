import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&display=swap"
          rel="stylesheet"
        />{" "}
        <meta
          property="og:title"
          content="MBTI x Tarot | 성향 기반 타로 조언"
        />
        <meta
          property="og:description"
          content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다."
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
        <meta property="og:url" content="https://your-tarot-mbti.vercel.app/" />
        <meta property="og:site_name" content="조용한 흐름의 시작" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
