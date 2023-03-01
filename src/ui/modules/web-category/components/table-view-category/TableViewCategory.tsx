import React, { useState, useEffect } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { useWebCategory } from '~/src/adapters/appService/webCategory.service';
import { Category } from '~/src/domain/category';
import { columnTableCategory } from '~/src/ui/modules/web-category/components/table-view-category/props';
import Loading from '~/src/ui/shared/loading';
import BaseTable from '~/src/ui/shared/tables';

function TableViewArticles() {
  const navigate = useNavigate();
  const { getAllWebCategories } = useWebCategory();

  const [listCategories, setListCategories] = useState<Category[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const type = 1;
  const handleGetDataTable = () => {
    getAllWebCategories().then((res) => {
      setListCategories(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (type) {
      handleGetDataTable();
    }
  }, [type]);

  const columnTableCategoryProps: any = [
    ...columnTableCategory,
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
                  `/admin/web-category/update?${createSearchParams({
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
            Tìm thấy {listCategories?.length} categories{' '}
          </h6>
          <BaseTable
            idKey="viewArticle"
            columns={columnTableCategoryProps}
            data={{ items: listCategories }}
            paginationProps={{
              defaultPageSize: 10,
              total: listCategories?.length,
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

export default TableViewArticles;
