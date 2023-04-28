import { generateUrlByService } from './';
import { fetchWithBuildifyToken } from './config';

const SERVICE_NAME = 'file-mgt-service';

const uploadImage = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'upload/image'), 'POST', formData, {
    'Content-Type': 'multipart/form-data',
  });
};

const fileMgtService = {
  uploadImage,
};
export default fileMgtService;
