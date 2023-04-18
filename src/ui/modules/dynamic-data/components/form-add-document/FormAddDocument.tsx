import { Input, Form } from 'antd';

import Loading from '~/src/ui/shared/loading';

function FormAddDocument({ formCreateDocument, loading, onFinishCreateDocument, keys }) {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form form={formCreateDocument} name="form_item_document" onFinish={onFinishCreateDocument} labelCol={{ span: 8 }}
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

export default FormAddDocument;
