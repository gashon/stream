import Link from "next/link";
import { FC, ReactNode } from "react";
import { AiFillStar } from "react-icons/ai";

type Props = {
  children: ReactNode;
  BottomLinkComponent: ReactNode;
  bottomLinkHref: string;
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

export const PageLayout: FC<Props> = ({
  title,
  children,
  bottomLinkHref,
  BottomLinkComponent,
}) => {
  logWarningMessage();

  console.log("href", bottomLinkHref);
  return (
    <main className="flex justify-center bg-zinc-900 w-screen min-h-screen text-white">
      <div className="w-1/2 lg:11/12 mt-28">
        <h1 className="text-2xl mb-10">{title}</h1>

        {children}

        <section className="absolute bottom-10 right-10">
          <Link href={bottomLinkHref}>
            <div className="flex flex-row justify-center items-center underline">
              {BottomLinkComponent}
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
};
