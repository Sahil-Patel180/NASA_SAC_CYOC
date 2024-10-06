import React from 'react';

function DisplayComponent({ files, sizes }) {
  return (
    <div>
      <h3>Uploaded Files</h3>
      <div>
        <h4>Images</h4>
        {files.images && files.images.map((image, index) => (
          <img key={index} src={image} alt={`uploaded-${index}`} />
        ))}
      </div>
      <div>
        <h4>Text</h4>
        {files.text && files.text.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <div>
        <h4>Storage Sizes</h4>
        <p>Text: {sizes.text} bytes</p>
        <p>Images: {sizes.image} bytes</p>
      </div>
    </div>
  );
}

export default DisplayComponent;