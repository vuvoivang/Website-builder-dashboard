import React, { useEffect, useState } from 'react';

import {
  DownloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import './LayoutApp.less';

import { useAuth } from '~/src/adapters/appService/auth.service';
import { authSelector } from '~/src/adapters/redux/selectors/auth';
import { MAIN_ROUTES, mobileMenus, websiteMenus } from '~/src/constant/menu';
import useQuery from '~/src/hooks/useQuery';
import { arrayToTree, queryAncestors } from '~/src/utils/menu';
import { renderRoutes } from '~/src/utils/route';

const { Header, Sider, Content } = Layout;

const filterRole = (roles) => (menu) => {
  return menu.role
    ? roles.some((role) => {
        return menu.role.includes(role);
      })
    : true;
};

const generateMenus = (data, appType) => {
  return data.map((item) => {
    if (item.children) {
      return (
        <Menu.SubMenu
          key={item.id}
          title={
            <>
              {!!item.icon && <item.icon />}
              <span>{item.name}</span>
            </>
          }
        >
          {generateMenus(item.children, appType)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id}>
        <Link to={`${item.route}?app_type=${appType}` || '#'}>
          {!!item.icon && <item.icon />}
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    );
  });
};

function LayoutApp() {
  const navigate = useNavigate();
  const { roles, name } = useSelector(authSelector);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const query = useQuery();
  const { checkSession, logout } = useAuth();
  let queryAppType = query.get('app_type');
  if (!['mobile', 'website'].includes(queryAppType)) {
    queryAppType = 'mobile';
  }
  const [appType, setAppType] = useState<any>(queryAppType);

  const menus = appType === 'mobile' ? mobileMenus : websiteMenus;

  const filteredMenus = menus.filter(filterRole(roles));

  // Generating tree-structured data for menu content.
  const menuTree = arrayToTree(filteredMenus, 'id', 'menuParentId');

  // Find a menu that matches the pathname.
  const currentMenu = menus.find(
    (_) => _.route && pathToRegexp(_.route).exec(location.pathname)
  );

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenu
    ? queryAncestors(menus, currentMenu, 'menuParentId').map((_) => _.id)
    : [];

  useEffect(() => {
    checkSession()
      .then((data) => data)
      .catch((err) => {
        navigate('/admin/login', { replace: true });
      });
  }, []);

  const navigationMenu = [
    {
      id: 'mobile',
      name: 'Mobile',
      icon: <DownloadOutlined />,
    },
    {
      id: 'website',
      name: 'Website',
      icon: <SettingOutlined />,
    },
  ];

  const handleAppTypeMenuClick = (e) => {
    setAppType(e.key);
    navigate(`/admin?app_type=${e.key}`, { replace: true });
  };

  return (
    <Layout className="cms-layout-app">
      <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
        <div className="logo" />
        <Menu
          className="app-type-menu"
          theme="dark"
          mode="horizontal"
          selectedKeys={[appType]}
          onClick={handleAppTypeMenuClick}
        >
          {navigationMenu.map((item) => {
            return (
              <Menu.Item key={item.id}>
                <span>{item.name}</span>
              </Menu.Item>
            );
          })}
        </Menu>
        <Menu mode="inline" theme="dark" selectedKeys={selectedKeys}>
          {generateMenus(menuTree, appType)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background-header"
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              // onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="action-container">
            <Button className="btn-logout" size="middle" onClick={logout}>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {renderRoutes(MAIN_ROUTES)}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
