import { Tabs } from 'antd';
import { useRef, useState } from 'react';
import { MOCK_COLLECTIONS, MOCK_DOCUMENTS } from '~/src/mock/dynamic-data';
import { mappingDocumentsToCollections } from '~/src/utils';
import './DynamicData.less';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';

const renderTitle = (title: string) => (
  <span>
    {title}
  </span>
);


function DynamicData() {
  const [activeCollectionName, setActiveCollectionName] = useState(MOCK_COLLECTIONS[0].name);
  const [valueSearchCollection, setValueSearchCollection] = useState('');

  const [collections, setCollections] = useState(MOCK_COLLECTIONS);
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);

  let refSearchCollection = useRef();

  const renderFieldsOfDocument = (document) => {
    return Object.entries(document).map(([key, value]) => {
      return (
        <li key={key}>
          {key}: {value}
        </li>
      );
    });
  };
  const renderTabsCollectionsAndDocuments = (collections) => {
    return collections.map((collection) => {
      const { id, name, documents } = collection;
      return {
        label: name,
        key: name,
        children: documents.map((document) => {
          const { id: documentId, data } = document;
          return (
            <ul key={`${id}-${documentId}`}>
              {renderFieldsOfDocument({ documentId, ...data })}
            </ul>
          );
        }),
      };
    });
  };
  const listItemTabs = renderTabsCollectionsAndDocuments(
    mappingDocumentsToCollections(collections, documents)
  );
  

  const collectionOptions = collections.map((collection) => {
    return {
      label: renderTitle(collection.name),
      value : collection.name,
    }
  });


  const handleOnSelectOption = (value) => {
    setActiveCollectionName(value);
    setValueSearchCollection('');
    if(refSearchCollection?.current) refSearchCollection.current?.blur();
  }
  
  const renderTabBar = (props, DefaultTabBar) => {
    return (
      <div>
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
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
          }}
        />
      </div>
    );
  };
  const handleOnTabClick = function(key: string, event) {
    setActiveCollectionName(key);
  }

  return (
    <div>
      <Tabs
        activeKey={activeCollectionName}
        renderTabBar={renderTabBar}
        tabPosition="left"
        items={listItemTabs}
        onTabClick={handleOnTabClick}
      />
    </div>
  );
}

export default DynamicData;
