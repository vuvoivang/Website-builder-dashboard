import { generateUrlByService } from './';
import { fetchWithBuildifyToken } from './config';

export type Collection = {
  id: number;
  name: string;
  dataKeys: [string];
  dataTypes: [number];
};

export type Document = {
  id: number;
  data: Record<string, any>;
  collectionId: number;
};

const SERVICE_NAME = 'dynamic-data-service';

const getCollection = (id: string) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'collection'), 'GET', {
    id,
  });
};

const getDynamicData = () => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'collection/list'), 'GET');
};

const addCollection = (collection: Omit<Collection, 'id'>) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'collection'), 'POST', collection);
};

const updateCollection = (collection: Collection) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'collection'), 'PUT', collection);
};
const deleteCollection = (id: string) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'collection'), 'DELETE', {
    id,
  });
};

const getDocument = (id: string) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'document'), 'GET', {
    id,
  });
};

const getDocumentList = () => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'document/list'), 'GET');
};

const addDocument = (document: Omit<Document, 'id'>) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'document'), 'POST', document);
};

const updateDocument = (document: Document) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'document'), 'PUT', document);
};
const deleteDocument = (id: string) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'document'), 'DELETE', {
    id,
  });
};

const dynamicDataService = {
  getCollection,
  getDynamicData,
  addCollection,
  updateCollection,
  deleteCollection,
  getDocument,
  getDocumentList,
  addDocument,
  updateDocument,
  deleteDocument,
};
export default dynamicDataService;
