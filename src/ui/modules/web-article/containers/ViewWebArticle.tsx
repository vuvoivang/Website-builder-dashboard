import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import TableViewArticles from '~/src/ui/modules/web-article/components/table-view-article/TableViewArticle';

function ViewArticleContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          navigate(`/admin/web-article/create`);
        }}
      >
        Tạo mới Article
      </Button>
      <TableViewArticles />
    </div>
  );
}

export default ViewArticleContainer;
