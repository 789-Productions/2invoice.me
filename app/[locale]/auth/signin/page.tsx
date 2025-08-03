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
      <h1>Sign in</h1>
      <form
        action={dispatch}
        style={{ display: "grid", gap: 8, maxWidth: 320 }}
      >
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <input type="hidden" name="locale" value={locale} />
        <LoginButton />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}
