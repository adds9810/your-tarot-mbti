import Head from "next/head";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>MBTI x Tarot | 성향 기반 타로 조언</title>
        <meta
          name="description"
          content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다."
        />
        <meta
          property="og:title"
          content="MBTI x Tarot | 성향 기반 타로 조언"
        />
        <meta
          property="og:description"
          content="MBTI 성향에 따라 당신만의 맞춤형 타로 조언을 전해드립니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-tarot-mbti.com/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>내용</Layout>
    </>
  );
}
