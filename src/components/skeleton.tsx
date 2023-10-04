import { FC } from "react";

type Props = {
  num: number;
};

export const LoadingSkeleton: FC<Props> = ({ num }) => (
  <ul className="mt-5 space-y-8">
    {new Array(num).fill(0).map((_, i) => (
      <li
        key={`post:loading:${i}`}
        className="w-full h-10 bg-gray-200 rounded-md dark:bg-zinc-700"
      ></li>
    ))}
  </ul>
);
