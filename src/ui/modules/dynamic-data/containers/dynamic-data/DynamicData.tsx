import { Tabs, Button, message, Select, Empty } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MOCK_COLLECTIONS, MOCK_DOCUMENTS } from '~/src/mock/dynamic-data';
import { errorMsg, mappingDocumentsToCollections, successMsg } from '~/src/utils';
import './DynamicData.less';
import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Modal, Form } from 'antd';
import FormAddCollection from '../../components/form-add-collection/FormAddCollection';
import FormAddDocument from '../../components/form-add-document/FormAddDocument';
import TabCollection from '../../components/tab-collection/TabCollection';
import dynamicDataService from '~/src/services/dynamic-data';
import FormEditDocument from '../../components/form-edit-document/FormEditDocument';
import { DYNAMIC_DATA_TYPE } from '~/src/constant';
import { useSearchParams } from 'react-router-dom';
import userService from '~/src/services/user';

const renderTitle = (title: string) => <span>{title}</span>;


const renderTabsCollectionsAndDocuments = (collections, setOpenModalCreateDocument, setOpenModalDeleteCollection, handleDeleteDocument, handleEditDocument) => {
  return collections?.map((collection, idx) => {
    return {
      label: collection.name,
      key: collection.name,
      children: <TabCollection key={idx} {...collection} setOpenModalCreateDocument={setOpenModalCreateDocument}
        setOpenModalDeleteCollection={setOpenModalDeleteCollection} handleDeleteDocument={handleDeleteDocument} handleEditDocument={handleEditDocument} />
    };
  });
};

