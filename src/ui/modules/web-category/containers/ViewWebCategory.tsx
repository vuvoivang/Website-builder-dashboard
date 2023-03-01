import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import TableViewCategory from '~/src/ui/modules/web-category/components/table-view-category/TableViewCategory';

function ViewCategoryContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          navigate(`/admin/web-category/create`);
        }}
      >
        Tạo mới Category
      </Button>
      <TableViewCategory />
    </div>
  );
}

export default ViewCategoryContainer;
