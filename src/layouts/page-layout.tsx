import Link from "next/link";
import { FC, ReactNode } from "react";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

type Props = {
  children: ReactNode;
  BottomLinkComponent: ReactNode;
  bottomLinkHref: string;
  title: string;
};

const roboto = Roboto({
  display: "swap",
  weight: "300",
  subsets: ["latin-ext"],
});

const logWarningMessage = () =>
  console.log(
    `
    +----------------------------------------------------------------------------+
    | WARNING:                                                                   |
    | Clearing localStorage may cause undefined behavior. For safe data deletion,|
    | please clear both your cookie and localStorage.                            |
    | Thanks! - Gashon                                                           |
    +----------------------------------------------------------------------------+
    `,
  );

export const PageLayout: FC<Props> = ({
  title,
  children,
  bottomLinkHref,
  BottomLinkComponent,
}) => {
  logWarningMessage();

  return (
    <>
      <main
        className={`${roboto.className} flex justify-center bg-zinc-900 w-screen min-h-screen text-white`}
      >
        <div className="w-10/12 lg:w-1/2 mt-28">
          <h1 className="text-2xl mb-10">{title}</h1>

          {children}

          <section className="fixed bottom-10 right-10">
            <Link href={bottomLinkHref}>
              <div className="flex flex-row gap-2 justify-center items-center underline">
                {BottomLinkComponent}
              </div>
            </Link>
          </section>
        </div>
      </main>
      <Analytics />
    </>
  );
};
