import React, { useState} from 'react';
import FileContext from './FileContext';

export const FileState = (props) => {
  const [isUploading, setIsUploading] = useState(false);

  return <FileContext.Provider value={{ isUploading , setIsUploading}}>
      {props.children}

  </FileContext.Provider>;
};
