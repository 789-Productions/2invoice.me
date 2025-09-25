"use client";
import { useParams, useRouter } from "next/navigation";
export default function HomeLocale() {
  const { locale } = useParams();
  const router = useRouter();
  return (
    // Main container to center the content on the page
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8 dark:bg-slate-900">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
          Welcome!
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Go to the{" "}
          <button
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={() => router.push(`/${locale}/dashboard`)}
          >
            Dashboard
          </button>{" "}
          to try the demo.
        </p>
      </div>
    </main>
  );
}
