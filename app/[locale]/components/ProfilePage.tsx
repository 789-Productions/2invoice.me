"use client";

import { User } from "@/lib/generated/prisma/wasm";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import EditProfileComponent from "./EditProfile";

const ProfilePage = ({
  user,
  viewingSelf,
}: {
  user: User | null;
  viewingSelf: boolean;
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
    </div>
  );
};

export default ProfilePage;
