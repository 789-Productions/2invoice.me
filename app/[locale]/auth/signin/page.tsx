"use client";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "./actions";
import { useParams } from "next/navigation";
import { Header } from "@/app/components/ui/Headers";
import Label from "@/app/components/ui/Label";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function SignInPage() {
  const [response, dispatch] = useFormState(authenticate, undefined);
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  return (
    <main>
      <Header>Sign in</Header>
      <form action={dispatch} className="flex flex-col gap-4 mt-2">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="Email" />
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" placeholder="Password" />
        <Input type="hidden" name="locale" value={locale} />
        <LoginButton />
        <p className="text-sm">
          Don't have an account?
          <br />
          <RegisterButton locale={locale} />
        </p>
        {response && (
          <p className="text-red-500 font-bold">{response.message}</p>
        )}
      </form>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  );
}
function RegisterButton({ locale = "en" }: { locale?: string }) {
  return (
    <Button
      type="button"
      onClick={() => (window.location.href = "/" + locale + "/auth/signup")}
    >
      Register
    </Button>
  );
}
