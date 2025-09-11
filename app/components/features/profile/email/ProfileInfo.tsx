"use client";

import React from "react";
import { user } from "@/lib/generated/prisma/wasm";
import { LargeHeader, Header } from "@/app/components/ui/Headers";
import Text from "@/app/components/ui/Text";
import Image from "next/image";
import { returnNextReadableImageURL } from "@/lib/parse";

const ProfileInfo = ({
  user,
  viewingSelf,
  setIsEditing,
}: {
  user: user | null;
  viewingSelf: boolean;
  setIsEditing: (isEditing: boolean) => void;
}) => {
  return (
    <div>
      <LargeHeader>Profile Information</LargeHeader>
      {user && (
        <div>
          <div className="flex items-start gap-4 mt-4 mb-4">
            <Image
              className="relative block h-14 w-14 overflow-hidden rounded-full border-2 border-slate-700 "
              src={
                user.image
                  ? returnNextReadableImageURL(user.image)
                  : "/images/avatar.png"
              }
              alt={user.name ? user.name : "User Avatar"}
              width={100}
              height={100}
            />
            <div>
              {user.name ? (
                <Header>
                  {user.name} ({user.email})
                </Header>
              ) : (
                <Header className="italic">{user.email}</Header>
              )}
              <Text>User since: {user.createdAt.toLocaleDateString()}</Text>
            </div>
            <div>
              {viewingSelf && (
                <Image
                  className="relative block h-8 w-8 overflow-hidden rounded-full border-1 opacity-80 border-slate-700 hover:opacity-100 hover:border-slate-500"
                  src={"/images/editIcon_blue.svg"}
                  alt={user.name ? user.name : "User Avatar"}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  width={100}
                  height={100}
                  title="Edit Profile"
                />
              )}
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
