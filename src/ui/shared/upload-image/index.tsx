import UploadButton from '~/src/ui/shared/upload';

import fileMgtService from '~/src/services/file-mgt';
import { useEffect, useState } from 'react';


export const UploadImage = ({ form, fieldName, msg, maxSize, disabled, value = "" }) => {
  const [uploadedImage, setUploadedImage] = useState();
  const handleUploadImage = async (file: File) => {
    if (file.size > maxSize) {
      form.setFields([
        {
          name: fieldName,
          errors: [msg],
        }
      ])
      return;
    }
    fileMgtService.uploadImage(file).then((res) => {
      form.setFieldValue(fieldName, res?.url);
      setUploadedImage(res?.url);
    });

  };
  useEffect(() => {
    if(disabled) {
      console.log("disabled");
      setUploadedImage(undefined)
    };
  }, [disabled]);
  return (
    <UploadButton
      disabled={disabled}
      id={`upload-${fieldName}`}
      actionUpload={handleUploadImage}
      value={value || (uploadedImage || form.getFieldValue(fieldName))}
    />
  );
};

export default UploadImage;
