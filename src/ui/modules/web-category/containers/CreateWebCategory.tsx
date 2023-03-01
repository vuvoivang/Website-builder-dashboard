import React from 'react';

import { PageHeader } from 'antd';

import useQuery from '~/src/hooks/useQuery';
import FormAddCategory from '~/src/ui/modules/web-category/components/form-add-category/FormAddCategory';

function CreateCategory() {
  const query = useQuery();
  const id: any = query.get('id');
  const renderTitle = () => {
    const preTitle = id ? 'Cập nhật ' : 'Tạo mới ';
    return `${preTitle}Category`;
  };
  return (
    <>
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddCategory id={id} />
    </>
  );
}

export default CreateCategory;
