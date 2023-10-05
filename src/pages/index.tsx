import Image from "next/image";
import { Inter } from "next/font/google";

import { PageLayout } from "@/layouts";
import { PostsContainer } from "@/features";

const inter = Inter({ subsets: ["latin"] });

const logWarningMessage = () =>
  console.log(
    `
    +----------------------------------------------------------------------------+
    | WARNING:                                                                   |
    | Clearing localStorage may cause undefined behavior. For safe data deletion,|
    | please clear both your cookie and localStorage.                            |
    | Thanks! - Gashon                                                           |
    +----------------------------------------------------------------------------+
    `
  );

export default function Home() {
  logWarningMessage();

  return (
    <PageLayout title="Stream.">
      <PostsContainer />
    </PageLayout>
  );
}
