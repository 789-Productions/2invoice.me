"use client";

import { User, Client, Invoice } from "@/lib/generated/prisma/wasm";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import EditProfileComponent from "./EditProfile";
import ClientList from "@/app/[locale]/components/ClientList";

const ProfilePage = ({
  user,
  clients,
  viewingSelf,
  clientInvoices,
}: {
  user: User | null;
  clients: Client[];
  viewingSelf: boolean;
  clientInvoices: { [key: string]: Invoice[] };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing && <EditProfileComponent setIsEditing={setIsEditing} />}
      <ProfileInfo
        user={user}
        viewingSelf={viewingSelf}
        setIsEditing={setIsEditing}
      />

      <ClientList clients={clients} clientInvoices={clientInvoices} />
    </div>
  );
};

export default ProfilePage;
