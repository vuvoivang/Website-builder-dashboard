import { Button } from 'antd';
import { useState } from 'react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { getNormalizeStringForSearch } from '~/src/utils';

const { Option } = Select;

const renderFieldsOfDocument = (document) => {
  return Object.entries(document).map(([key, value]) => {
    return (
      <li key={key}>
        {key}: {(value as any)}
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
    <Button onClick={() => setOpenModalCreateDocument(true)}><PlusOutlined />Create Document</Button>
    <Input addonBefore={selectKeysBefore} addonAfter={<SearchOutlined className="prevent-pointer-events" />} placeholder="Search by data's field" onChange={(e) => setFilteredData(e.target.value)} value={filteredData} />
    {filteredDocuments.map((document) => {
      const { id: documentId, data } = document;
      return (
        <ul key={`${id}-${documentId}`}>
          {renderFieldsOfDocument({ documentId, ...data })}
        </ul>
      );
    })}
  </>;

};


export default TabCollection;
