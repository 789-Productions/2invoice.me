import { twMerge } from "tailwind-merge";

const colorVariants = {
  indigo: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600",
  red: "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600",
  green: "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600",
  slate: "bg-slate-700 hover:bg-slate-600 focus-visible:outline-slate-700",
  yellow: "bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600",
  sky: "bg-sky-600 hover:bg-sky-500 focus-visible:outline-sky-600",
  blue: "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600",
};

export default function Button({
  children,
  onClick,
  className,
  type,
  color = "indigo",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  color?: keyof typeof colorVariants;
}) {
  const baseClasses = `inline-flex justify-center rounded-md py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;

  return (
    <button
      onClick={onClick}
      className={twMerge(baseClasses, colorVariants[color], className)}
      type={type}
    >
      {children}
    </button>
  );
}
