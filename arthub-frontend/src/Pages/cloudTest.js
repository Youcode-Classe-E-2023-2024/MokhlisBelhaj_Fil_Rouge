import React, { useState } from 'react';
import axios from 'axios';

function FileUploadSingle() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

  const cloudName = 'dgnes9vrh'; 
  const uploadPreset = 'Arthub'; 
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  axios
    .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload `, formData)
    .then((response) => {
      console.log('UPLOAD COMPLETE:', response.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

return (
  <div>
    <input type="file" onChange={handleFileChange} />
    <div>{file && `${file.name} - ${file.type}`}</div>
    <button onClick={handleUploadClick}>Upload</button>
  </div>
);
}

export default FileUploadSingle;
