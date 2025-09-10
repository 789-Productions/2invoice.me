"use client";
import { useFormState, useFormStatus } from "react-dom";
import { createClient } from "./actions";
import { useParams } from "next/navigation";
import { Header } from "@/app/components/ui/Headers";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Label from "@/app/components/ui/Label";
import Text from "@/app/components/ui/Text";

export default function CreateClientPage() {
  const [server_msg, dispatch] = useFormState(createClient, undefined);
  const { locale } = useParams();
  return (
    <main className="p-48">
      <Header>Create Client</Header>
      <form action={dispatch} className="grid gap-4 max-w-md mt-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder=" example@gmail.com" />
        <Label htmlFor="name">Name</Label>
        <Input name="name" placeholder=" John Doe" />
        <Input name="locale" value={locale} hidden readOnly />
        {server_msg && <Text>{server_msg}</Text>}
        <CreateClientButton />
      </form>
    </main>
  );
}
function CreateClientButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4" type="submit" aria-disabled={pending}>
      {pending ? "Registering client..." : "Create"}
    </Button>
  );
}
