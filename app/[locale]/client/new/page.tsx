"use client";
import { useFormState, useFormStatus } from "react-dom";
import { createClient } from "./actions";
import { useParams } from "next/navigation";

export default function CreateClientPage() {
  const [server_msg, dispatch] = useFormState(createClient, undefined);
  const locale = useParams().locale;
  return (
    <main>
      <h1>Create Client</h1>
      <form
        action={dispatch}
        style={{ display: "grid", gap: 8, maxWidth: 320 }}
      >
        <input name="email" placeholder="example@example.com" />
        <input name="name" placeholder="John Doe" />
        <input name="locale" value={locale} hidden />
        {server_msg && <p>{server_msg}</p>}
        <CreateClientButton />
      </form>
    </main>
  );
}
function CreateClientButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? "Registering client..." : "Create"}
    </button>
  );
}
