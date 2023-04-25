import { Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Input, Form } from 'antd';

import Loading from '~/src/ui/shared/loading';

function FormAddCollection({ formCreateCollection, loading, onFinishCreateCollection, collections }) {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form form={formCreateCollection} name="form_item_collection" onFinish={onFinishCreateCollection} labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }} validateTrigger={['onChange', 'onBlur']} autoComplete="off">
          <Form.Item name="name" key='name' label="Name:" tooltip="Must be unique, distinguish between collection" rules={[{
            required: true, message: "Please fill collection's name"
          }, {
            validator: async (_, value) => {
              if (value && collections.findIndex(item => item.name === value) !== -1) {
                return Promise.reject(new Error("Collection's name has been existed before"));
              }
            },
          }]}>
            <Input />
          </Form.Item>

          <Form.List
            name="fields"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error('At least 1 passengers'));
                  }
                },
              },
            ]}
          >

            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={'Fields'}
                    className={index !== 0 ? 'hidden-form-item-label' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input data's field or delete this.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="Field's name" style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item label={"Fields"} className={fields.length > 0 ? 'hidden-form-item-label' : ''}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '30%' }}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* <Form.Item name="semanticKey" key='semanticKey' tooltip="Choose 1 of fields above" label="Semantic field:" rules={[{
            required: true, message: "Please choose semantic field"
          }, {
            validator: async (_, value) => {
              if (value && formCreateCollection.getFieldValue('fields').indexOf(value) === -1) {
                return Promise.reject(new Error('Field does not exist in fields above'));
              }
            },
          },]}>
            <Input />
          </Form.Item> */}
        </Form>
      )}
    </>
  );
}

export default FormAddCollection;
