import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { NFTStorage, File } from "nft.storage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";

const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API!;

interface NFTUploaderProps {
  stuUri: string;
  setStuUri: React.Dispatch<React.SetStateAction<string>>;
}

type UploadStateType = { 
  uploading: boolean, 
  uploaded: boolean, 
  uploadButtonText: string 
}

const NFTUploader: React.FC<NFTUploaderProps> = ({ 
  stuUri, 
  setStuUri 
}) => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploadResult, setUploadResult] = useState<any | null>(null);

  const [uploadState, setUploadState] = useState<UploadStateType>({ 
    uploading: false, 
    uploaded: false, 
    uploadButtonText: "Upload NFT" 
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      // Convert File to Data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    if (!image || !name || !description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setUploadState((prev) => ({
        ...prev,
        uploading: true,
        uploadButtonText: "Uploading..."
      }))
      console.log("image", image);

      const result = await storeNFT(image, name, description);
      setUploadResult(result);
      console.log("Upload Result", result);
      console.log(result.url);
      setStuUri(result.url);
    } catch (error) {
      console.error("Error uploading NFT:", error);
      setUploadState((prev) => ({
        uploading: false,
        uploaded: false,
        uploadButtonText: "Error Uploading"
      }))
      alert("Error uploading NFT. Please try again.");
    } finally {
      setUploadState((prev) => ({
        uploading: false,
        uploaded: true,
        uploadButtonText: "Uploaded"
      }))
    }
  };

  const storeNFT = async (image: File, name: string, description: string) => {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const imageFile = await fileFromImage(image);

    return nftstorage.store({
      image: imageFile,
      name,
      description,
    });
  };

  const fileFromImage = async (image: File) => {
    const content = await image.arrayBuffer();
    const type = image.type;
    return new File([content], image.name, { type });
  };



  
  return (
    <div className="flex flex-col items-center">

      {/* Heading */}
      <Heading>Upload Student Image</Heading>

      {/* Image to be uploaded */}
      <div className="m-4">
      {imageUrl && (
        <Image
          className=" rounded-lg"
          src={imageUrl}
          width={300}
          height={300}
          alt="Picture of the author"
        />
      )}
      </div>


      {/* Choose Image */}
      <div className="mb-4">
        <label 
          className="text-base font-bold" 
          htmlFor="image"
        >
          Choose an image:
          <br />
          <Input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploadState.uploading || uploadState.uploaded}
          />
        </label>
      </div>


      {/* Name */}
      <div className="mb-4">
        <label
          className="text-base font-bold"
        >
        Name:
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          disabled={uploadState.uploading || uploadState.uploaded}
        />
        </label>
      </div>


      {/* Description */}
      <div className="mb-4">
        <label
          className="text-base font-bold"
        >
          Description:
        </label>
        <Textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          disabled={uploadState.uploading || uploadState.uploaded}
        />
      </div>


      {/* Upload NFT Button */}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
          onClick={handleUpload}
          disabled={uploadState.uploading || uploadState.uploaded}
        >
          {uploadState.uploadButtonText}
        </button>
      </div>


      {/* Upload Result */}
      {/* {uploadResult && (
        <div>
          <h2>Upload Result:</h2>
          <pre className="text-">
            {JSON.stringify(uploadResult, null, 2)}
          </pre>
        </div>
      )} */}
      {stuUri && 
      <div className="m-3">
        <p className="font-bold">tokenUri: </p>
        <ScrollArea className="p-3 min-w-sm max-w-sm font-mono backdrop-blur rounded-lg border border-black bg-slate-200/50">
          {stuUri}
        </ScrollArea>
      </div>
      }

      </div>
  );
};

export default NFTUploader;