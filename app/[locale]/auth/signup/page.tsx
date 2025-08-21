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
      <h1 className="text-white mb-4 bold text-2xl">Sign up</h1>
      <form action={dispatch} className="flex flex-col gap-4 text-white">
        <input
          name="email"
          className="flex-1 border border-white border-opacity-50 bg-transparent"
          placeholder="Email"
        />
        <input
          name="password"
          className="flex-1 border border-white border-opacity-50 bg-transparent"
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
    <button
      className="text-white bg-blue-500 hover:bg-blue-600"
      type="submit"
      aria-disabled={pending || !valid}
    >
      {pending ? "Signing up..." : "Sign up"}
    </button>
  );
}
