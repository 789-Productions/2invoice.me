import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-white">404 - Page Not Found 🤷</h1>
      <p className="mt-2 text-white">
        Oops! The page you are looking for does not exist.
      </p>
      <button className="mt-4 bg-blue-800 text-white hover:bg-blue-600">
        <Link href="/">Go back home</Link>
      </button>
    </div>
  );
}
