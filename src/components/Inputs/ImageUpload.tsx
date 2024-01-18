/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { TbPhotoPlus } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

interface ImageUploadProps {
  values: string[];
  onChange: (values: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ values, onChange }) => {
  const cloudinary_uri = import.meta.env.VITE_CLOUDINARY_BASE_URI;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>();
  const [isUploadingImages, setIsUploadingImages] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input?.files) {
      const filesArray = Array.from(input.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
      setPreviewImages((prevImages = []) => [
        ...prevImages,
        ...filesArray.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemovePreviewImage = (indexToRemove: number) => {
    setImages((prevImages = []) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(indexToRemove, 1);
      return updatedImages;
    });

    setPreviewImages((prevImages = []) => {
      const updatedPreviewImages = [...prevImages];
      updatedPreviewImages.splice(indexToRemove, 1);
      return updatedPreviewImages;
    });
  };

  const handleUpload = async () => {
    setIsUploadingImages(true);

    try {
      const imagesUrl = await Promise.all(
        Array.from(images).map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("cloud_name", cloud_name);
          formData.append("upload_preset", upload_preset);

          const response = await axios.post(cloudinary_uri, formData);

          return response.data.secure_url;
        })
      );

      onChange(imagesUrl);

      setIsUploadingImages(false);
      setPreviewImages([]);
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong! Please try again.");
      setIsUploadingImages(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <label
        htmlFor="uploadImages"
        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
      >
        <input
          id="uploadImages"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleImageChange}
          multiple
        />
        <TbPhotoPlus size={30} />
        <h3 className="font-semibold text-md">Click to upload</h3>
      </label>

      {previewImages && previewImages.length > 0 && (
        <>
          <>
            <h3 className="font-semibold text-md mb-2">Preview Images:</h3>
            <div className="flex gap-4 overflow-x-auto">
              {previewImages?.map((previewImage, index) => (
                <div className="relative" key={index}>
                  <div
                    className="absolute right-1 top-1 bg-white p-1 rounded-full shadow-lg cursor-pointer"
                    onClick={() => handleRemovePreviewImage(index)}
                  >
                    <IoClose size={20} />
                  </div>
                  <img
                    src={previewImage}
                    className="object-cover rounded-lg bg-center w-32 h-60"
                  />
                </div>
              ))}
            </div>
          </>
          <button
            className="flex items-center justify-center gap-2 border border-white bg-black transition hover:bg-neutral-700 rounded-lg text-white p-2 px-4"
            disabled={isUploadingImages}
            onClick={handleUpload}
          >
            {isUploadingImages && (
              <BiLoaderAlt size={16} className="animate-spin" />
            )}
            Save
          </button>
        </>
      )}

      {values.length > 0 && (
        <>
          <h3 className="font-semibold text-md mb-2">Uploaded Images:</h3>
          <div className="flex gap-4 overflow-x-auto">
            {values?.map((image, index) => (
              <div className="relative" key={index}>
                <img
                  src={image}
                  className="object-cover rounded-lg bg-center w-32 h-60"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
