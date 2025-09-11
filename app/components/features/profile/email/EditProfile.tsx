// overlay to quickly edit profile information
import { Header } from "@/app/components/ui/Headers";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

const EditProfileComponent = ({
  setIsEditing,
}: {
  setIsEditing: (isEditing: boolean) => void;
}) => {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const isExpanded = previewURL !== null;

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
        <EditProfileForm
          previewURL={previewURL}
          setPreviewURL={setPreviewURL}
        />
      </div>
    </div>
  );
};
export default EditProfileComponent;
