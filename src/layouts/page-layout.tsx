import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

export const PageLayout: FC<Props> = ({ title, children }) => (
  <main className="flex justify-center bg-zinc-900 w-screen min-h-screen text-white">
    <div className="w-1/2 lg:11/12 mt-28">
      <h1 className="text-2xl mb-10">{title}</h1>

      {children}
    </div>
  </main>
);
