import React, { useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DisplayComponent from './components/DisplayComponent';
import AnimationComponent from './components/AnimationComponent';

function App() {
  const [files, setFiles] = useState([]);
  const [sizes, setSizes] = useState({ text: 0, image: 0 });

  const handleUpload = (newFiles, newSizes) => {
    setFiles(newFiles);
    setSizes(newSizes);
  };

  return (
    <div className="App">
      <UploadComponent onUpload={handleUpload} />
      <AnimationComponent>
        <DisplayComponent files={files} sizes={sizes} />
      </AnimationComponent>
    </div>
  );
}

export default App;