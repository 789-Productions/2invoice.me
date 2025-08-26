// overlay to quickly edit profile information
import { Header } from "@/app/components/Headers";
import { editProfileAction } from "../profile/[email]/actions";
import Label from "@/app/components/Label";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Image from "next/image";
import { useEffect, useState } from "react";

const EditProfileComponent = ({
  setIsEditing,
}: {
  setIsEditing: (isEditing: boolean) => void;
}) => {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const isExpanded = previewURL !== null;
  const EditProfileForm = () => {
    const EditProfile = async (formData: FormData) => {
      await editProfileAction({}, formData);
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewURL(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    return (
      <form action={EditProfile} className="flex flex-col gap-4 mt-4">
        <Label htmlFor="name">Change Name</Label>
        <Input type="text" placeholder="Enter your name" />
        <div>
          <label
            htmlFor="imageUpload"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex justify-between"
          >
            <p>Add Profile Pic</p>
            <Image
              src="/images/plus.svg"
              alt="Add Image"
              className="cursor-pointer rounded-full border-dashed border-2 border-gray-300"
              height={20}
              width={20}
            />
          </label>
          <Input
            type="file"
            id="imageUpload"
            className="sr-only"
            onChange={handleFileUpload}
          />
          {previewURL && (
            <div className="mt-2 flex items-start gap-4">
              <Image
                src={previewURL}
                alt="Profile Preview"
                className="mt-2 rounded-full border-2 border-gray-300"
                height={100}
                width={100}
              />
              <button
                type="button"
                onClick={() => setPreviewURL(null)}
                className="cursor-pointer bg-red-500 w-5 h-5 flex items-center justify-center rounded-full border-2 border-black-500"
              >
                X
              </button>
            </div>
          )}
        </div>
        <Button type="submit">Save</Button>
      </form>
    );
  };

  const handleClose = () => {
    setIsEditing(false);
  };
  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm flex items-center justify-center">
      <div
        className={`bg-slate-800 w-96 p-4 rounded shadow-md border-2 border-gray-700 ${
          isExpanded ? "h-90" : "h-56"
        }`}
      >
        <div className="flex justify-between items-center">
          <Header>Edit Profile</Header>
          <button
            className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <EditProfileForm />
      </div>
    </div>
  );
};
export default EditProfileComponent;