function DynamicData() {
  const [openModalCreateCollection, setOpenModalCreateCollection] = useState(false);
  const [openModalCreateDocument, setOpenModalCreateDocument] = useState(false);
  const [openModalEditDocument, setOpenModalEditDocument] = useState(false);
  const [openModalDeleteCollection, setOpenModalDeleteCollection] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);


  const [valueSearchCollection, setValueSearchCollection] = useState('');

  const [collections, setCollections] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeCollectionName, setActiveCollectionName] = useState<string>();
  const [projects, setProjects] = useState([]);


  const [editingDocument, setEditingDocument] = useState();

  const refSearchCollection = useRef();

  const formCreateCollection = Form.useForm()[0];
  const formCreateDocument = Form.useForm()[0];
  const formEditDocument = Form.useForm()[0];


  const currentCollection = collections?.find((collection) => collection.name === activeCollectionName);

  const [searchParams, setSearchParams] = useSearchParams();
  const projectIdFromQueryParam = searchParams.get('project_id') || "";
  const [currentProjectId, setCurrentProjectId] = useState<string>();

  const renderTabBar = (props, DefaultTabBar) => {
    return (
      <div className='custom-tab-bar'>

        <Button onClick={() => setOpenModalCreateCollection(true)}><PlusOutlined />Create Collection</Button>
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          className='collection-autocomplete'
          dropdownMatchSelectWidth={500}
          style={{ width: 250 }}
          options={collectionOptions}
          filterOption
          onSelect={handleOnSelectOption}
          value={valueSearchCollection}
          onChange={(value) => setValueSearchCollection(value)}
          ref={refSearchCollection}
        >
          <Input.Search size="middle" placeholder="Find collection..." />
        </AutoComplete>

        <DefaultTabBar
          {...props}
          style={{
            top: 20,
            width: '100%',
          }}
        />
      </div>
    );
  };
  const handleDeleteDocument = (documentId) => {
    try {
      dynamicDataService.deleteDocument(documentId).then((resp: any) => {
        if (!resp.msg) {
          successMsg('Delete Document Successfully!'); setDocuments(documents => documents.filter(doc => doc.id !== documentId));
        };
      });
    } catch (err) {
      console.log('Err delete document', err);
    }
  }

  const handleEditDocument = (document) => {
    try {
      setEditingDocument(document);
      setOpenModalEditDocument(true);
    } catch (err) {
      console.log('Err edit collection', err);
    }
  }

  const listItemTabs = useMemo(() => renderTabsCollectionsAndDocuments(
    mappingDocumentsToCollections(collections, documents), setOpenModalCreateDocument, setOpenModalDeleteCollection,
    handleDeleteDocument,
    handleEditDocument,
  ), [collections, documents]);

  const collectionOptions = collections?.map((collection) => {
    return {
      label: renderTitle(collection.name),
      value: collection.name,
    };
  });

  const handleOnSelectOption = (value) => {
    setActiveCollectionName(value);
    setValueSearchCollection('');
    if (refSearchCollection?.current) (refSearchCollection.current as any)?.blur();
  };

  const handleOnTabClick = function (key: string) {
    setActiveCollectionName(key);
  };

  const handleOkModalCreateCollection = () => {
    formCreateCollection.submit();
  }
  const handleCancelModalCreateCollection = () => {
    setOpenModalCreateCollection(false);
  }

  const onFinishCreateCollection = async (values: any) => {
    setConfirmLoading(true);
    const data = {
      name: values.name,
      dataKeys: values.fields,
      dataTypes: values.fields.map((_) => (DYNAMIC_DATA_TYPE.STRING)),
      projectId: currentProjectId,
    }
    // call api
    try {
      dynamicDataService.addCollection(data).then((resp: any) => {
        if (resp.id) {
          successMsg('Create Collection Successfully!');
          setCollections(collections => [...collections, {
            ...data,
            id: resp.id,
          }])
          setActiveCollectionName(data.name);
        } else errorMsg('Create Collection Failed!');
      });
    } catch (err) {
      console.log('Err add collection', err);
      errorMsg('Create Collection Failed!');
    }
    setConfirmLoading(false);
    setOpenModalCreateCollection(false);
  };

  const handleOkModalCreateDocument = () => {
    formCreateDocument.submit();
  }
  const handleCancelModalCreateDocument = () => {
    setOpenModalCreateDocument(false);
  }
  const onFinishCreateDocument = async (values: any) => {
    const data = {
      data: { ...values },
      collectionId: currentCollection.id,
    }
    // call api
    setConfirmLoading(true);
    try {
      dynamicDataService.addDocument(data).then((resp: any) => {
        if (resp.id) {
          successMsg('Create Document Successfully!');
          setDocuments(documents => [...documents, {
            ...data,
            id: resp.id,
          }])
        } else errorMsg('Create Document Failed!');
      });
    } catch (err) {
      console.log('Err add document', err); errorMsg('Create Document Failed!');
    }
    setConfirmLoading(false);
    setOpenModalCreateDocument(false);
  };


  const handleOkModalEditDocument = () => {
    formEditDocument.submit();
  }
  const handleCancelModalEditDocument = () => {
    setOpenModalEditDocument(false);
    setEditingDocument(null);
  }
  const onFinishEditDocument = async (values: any) => {
    const data = {
      id: (editingDocument as any)?.id,
      data: { ...values },
      collectionId: currentCollection.id,
    }
    // call api
    setConfirmLoading(true);
    try {
      dynamicDataService.updateDocument(data).then((resp: any) => {
        if (!resp.msg) {
          successMsg('Update Document Successfully!');
          const newDocuments = [...documents];
          newDocuments.splice(newDocuments.findIndex(doc => doc.id === data.id), 1, data);
          setDocuments(newDocuments);
        } else errorMsg('Update Document Failed!');
      });
    } catch (err) {
      console.log('Err add document', err);
      errorMsg('Update Document Failed!');
    } finally {
      setEditingDocument(null);
      setOpenModalEditDocument(false);
    }
    setConfirmLoading(false);
    setOpenModalCreateDocument(false);
  };

  const handleOkDeleteCollection = () => {
    setConfirmLoading(true);
    try {
      dynamicDataService.deleteCollection(currentCollection.id).then((resp: any) => {
        if (!resp.msg) {
          successMsg('Delete Collection Successfully!');
          setCollections(collections => collections.filter(col => col.id !== currentCollection.id));
        } else errorMsg('Delete Document Failed!');
      });
    } catch (err) {
      console.log('Err delete document', err); errorMsg('Delete Document Failed!');
    }
    setConfirmLoading(false);
    setOpenModalDeleteCollection(false);
    setActiveCollectionName(collections?.[0]?.name);

  };

  const handleCancelDeleteCollection = () => {
    setOpenModalDeleteCollection(false);
  };

  useEffect(() => {
    setConfirmLoading(true);
    // dynamicDataService.deleteCollection('7');
    // call api
    try {
      if (!currentProjectId) return;
      dynamicDataService.getDynamicData(currentProjectId).then((resp: any) => {
        if (resp.collections) {
          setCollections(resp.collections);
          setActiveCollectionName(resp.collections?.[0]?.name);
        }
        if (resp.documents) {
          setDocuments(resp.documents);
        }
      });
    } catch (err) {
      console.log('Err get dynamic data', err);
    }
    setConfirmLoading(false);
  }, [currentProjectId]);


  useEffect(() => {
    setConfirmLoading(true);
    // dynamicDataService.deleteCollection('7');
    // call api
    try {
      userService.getListProject().then((resp: any) => {
        if (resp.projects) {
          setProjects(resp.projects);
          if (!projectIdFromQueryParam) setSearchParams({
            project_id: resp.projects[0]?.id
          });
        }
      });
    } catch (err) {
      console.log('Err get list project', err);
    }
    setConfirmLoading(false);
  }, []);

  useEffect(() => {
    setCurrentProjectId(projectIdFromQueryParam || projects[0]?.id);
  }, [projectIdFromQueryParam])

  const onChangeSelectProject = (value: string) => {
    setCurrentProjectId(value);
  };

  // const currentProject = projects.find(project => project.id === currentProjectId);
  const getOptionsProjects = projects.map(project => ({
    value: project?.id,
    label: project?.name,
  }))
  return (
    <div className='dynamic-data-container'>
      <div className='select-project-container'>
        <h4>Project: </h4>
        <Select
          showSearch
          placeholder="Select current project"
          optionFilterProp="children"
          onChange={onChangeSelectProject}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          value={currentProjectId}
          notFoundContent={<div>No results</div>}
          options={getOptionsProjects}
        />
      </div>
      <Tabs
        activeKey={activeCollectionName}
        renderTabBar={renderTabBar}
        tabPosition="left"
        items={listItemTabs}
        onTabClick={handleOnTabClick}
      />

      <Modal
        title="Create a new collection"
        open={openModalCreateCollection}
        onOk={handleOkModalCreateCollection}
        confirmLoading={confirmLoading}
        onCancel={handleCancelModalCreateCollection}
        cancelText="Cancel"
        okText="Create"
        width={800}
      >
        <FormAddCollection formCreateCollection={formCreateCollection} loading={confirmLoading} onFinishCreateCollection={onFinishCreateCollection} collections={collections} />
      </Modal>

      <Modal
        title="Create a new document"
        open={openModalCreateDocument}
        onOk={handleOkModalCreateDocument}
        confirmLoading={confirmLoading}
        onCancel={handleCancelModalCreateDocument}
        cancelText="Cancel"
        okText="Create"
        width={800}
      >
        <h4>Fill all fields' values to create a new document of this collection</h4>
        <FormAddDocument keys={currentCollection?.dataKeys} formCreateDocument={formCreateDocument} loading={confirmLoading} onFinishCreateDocument={onFinishCreateDocument} />
      </Modal>

      <Modal
        title="Update document"
        open={openModalEditDocument}
        onOk={handleOkModalEditDocument}
        confirmLoading={confirmLoading}
        onCancel={handleCancelModalEditDocument}
        cancelText="Cancel"
        okText="Update"
        width={800}
      >
        <h4>Fill all fields' values to update this document</h4>
        <FormEditDocument keys={currentCollection?.dataKeys} formEditDocument={formEditDocument} loading={confirmLoading} onFinishEditDocument={onFinishEditDocument} defaultValues={editingDocument && (editingDocument as any)?.data} />
      </Modal>

      <Modal
        title="Delete this collection permanently?"
        open={openModalDeleteCollection}
        onOk={handleOkDeleteCollection}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDeleteCollection}
        cancelText="Cancel"
        okText="Delete"
      >
        <p>This is a destructive operation. Are you sure to delete this collection and all its documents?</p>
      </Modal>
    </div>
  );
}

export default DynamicData;
