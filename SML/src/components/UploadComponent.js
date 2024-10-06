import React, { useState } from 'react';
import axios from 'axios';

function UploadComponent({ onUpload }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', text);

    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    onUpload(response.data.files, response.data.sizes);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <textarea value={text} onChange={handleTextChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadComponent;