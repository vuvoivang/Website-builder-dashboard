import { Button } from 'antd';
import { useState } from 'react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { getNormalizeStringForSearch } from '~/src/utils';

const { Option } = Select;

const idKey = "id";

const renderFieldsOfDocument = (document) => {
  const specialKeys = [idKey];
  return Object.entries(document).map(([key, value]) => {
    return (
      <li key={key}>
        {specialKeys.includes(key) ? <span className='semantic-key'> {key} </span> : key}:<span className='value'> {(value as any)} </span>
      </li>
    );
  });
};


const TabCollection = (props) => {

  const { id, documents, dataKeys, setOpenModalCreateDocument } = props;
  const [filteredKey, setFilteredKey] = useState(dataKeys?.[0]);
  const [filteredData, setFilteredData] = useState('');


  const filteredDocuments = (filteredKey && filteredData) ? documents.filter((doc) => {
    return getNormalizeStringForSearch(doc.data?.[filteredKey])?.includes(getNormalizeStringForSearch(filteredData));
  }) : documents;

  const selectKeysBefore = (<Select className="select-before" value={filteredKey} onChange={(value) => setFilteredKey(value)}>
    {dataKeys.map((option) => <Option value={option}>{option}</Option>)}
  </Select>);
  return <>
    <Button onClick={() => setOpenModalCreateDocument(true)}><PlusOutlined />Insert Document</Button>
    <Input addonBefore={selectKeysBefore} addonAfter={<SearchOutlined className="prevent-pointer-events" />} placeholder="Search by data's field" onChange={(e) => setFilteredData(e.target.value)} value={filteredData} />
    <div className="document-list">
      {filteredDocuments.map((document) => {
        const { id: documentId, data } = document;
        return (
          <ul className="document" key={`${id}-${documentId}`}>
            {renderFieldsOfDocument({ id: documentId, ...data })}
          </ul>
        );
      })}
    </div>
  </>;

};


export default TabCollection;
