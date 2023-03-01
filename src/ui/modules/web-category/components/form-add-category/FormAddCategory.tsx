import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, Space } from 'antd';

import { useWebCategory } from '~/src/adapters/appService/webCategory.service';
import { metaFormAddCategory } from '~/src/ui/modules/web-category/components/form-add-category/props';
import FormBuilder from '~/src/ui/shared/forms';
import Loading from '~/src/ui/shared/loading';

function FormAddCategory({ id }) {
  const [form] = Form.useForm();
  const { getDetailWebCategory, createWebCategory, updateWebCategory } =
    useWebCategory();
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmit = useCallback((values) => {
    setLoading(true);
    const dataSubmit = {
      ...values,
    };
    if (id) {
      dataSubmit.id = id;
      updateWebCategory(dataSubmit).then((res) => {
        setLoading(false);
      });
    } else {
      createWebCategory(dataSubmit).then((res) => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (id) {
      getDetailWebCategory(id).then((data) => {
        form.setFieldsValue(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form form={form} onFinish={handleSubmit} className="site-page-content">
          <FormBuilder meta={metaFormAddCategory} />
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

export default FormAddCategory;
