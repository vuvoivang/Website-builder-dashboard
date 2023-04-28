import { generateUrlByService } from './';
import { fetchWithBuildifyToken } from './config';

const SERVICE_NAME = 'user-service';

const signIn = (data: { username: string; password: string }) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'sign-in'), 'POST', data);
};

const signUp = (data: { username: string; password: string; fullName: string; email?: string }) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'sign-up'), 'POST', data);
};

const getInfo = () => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'user'), 'GET');
};

const updateUser = (data: { password: string; fullName: string; email: string }) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'user'), 'PUT', data);
};

const signOut = () => {
  // remove token
  return localStorage.removeItem('buildify-token');
};

const userService = {
  signIn,
  signUp,
  getInfo,
  updateUser,
  signOut,
};
export default userService;
