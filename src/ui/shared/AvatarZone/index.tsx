import React from 'react';
import { DownOutlined, UserOutlined, LoginOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Avatar, MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import './style.less';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: <UserOutlined />,
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: <LoginOutlined />,
  },
];



const AvatarZone: React.FC<any> = ({ user, handleLogout }) => {
  const userFullName = user.fullName;
  const navigate = useNavigate();

  const firstLetterName = userFullName.charAt(userFullName.lastIndexOf(' ') + 1);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e;
    if (['dashboard'].includes(key)) { // user page
      window.location.href = `/${key}`;
    } else if (['profile'].includes(key)) { // admin page
      navigate(`/admin/${key}`);
    } else if (key === 'logout') {
      handleLogout();
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  return (
    <Space className='avatar-zone' wrap style={{ marginRight: 48 }}>
      <span className='username'>{userFullName}</span>
      <Dropdown menu={menuProps} placement="bottom">
        <Button>
          <Space>
            <Avatar size={40} >{firstLetterName}</Avatar>
          </Space>
        </Button>
      </Dropdown>
    </Space>
  )
};

export default AvatarZone;
