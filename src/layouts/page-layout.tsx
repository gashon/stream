import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

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

export const PageLayout: FC<Props> = ({ title, children }) => {
  logWarningMessage();

  return (
    <main className="flex justify-center bg-zinc-900 w-screen min-h-screen text-white">
      <div className="w-1/2 lg:11/12 mt-28">
        <h1 className="text-2xl mb-10">{title}</h1>

        {children}
      </div>
    </main>
  );
};
