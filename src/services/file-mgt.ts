import { fetchWithBuildifyToken } from './config';

const uploadImage = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  return fetchWithBuildifyToken(
    'file-mgt-service/upload/image',
    'POST',
    formData,
    {
      'Content-Type': 'multipart/form-data',
    }
  );
};

const fileMgtService = {
  uploadImage,
};
export default fileMgtService;
