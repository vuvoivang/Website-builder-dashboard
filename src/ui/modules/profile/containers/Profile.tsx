import React, { useContext, useState } from 'react';
import { Form, Input, Button, Typography, Tooltip } from 'antd';
import { AppContext } from '~/src/ui/shared/layout/LayoutApp';


import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import UploadImage from '~/src/ui/shared/upload-image';
import "./style.less"
import userService from '~/src/services/user';

const { Title } = Typography;

const Profile = () => {

  const [mode, setMode] = useState('view');
  const [form] = Form.useForm();
  const { userInfo } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleEditMode = () => {
    setMode('edit');
  };

  const handleSave = (values) => {
    userService.updateUser(values).then((response) => {
      if(!response.msg){
        window.location.reload();
      }
    })
  };

  return (
    <div className='profile-container'>
      <div className='profile-container_header'>
        <Title level={3}>Account Settings</Title>

        {mode === 'view' && <Tooltip title="Edit"><Button type="primary" shape="circle" icon={<EditOutlined />} onClick={handleEditMode}>
        </Button></Tooltip>}
      </div>
      {mode === 'view' ? (
        <div className='info-zone'>
          <Form.Item>
            <UploadImage
              form={form}
              msg='Image size is exceed 5MB'
              fieldName='avatarUrl'
              maxSize={5 * 1024 * 1024}
              disabled
              value={userInfo.avatarUrl} />
          </Form.Item>
          <div>
            <p className='profile-info-item'><strong>Username:</strong> {userInfo.username}</p>
            <p className='profile-info-item'><strong>Full Name:</strong> {userInfo.fullName}</p>
            <p className='profile-info-item'><strong>Email:</strong> {userInfo.email}</p>
          </div></div>
      ) : (
        <Form form={form} initialValues={userInfo} onFinish={handleSave} layout="vertical">
          <div className='info-zone'>
            <Form.Item name="avatarUrl">
              <UploadImage form={form}
                msg='Image size is exceed 5MB'
                fieldName='avatarUrl'
                maxSize={5 * 1024 * 1024}
                disabled={mode === 'view'} />
            </Form.Item>
            <div>
              <Form.Item
                name="username"
                label="Username"
                tooltip="Username is unique and cannot be modified"
              >
                <Input disabled value={userInfo.username} />
              </Form.Item>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button onClick={() => setMode('view')} style={{ marginLeft: '8px' }}>
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </div></Form>

      )}

    </div>
  );
};

export default Profile;
