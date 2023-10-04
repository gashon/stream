import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PageLayout: FC<Props> = ({ children }) => (
  <main className="flex justify-center bg-zinc-900 w-screen min-h-screen text-white">
    <div className="w-1/2 lg:11/12 mt-28">{children}</div>
  </main>
);
