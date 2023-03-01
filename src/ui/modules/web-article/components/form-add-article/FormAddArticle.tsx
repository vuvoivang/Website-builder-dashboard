import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, Space } from 'antd';

import { useWebArticle } from '~/src/adapters/appService/webArticle.service';
import { useWebCategory } from '~/src/adapters/appService/webCategory.service';
import { Category } from '~/src/domain/category';
import { metaFormAddArticle } from '~/src/ui/modules/web-article/components/form-add-article/props';
import FormBuilder from '~/src/ui/shared/forms';
import Loading from '~/src/ui/shared/loading';

function FormAddArticle({ id }) {
  const [form] = Form.useForm();
  const { getDetailWebArticle, createWebArticle, updateWebArticle } =
    useWebArticle();
  const { getAllWebCategories } = useWebCategory();

  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSubmit = useCallback((values) => {
    setLoading(true);
    const dataSubmit = {
      ...values,
    };
    if (id) {
      dataSubmit.id = id;
      updateWebArticle(dataSubmit).then((res) => {
        setLoading(false);
      });
    } else {
      createWebArticle(dataSubmit).then((res) => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    const handleGetMetaData = async () => {
      const categoryData = await getAllWebCategories();
      setCategories(categoryData);
      if (id) {
        const detailArticle = await getDetailWebArticle(id);
        form.setFieldsValue(detailArticle);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    handleGetMetaData();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form form={form} onFinish={handleSubmit} className="site-page-content">
          <FormBuilder meta={metaFormAddArticle({ categories })} />
          <Form.Item wrapperCol={{ offset: 2, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Lưu thông tin
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default FormAddArticle;
