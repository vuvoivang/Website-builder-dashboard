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

const getCollection = (id: string) => {
  return fetchWithBuildifyToken('dynamic-data-service/api/collection', 'GET', {
    id,
  });
};

const getDynamicData = () => {
  return fetchWithBuildifyToken(
    'dynamic-data-service/api/collection/list',
    'GET'
  );
};

const addCollection = (collection: Omit<Collection, 'id'>) => {
  return fetchWithBuildifyToken(
    'dynamic-data-service/api/collection',
    'POST',
    collection
  );
};

const updateCollection = (collection: Collection) => {
  return fetchWithBuildifyToken(
    'dynamic-data-service/api/collection',
    'PUT',
    collection
  );
};
const deleteCollection = (id: string) => {
  return fetchWithBuildifyToken(
    'dynamic-data-service/api/collection',
    'DELETE',
    {
      id,
    }
  );
};

const getDocument = (id: string) => {
  return fetchWithBuildifyToken('dynamic-data-service/api/document', 'GET', {
    id,
  });
};

const getDocumentList = () => {
  return fetchWithBuildifyToken(
    'dynamic-data-service/api/document/list',
    'GET'
  );
};

const addDocument = (document: Omit<Document, 'id'>) => {
  return fetchWithBuildifyToken(
    'dynamic-data-service/api/document',
    'POST',
    document
  );
};

const updateDocument = (document: Document) => {
  return fetchWithBuildifyToken(
    'dynamic-data-service/api/document',
    'PUT',
    document
  );
};
const deleteDocument = (id: string) => {
  return fetchWithBuildifyToken(
    'dynamic-data-service/api/document',
    'DELETE',
    {
      id,
    }
  );
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
