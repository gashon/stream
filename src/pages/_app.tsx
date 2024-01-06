import "@/styles/globals.css";

import { queryClient, QueryClientProvider } from "@/lib/react-query";
import { Analytics } from "@gashon/analytics";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics
        apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JfaWQiOiJlOWJhM2U0ZC0yOTI4LTQxZTYtOTQ2ZS1lNTAwZWUyNzRkYTciLCJwcm9qZWN0X2lkIjoiOWFjMGY3MjMtMmE5MC00Njk5LTkxOWEtZDllYTcwZTcwNWZhIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDEtMDZUMDE6MjA6MDkuMzYwWiIsImlhdCI6MTcwNDUwNDAwOX0.vhbm56TAsmNZvYIs8rw63YGJn2MDGBTk_rIPGcETM1U"
        endpoint="https://analytics-fawn-nine.vercel.app/api/analytics"
        trackSession
        fingerprintBrowser
        trackClickEvents
        disableOnDev
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
