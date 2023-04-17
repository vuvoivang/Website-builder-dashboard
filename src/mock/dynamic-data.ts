import { DYNAMIC_DATA_TYPE } from '../constant';

export const MOCK_COLLECTIONS = [
  {
    id: 1,
    name: 'Product',
    semanticKey: 'name',
    dataKeys: ['name', 'pKey1', 'pKey2', 'pKey3'],
    dataTypes: [
      DYNAMIC_DATA_TYPE.STRING,
      DYNAMIC_DATA_TYPE.STRING,
      DYNAMIC_DATA_TYPE.STRING,
      DYNAMIC_DATA_TYPE.STRING,
    ],
    documents: [1, 2],
  },
  {
    id: 2,
    name: 'Button Text',
    semanticKey: 'name',
    dataKeys: ['name', 'bKey1', 'bKey2', 'bKey3'],
    dataTypes: [
      DYNAMIC_DATA_TYPE.STRING,
      DYNAMIC_DATA_TYPE.STRING,
      DYNAMIC_DATA_TYPE.STRING,
      DYNAMIC_DATA_TYPE.STRING,
    ],
    documents: [1, 2],
  },
];
export const MOCK_DOCUMENTS = [
  {
    id: 1,
    data: {
      name: 'Document 1 Product',
      pKey1: 'Key 1',
      pKey2: 'Key 2',
      pKey3: 'Key 3',
    },
    collectionId: 1,
  },
  {
    id: 2,
    data: {
      name: 'Document 2 Product',
      pKey1: 'Key 1',
      pKey2: 'Key 2',
      pKey3: 'Key 3',
    },
    collectionId: 1,
  },
  {
    id: 1,
    data: {
      name: 'Document 1 Button Text',
      bKey1: 'Key 1',
      bKey2: 'Key 2',
      bKey3: 'Key 3',
    },
    collectionId: 2,
  },
  {
    id: 2,
    data: {
      name: 'Document 2 Button Text',
      bKey1: 'Key 1',
      bKey2: 'Key 2',
      bKey3: 'Key 3',
    },
    collectionId: 2,
  },
];
