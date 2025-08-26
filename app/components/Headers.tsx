export function SmallHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
      {children}
    </h3>
  );
}

export function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl font-bold text-slate-800 dark:text-slate-100 ${className}`}
    >
      {children}
    </h2>
  );
}

export function LargeHeader({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
      {children}
    </h1>
  );
}
