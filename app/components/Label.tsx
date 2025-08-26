export default function Label({
  htmlFor,
  className,
  children,
}: {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </label>
  );
}
