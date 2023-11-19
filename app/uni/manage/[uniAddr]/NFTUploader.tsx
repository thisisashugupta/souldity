import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image'
import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_API="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRFYkJlMjI2NjkzNjYzMjdlOEEwOTYzMDFEMUE0NTI2MzcxRGZmQjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMDM3OTUxMTcyOCwibmFtZSI6ImRpZ25pdHktdjIifQ.sY5Hn62PJ72kM11BEqU40Mi_8iXPnf0bxzHDWNkyrYU"

const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API!;

interface NFTUploaderProps {
  stuUri: string;
  setStuUri: React.Dispatch<React.SetStateAction<string>>;
}

const NFTUploader: React.FC<NFTUploaderProps> = ({stuUri, setStuUri}) => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [uploadResult, setUploadResult] = useState<any | null>(null);

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
      alert('Please fill in all fields.');
      return;
    }

    try {
      console.log("image", image);
      
      const result = await storeNFT(image, name, description);
      setUploadResult(result);
      console.log("Upload Result", result);
      console.log(result.url);
      setStuUri(result.url);
    } catch (error) {
      console.error('Error uploading NFT:', error);
      alert('Error uploading NFT. Please try again.');
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
    <div className="flex flex-col items-center justify-center p-12">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex mb-10 md:mb-8">
        <p className="text-3xl font-bold flex w-full justify-center p-5 dark:bg-zinc-800/30">
          NFT Uploader
        </p>
      </div>

      {/* for the streets */}
      <div className="flex flex-col mx-3 mb-6 align-center items-center">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
          <label
            className="text-base text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="image"
          >
            Choose an image:
          </label>
          <input
            className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-base  text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-base text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpload}
        >
          Upload NFT
        </button>
      </div>
      <div className='mt-8 mb-0'>
        {imageUrl && (
          <Image
            src={imageUrl}
            width={300}
            height={300}
            alt="Picture of the author"
          />
        )}
      </div>
      {uploadResult && (
        <div>
          <h2>Upload Result:</h2>
          <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NFTUploader;