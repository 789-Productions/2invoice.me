"use client";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "./actions";
import { useState, useEffect } from "react";
import { validatePassword } from "../lib/validation";

export default function SignUpPage() {
  const [server_msg, dispatch] = useFormState(signUp, undefined);
  const [password, setPassword] = useState("");
  const [passwordErrorMessages, setPasswordErrorMessages] = useState<string[]>(
    []
  );
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  useEffect(() => {
    const errors = validatePassword(password);
    setPasswordErrorMessages(errors);
  }, [password]);
  return (
    <main>
      <h1>Sign up</h1>
      <form
        action={dispatch}
        style={{ display: "grid", gap: 8, maxWidth: 320 }}
      >
        <input name="email" placeholder="Email" />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
        {password.length > 0 && (
          <ul>
            {passwordErrorMessages.map((msg, index) => (
              <li key={index} style={{ color: "red" }}>
                {msg}
              </li>
            ))}
          </ul>
        )}
        {server_msg && <p>{server_msg}</p>}
        <LoginButton
          valid={password.length > 0 && passwordErrorMessages.length === 0}
        />
      </form>
    </main>
  );
}
function LoginButton({ valid = true }: { valid?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending || !valid}>
      {pending ? "Signing up..." : "Sign up"}
    </button>
  );
}
