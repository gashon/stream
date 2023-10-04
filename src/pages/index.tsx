import Image from "next/image";
import { Inter } from "next/font/google";

import { PageLayout } from "@/layouts";
import { PostsContainer } from "@/features";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <PageLayout title="Stream.">
      <PostsContainer />
    </PageLayout>
  );
}
