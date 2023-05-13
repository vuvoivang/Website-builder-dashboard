import { generateUrlByService } from './';
import { fetchWithBuildifyToken } from './config';

const SERVICE_NAME = 'user-service';

export type PROJECT = {
  id: string;
  name: string;
  compressString: string;
  createdTime: number;
  updatedTime: number;
  type: string;
};
export enum PROJECT_TYPE {
  LANDING = 'LANDING',
  CMS = 'CMS',
}
export const MAPPING_PROJECT_TYPE_TO_STRING = {
  [PROJECT_TYPE.LANDING]: 'Landing Page',
  [PROJECT_TYPE.CMS]: 'Content Management System',
};


const signIn = (data: { username: string; password: string }) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'sign-in'), 'POST', data);
};

const signUp = (data: { username: string; password: string; fullName: string; email?: string }) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'sign-up'), 'POST', data);
};

const getUserInfo = () => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'user'), 'GET');
};

const updateUser = (data: { password: string; fullName: string; email: string }) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'user'), 'PUT', data);
};

const signOut = () => {
  // remove token
  return localStorage.removeItem('buildify-token');
};

const getProjectById = (data: { id: string }): Promise<PROJECT> => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'project'), 'GET', data) as unknown as Promise<PROJECT>;
};

const getListProject = (): Promise<{ projects: PROJECT[] }> => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'project/list'), 'GET') as unknown as Promise<{ projects: PROJECT[] }>;
};

const createNewProject = (data: { name: string; type: number; createdTime: number, updatedTime: number }) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'project'), 'POST', data);
};

const updateProject = (data: PROJECT) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'project'), 'PUT', data);
};

const deleteProject = (data: { id: string }) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'project'), 'DELETE', data);
};

const userService = {
  signIn,
  signUp,
  getUserInfo,
  updateUser,
  signOut,
  getProjectById,
  getListProject,
  createNewProject,
  updateProject,
  deleteProject,
};
export default userService;
