"use client";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "./actions";
import { useParams } from "next/navigation";

export default function SignInPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  return (
    <main>
      <h1 className="text-white mb-4 bold text-2xl">Sign in</h1>
      <form action={dispatch} className="flex flex-col gap-4 text-white">
        <input
          name="email"
          className="flex-1 border border-white border-opacity-50 bg-gray-800 "
          placeholder="Email"
        />
        <input
          name="password"
          className="flex-1 border border-white border-opacity-50 bg-gray-800"
          type="password"
          placeholder="Password"
        />
        <input type="hidden" name="locale" value={locale} />
        <LoginButton />
        <RegisterButton locale={locale} />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="text-white bg-blue-500 hover:bg-blue-600"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}
function RegisterButton({ locale = "en" }: { locale?: string }) {
  return (
    <button
      type="button"
      className="text-white bg-blue-500 hover:bg-blue-600"
      onClick={() => (window.location.href = "/" + locale + "/auth/signup")}
    >
      Register
    </button>
  );
}
