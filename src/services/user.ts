import { fetchWithBuildifyToken } from './config';

const signIn = (data: { username: string; password: string }) => {
  return fetchWithBuildifyToken('user-service/api/sign-in', 'POST', data);
};

const signUp = (data: {
  username: string;
  password: string;
  fullName: string;
  email?: string;
}) => {
  return fetchWithBuildifyToken('user-service/api/sign-up', 'POST', data);
};

const getInfo = () => {
  return fetchWithBuildifyToken('user-service/api/user', 'GET');
};

const updateUser = (data: {
  password: string;
  fullName: string;
  email: string;
}) => {
  return fetchWithBuildifyToken('user-service/api/user', 'PUT', data);
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
