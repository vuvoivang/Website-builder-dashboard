import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import FormAddCollection from '../components/form-add-collection/FormAddCollection';
import TableViewDocument from '../components/table-view-document/TableViewDocument';

function ViewDynamicDataContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          // open pop-up
        }}
      >
        Create section
      </Button>
      <TableViewDocument />
      <FormAddCollection id="" />
    </div>
  );
}

export default ViewDynamicDataContainer;
