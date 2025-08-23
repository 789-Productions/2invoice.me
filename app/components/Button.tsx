import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  onClick,
  className,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
        className
      )}
      type={type}
    >
      {children}
    </button>
  );
}
