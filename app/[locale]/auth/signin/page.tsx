"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) router.push(`/${locale}/dashboard`);
    else setError(res?.error || "Invalid credentials");
  }

  return (
    <main>
      <h1>Sign in</h1>
      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 8, maxWidth: 320 }}
      >
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>Seed the demo user first (see README) or add sign-up.</p>
    </main>
  );
}
