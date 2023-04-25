import { Tabs, Button } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MOCK_COLLECTIONS, MOCK_DOCUMENTS } from '~/src/mock/dynamic-data';
import { mappingDocumentsToCollections } from '~/src/utils';
import './DynamicData.less';
import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Modal, Form } from 'antd';
import FormAddCollection from '../../components/form-add-collection/FormAddCollection';
import FormAddDocument from '../../components/form-add-document/FormAddDocument';
import TabCollection from '../../components/tab-collection/TabCollection';
import dynamicDataService from '~/src/services/dynamic-data';

const renderTitle = (title: string) => <span>{title}</span>;


const renderTabsCollectionsAndDocuments = (collections, setOpenModalCreateDocument) => {
  return collections.map((collection, idx) => {
    return {
      label: collection.name,
      key: collection.name,
      children: <TabCollection key={idx} {...collection} setOpenModalCreateDocument={setOpenModalCreateDocument} />
    };
  });
};

function DynamicData() {
  const [openModalCreateCollection, setOpenModalCreateCollection] = useState(false);
  const [openModalCreateDocument, setOpenModalCreateDocument] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [activeCollectionName, setActiveCollectionName] = useState(
    MOCK_COLLECTIONS[0].name
  );
  const [valueSearchCollection, setValueSearchCollection] = useState('');

  const [collections, setCollections] = useState(MOCK_COLLECTIONS);
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);

  const refSearchCollection = useRef();

  const formCreateCollection = Form.useForm()[0];
  const formCreateDocument = Form.useForm()[0];

  const currentCollection = collections.find((collection) => collection.name === activeCollectionName);

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

  const listItemTabs = useMemo(() => renderTabsCollectionsAndDocuments(
    mappingDocumentsToCollections(collections, documents), setOpenModalCreateDocument
  ), [collections, documents]);

  const collectionOptions = collections.map((collection) => {
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

  const handleOnTabClick = function (key: string, event) {
    setActiveCollectionName(key);
  };


  const handleOkModalCreateCollection = () => {
    formCreateCollection.submit();
  }
  const handleCancelModalCreateCollection = () => {
    setOpenModalCreateCollection(false);
  }

  const onFinishCreateCollection = async (values: any) => {
    console.log('Received values of collection form:', values);
    setConfirmLoading(true);
    // call api
    try {
      dynamicDataService.addCollection(values).then((resp: any) => {
        if (resp.id) {
          alert('Create Collection Successfully'); setCollections(collections => [...collections, {
            ...values,
            id: resp.id,
          }])
        };
      });
    } catch (err) {
      console.log('Err add collection', err);
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
    console.log('Received values of document form:', values);
    const data = {
      ...values,
      collectionId: currentCollection.id,
    }
    // call api
    setConfirmLoading(true);
    try {
      dynamicDataService.addDocument(data).then((resp: any) => {
        if (resp.id) {
          alert('Create Document Successfully');
          setDocuments(documents => [...documents, {
            ...data,
            id: resp.id,
          }])
        };
      });
    } catch (err) {
      console.log('Err add document', err);
    }
    setConfirmLoading(false);
    setOpenModalCreateDocument(false);
  };

  useEffect(() => {
    setConfirmLoading(true);
    // call api
    try {
      dynamicDataService.getDynamicData().then((resp: any) => {
        // if(resp.collections){
        //   setCollections(resp.collections);
        // }
        // if(resp.documents){
        //   setCollections(resp.documents);
        // }
      });
    } catch (err) {
      console.log('Err get dynamic data', err);
    }
    setConfirmLoading(false);
  }, [])

  return (
    <div className='dynamic-data-container'>
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
        <FormAddDocument keys={currentCollection.dataKeys} formCreateDocument={formCreateDocument} loading={confirmLoading} onFinishCreateDocument={onFinishCreateDocument} />
      </Modal>
    </div>
  );
}

export default DynamicData;
