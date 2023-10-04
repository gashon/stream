import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PageLayout: FC<Props> = ({ children }) => (
  <main className="flex justify-center items-center bg-red-700 w-screen">
    <div className="w-11/12 lg:w-1/2">{children}</div>
  </main>
);
