"use client";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "./actions";
import { useState, useEffect } from "react";
import { validatePassword } from "../lib/validation";
import { Header } from "@/app/components/ui/Headers";
import Button from "@/app/components/ui/Button";
import Label from "@/app/components/ui/Label";
import Input from "@/app/components/ui/Input";

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
      <Header>Sign up</Header>
      <form action={dispatch} className="flex flex-col gap-4 text-white mt-4">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="Email" />
        <Label htmlFor="password">Password</Label>
        <Input
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
    <Button type="submit" aria-disabled={pending || !valid}>
      {pending ? "Signing up..." : "Sign up"}
    </Button>
  );
}
