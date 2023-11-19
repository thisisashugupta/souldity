import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image'
import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_API="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRFYkJlMjI2NjkzNjYzMjdlOEEwOTYzMDFEMUE0NTI2MzcxRGZmQjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMDM3OTUxMTcyOCwibmFtZSI6ImRpZ25pdHktdjIifQ.sY5Hn62PJ72kM11BEqU40Mi_8iXPnf0bxzHDWNkyrYU"

const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API!;

const NFTUploader: React.FC = () => {
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
    <div className='space-y-4'>
      <h1>NFT Uploader</h1>
      <div>
        <label htmlFor="image">Choose an image:</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={description} onChange={handleDescriptionChange} />
      </div>
      <div>
        <button onClick={handleUpload}>Upload NFT</button>
      </div>
      <div>
        {imageUrl && <Image src={imageUrl} width={500} height={500} alt="Picture of the author" />}
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
