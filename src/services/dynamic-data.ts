import { generateUrlByService } from './';
import { fetchWithBuildifyToken } from './config';

export type Collection = {
  id: number;
  name: string;
  dataKeys: [string];
  dataTypes: [number];
  projectId: string;
};

export type Document = {
  id: number;
  data: Record<string, any>;
  collectionId: number;
};
export enum DatabaseSystem {
  UNKNOWN = 0,
  MYSQL = 1,
  POSTGRES = 2,
  SQLSERVER = 3,
  SQLITE = 4,
}

const SERVICE_NAME = 'dynamic-data-service';

const getCollection = (id: string) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'collection'), 'GET', {
    id,
  });
};

const getDynamicData = (projectId: string) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'collection/list'), 'GET', { projectId });
};

const getCollectionMap = (projectId: string) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'collection/map'), 'GET', { projectId });
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

const getScript = (projectId: string, databaseSystem: DatabaseSystem) => {
  return fetchWithBuildifyToken(generateUrlByService(SERVICE_NAME, 'database/script'), 'GET', {
    projectId,
    databaseSystem,
  });
};

const dynamicDataService = {
  getCollection,
  getCollectionMap,
  getDynamicData,
  addCollection,
  updateCollection,
  deleteCollection,
  getDocument,
  getDocumentList,
  addDocument,
  updateDocument,
  deleteDocument,
  getScript,
};
export default dynamicDataService;
