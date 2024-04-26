import React, { useState } from 'react';
import axios from 'axios';


const CloudinaryUpload = ({
  cloudName,
  uploadPreset,
  onUploadSuccess,
  onUploadError,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [mediaData, setMediaData] = useState([]);


  // Allowed image and video MIME types
  const allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
  ];

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData
    );
    return {
      id: response.data.public_id,
      mediaUrl: response.data.secure_url,
      resourceType: response.data.resource_type,
      public_id: response.data.public_id,
    };
  };
  // const deleteFile = async (public_id) => {
   
  
  //   try {
  //     const response = await axios.post('https://api.cloudinary.com/v1_1/dgnes9vrh/destroy', {
  //       public_id: public_id,
  //       timestamp: '173719931',
  //       api_key: '369931638131835',
  //       signature: 'a788d68f86a6f868af'
  //     });
  
  //     console.log('Delete response:', response.data);
  //     // Handle the response accordingly
  //   } catch (error) {
  //     console.error('Error deleting image:', error);
  //     // Handle the error accordingly
  //   }
  // };
  
  
  

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (!files.length) return;

    setIsUploading(true);

    const uploadedFileInfos = [...mediaData]; // Preserve existing files

    try {
      for (const file of files) {
        if (!allowedFileTypes.includes(file.type)) {
          throw new Error('Invalid file type. Only images and videos are allowed.');
        }

        const fileInfo = await uploadFile(file);
        uploadedFileInfos.push(fileInfo);
      }

      setMediaData(uploadedFileInfos);

      if (onUploadSuccess) {
        onUploadSuccess(uploadedFileInfos);
      }
    } catch (error) {
      if (onUploadError) {
        onUploadError(error);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (id) => {

    const updatedMediaData = mediaData.filter(file => file.id !== id);
    setMediaData(updatedMediaData);
  };

  return (
    <div className="max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-700">Upload Files</label>
      <div className="mt-1 flex justify-between items-center">
        <input 
          type="file" 
          onChange={handleFileChange} 
          multiple 
          disabled={isUploading} 
          className="hidden" // Hide the default file input
          id="file-upload" 
        />
        <label 
          htmlFor="file-upload" 
          className={`${
            isUploading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          } text-white px-4 py-2 rounded-md transition duration-300 ease-in-out inline-block cursor-pointer`}
        >
          {isUploading ? 'Uploading...' : 'Choose Files'}
        </label>
       
          
       
      </div>
      {mediaData.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {mediaData.map((file, index) => (
            <div key={index} className="relative">
              <button onClick={() => removeFile(file.id)} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">Remove</button>
              {file.resourceType === 'image' ? (
                <img 
                  src={file.mediaUrl} 
                  alt={`Image ${index}`} 
                  className="max-w-full h-auto rounded-lg"
                />
              ) : (
                <video 
                  src={file.mediaUrl} 
                  controls 
                  className="max-w-full h-auto rounded-lg"
                />
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
