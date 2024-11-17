import { twMerge } from "tailwind-merge";

const Loader = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-8 items-center justify-center z-50">
      <div role="status" className="relative size-12">
        <svg
          className="h-20 w-20 animate-spin stroke-darkOrange"
          viewBox="0 0 256 256"
        >
          <line
            x1="128"
            y1="32"
            x2="128"
            y2="64"
            stroke-linecap="round"
            strokeLinejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="195.9"
            y1="60.1"
            x2="173.3"
            y2="82.7"
            stroke-linecap="round"
            strokeLinejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="224"
            y1="128"
            x2="192"
            y2="128"
            stroke-linecap="round"
            strokeLinejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="195.9"
            y1="195.9"
            x2="173.3"
            y2="173.3"
            stroke-linecap="round"
            strokeLinejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="128"
            y1="224"
            x2="128"
            y2="192"
            stroke-linecap="round"
            strokeLinejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="60.1"
            y1="195.9"
            x2="82.7"
            y2="173.3"
            stroke-linecap="round"
            strokeLinejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="32"
            y1="128"
            x2="64"
            y2="128"
            stroke-linecap="round"
            strokeLinejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="60.1"
            y1="60.1"
            x2="82.7"
            y2="82.7"
            stroke-linecap="round"
            strokeLinejoin="round"
            stroke-width="24"
          ></line>
        </svg>
      </div>

      {title && (
        <h3
          className={twMerge(
            "text-white font-semibold text-xl tracking-wide mt-2",
            className
          )}
        >
          {title}
        </h3>
      )}
    </div>
  );
};
export default Loader;
