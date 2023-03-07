import React, { useEffect } from 'react';

import { Button, Form, Layout, message, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/src/adapters/appService/auth.service';
import { authSelector } from '~/src/adapters/redux/selectors/auth';
import { metaFormLogin } from '~/src/ui/modules/login/containers/props';
import FormBuilder from '~/src/ui/shared/forms/FormBuilder';

function Login() {
  const { loginByAccount } = useAuth();
  const navigate = useNavigate();
  const { roles, name } = useSelector(authSelector);
  const onFinish = (values: any) => {
    loginByAccount(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (roles && name) {
      navigate('/admin/web-article/list');
    }
  }, []);

  return (
    <Layout className="cms-layout-app cms-layout-app-login">
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab="Login with Google" key="1">
          <Button
            type="primary"
            onClick={() => message.info('Tính năng chưa phát triển')}
          >
            Login with google
          </Button>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Login by account" key="2">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <FormBuilder meta={metaFormLogin} />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Login;
