import React, { useState, useEffect } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { createSearchParams, useNavigate } from 'react-router-dom';


import Loading from '~/src/ui/shared/loading';
import BaseTable from '~/src/ui/shared/tables';

function TableViewDocument() {
  const navigate = useNavigate();

  const [listArticles, setListArticles] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetDataTable = async () => {
    const articleData = await getAllWebArticles();
    const categoryData = await getAllWebCategories();
    articleData.forEach((article) => {
      const category = categoryData.find(
        (cate) => cate.id === article.category
      );
      article.category_name = category?.name;
    });
    setListArticles(articleData);
    setLoading(false);
  };
  useEffect(() => {
    handleGetDataTable();
  }, []);

  const columnTableArticleProps: any = [
    // ...columnTableArticle,
    {
      title: 'Actions',
      dataIndex: 'action',
      width: 100,
      render: (_, record, index) => {
        return (
          <Space size="small">
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              style={{ color: '#0050b3' }}
              onClick={() =>
                navigate(
                  `/admin/web-article/update?${createSearchParams({
                    id: record.id,
                  }).toString()}`
                )
              }
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h6 className="cms-layout-title-medium mt-4">
            Tìm thấy {listArticles?.length} articles
          </h6>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <BaseTable
            idKey="viewArticle"
            columns={columnTableArticleProps}
            data={{ items: listArticles }}
            paginationProps={{
              defaultPageSize: 10,
              total: listArticles?.length,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50'],
              position: ['bottomRight'],
            }}
          />
        </>
      )}
    </>
  );
}

export default TableViewDocument;
