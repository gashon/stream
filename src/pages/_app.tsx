import "@/styles/globals.css";

import { queryClient, QueryClientProvider } from "@/lib/react-query";
import { PageLayout } from "@/layouts";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </PageLayout>
  );
}
