export default function Input({ ...props }) {
  return (
    <input
      className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
      {...props}
    />
  );
}
