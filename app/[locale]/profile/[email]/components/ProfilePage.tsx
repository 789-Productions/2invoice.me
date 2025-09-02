"use client";

import { user, client, invoice } from "@/lib/generated/prisma/wasm";
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
  user: user | null;
  clients: client[];
  viewingSelf: boolean;
  clientInvoices: { [key: string]: invoice[] };
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
