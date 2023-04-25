import { Input, Form } from 'antd';

import Loading from '~/src/ui/shared/loading';

function FormEditDocument({ formEditDocument, loading, onFinishEditDocument, keys, defaultValues }) {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form initialValues={defaultValues} form={formEditDocument} name="form_item_document" onFinish={onFinishEditDocument} labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }} validateTrigger={['onChange', 'onBlur']} autoComplete="off">
          {
            keys.length > 1 && keys.map((item) => <Form.Item name={item} key={item} label={item} rules={[{
              required: true, message: "Please fill this field"
            },
            ]}>
              <Input />
            </Form.Item>)
          }
        </Form>
      )}
    </>
  );
}

export default FormEditDocument;
