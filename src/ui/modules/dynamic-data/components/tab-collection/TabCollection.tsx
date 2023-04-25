import { Button, Tooltip } from 'antd';
import { useState } from 'react';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { getNormalizeStringForSearch } from '~/src/utils';
import dynamicDataService from '~/src/services/dynamic-data';
import { Col, Row } from 'antd';

const { Option } = Select;

const idKey = "id";

const renderFieldsOfDocument = (document) => {
  const specialKeys = [idKey];
  return Object.entries(document)?.map(([key, value]) => {
    return (
      <li key={key}>
        {specialKeys.includes(key) ? <span className='semantic-key'> {key} </span> : key}:<span className='value'> {(value as any)} </span>
      </li>
    );
  });
};


const TabCollection = (props) => {

  const { id, documents, dataKeys, setOpenModalCreateDocument,
    setOpenModalDeleteCollection, handleDeleteDocument, handleEditDocument } = props;
  const [filteredKey, setFilteredKey] = useState(dataKeys?.[0]);
  const [filteredData, setFilteredData] = useState('');


  const filteredDocuments = (filteredKey && filteredData) ? documents.filter((doc) => {
    return getNormalizeStringForSearch(doc.data?.[filteredKey])?.includes(getNormalizeStringForSearch(filteredData));
  }) : documents;

  const selectKeysBefore = (<Select className="select-before" value={filteredKey} onChange={(value) => setFilteredKey(value)}>
    {dataKeys?.map((option) => <Option value={option}>{option}</Option>)}
  </Select>);


  return <>
    <Row>
      <Button style={{ color: "#ff0000", marginRight: 16, fontWeight: 600 }} onClick={() => setOpenModalDeleteCollection(true)}><DeleteOutlined style={{
        fontSize: 16,
      }} />Delete this collection</Button>
      <Button onClick={() => setOpenModalCreateDocument(true)}><PlusOutlined />Insert Document</Button>
    </Row>

    <Input addonBefore={selectKeysBefore} addonAfter={<SearchOutlined className="prevent-pointer-events" />} placeholder="Search by data's field" onChange={(e) => setFilteredData(e.target.value)} value={filteredData} />
    <div className="document-list">
      {filteredDocuments?.map((document) => {
        const { id: documentId, data } = document;
        return (
          <div key={`${id}-${documentId}`} className="document-container">
            <div className="document">
              <ul >
                {renderFieldsOfDocument({ id: documentId, ...data })}
              </ul>
              <div className='icon'>
                <Tooltip placement="bottomLeft" title={"Delete this document"}>
                  <DeleteOutlined onClick={() => handleDeleteDocument(documentId)} style={{
                    color: "#ff0000",
                    fontSize: 18,
                    marginRight: 16
                  }} />
                </Tooltip>
                <Tooltip placement="bottomLeft" title={"Update this document"}>
                  <EditOutlined onClick={() => handleEditDocument(document)} style={{
                    color: "#0968ed",
                    fontSize: 18,
                    marginRight: 12
                  }} />
                </Tooltip>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  </>;

};


export default TabCollection;
