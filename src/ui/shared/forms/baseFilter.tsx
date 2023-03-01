import React, { useCallback } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

import logger from 'src/utils/logger';

import FormBuilder from './FormBuilder';

type BaseFilterProps = {
  loading: boolean;
  onFilter: (...args) => void;
  normalizeFn?: (...args) => void;
  meta: any;
};

const BaseFilter: React.FC<BaseFilterProps> = (props) => {
  const { loading, onFilter, normalizeFn, meta } = props;
  const [form] = Form.useForm();

  const handleChange = useCallback((values) => {
    const submitFilter = normalizeFn ? normalizeFn(values) : values;
    logger.info('submitFilter', values);
    logger.info('submitFilter', submitFilter);
    onFilter(submitFilter);
  }, []);

  return (
    <Form
      layout="inline"
      style={{ marginBottom: '24px', gap: '12px 0' }}
      initialValues={meta.initialValues}
      form={form}
      onFinish={handleChange}
    >
      <FormBuilder meta={meta} form={form} />
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          icon={<SearchOutlined />}
          loading={loading}
        >
          Tìm kiếm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BaseFilter;
