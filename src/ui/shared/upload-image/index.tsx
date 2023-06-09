import UploadButton from '~/src/ui/shared/upload';

import fileMgtService from '~/src/services/file-mgt';


export const UploadImage = ( {form, fieldName, msg, maxSize, disabled, value = ""} ) => {
  const handleUploadImage = async (file: File) => {
    if(file.size > maxSize) {
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
    });
    
};
  return (
    <UploadButton
      disabled={disabled}
      id={`upload-${fieldName}`}
      actionUpload={handleUploadImage}
      value={value || form.getFieldValue(fieldName)}
    />
  );
};

export default UploadImage;
