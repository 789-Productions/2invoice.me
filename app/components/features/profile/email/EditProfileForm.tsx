import { editProfileAction } from "@/app/[locale]/profile/[email]/actions";
import Label from "@/app/components/ui/Label";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Image from "next/image";

const EditProfileForm = ({
  previewURL,
  setPreviewURL,
}: {
  previewURL: string | null;
  setPreviewURL: (url: string | null) => void;
}) => {
  const handleSubmit = async (formData: FormData) => {
    await editProfileAction({}, formData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("File uploaded:", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form action={handleSubmit} className="flex flex-col gap-4 mt-4">
      <input
        name="currentPath"
        type="hidden"
        value={window.location.pathname}
      />
      <Label htmlFor="name">Change Name</Label>
      <Input type="text" name="name" placeholder="Enter your name" />
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
          name="imageUpload"
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

export default EditProfileForm;
