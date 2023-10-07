import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="bg-zinc-900">
      <Head>
        <title>Stream</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="description" content="Streams of thought." />
        <meta name="title" content="Stream" />
        <meta name="author" content="Gashon Hussein" />
        <meta name="keywords" content="blog, blogging, platform" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" content="Stream" key="title" />
        <meta name="og:description" content="Streams of thought." />
        <meta name="og:image" content="/favicon.ico" />
        <meta name="og:url" content="https://stream.ghussein.org" />
        <meta name="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
