import React, { useEffect, useState } from 'react';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import './LayoutApp.less';

import { useAuth } from '~/src/adapters/appService/auth.service';
import { authSelector } from '~/src/adapters/redux/selectors/auth';
import { MAIN_ROUTES, websiteMenus } from '~/src/constant/menu';
import useQuery from '~/src/hooks/useQuery';
import { arrayToTree, queryAncestors } from '~/src/utils/menu';
import { renderRoutes } from '~/src/utils/route';
import ROUTE from '~/src/constant/routes';

const { Header, Sider, Content } = Layout;

const filterRole = (role) => (menu) => {
  return menu.role
    ? menu.role.includes(role)
    : true;
};

const generateMenus = (data) => {
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
          {generateMenus(item.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id}>
        <Link to={`${item.route}` || '#'}>
          {!!item.icon && <item.icon />}
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    );
  });
};

function LayoutApp() {
  const navigate = useNavigate();
  const { role, name } = useSelector(authSelector);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const query = useQuery();
  const { checkSession, logout } = useAuth();

  const menus = websiteMenus;

  const filteredMenus = menus.filter(filterRole(role));

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
      .then((data) => {
        if (currentPath === "" || currentPath === "/admin") {
          navigate(ROUTE.DYNAMIC_DATA.OVERVIEW, { replace: true });
        }
        data
      })
      .catch((err) => {
        navigate(ROUTE.LOGIN, { replace: true });
      });
  }, []);

  const currentPath = useLocation().pathname;
  const userInfo = useSelector(authSelector);
  return (
    <Layout className="cms-layout-app">
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
      >
        <div className="header-container">
          <div className="logo" />
          <h2>Buildify</h2>
        </div>
        <Menu mode="inline" theme="light" selectedKeys={selectedKeys}>
          {generateMenus(menuTree)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background-header"
          style={{ padding: 0 }}
        >
          <div className="site-layout-background-header_left">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <h1>
              {MAIN_ROUTES.find((item) => item.path === currentPath)?.title}
            </h1>
          </div>

          <div className="action-container">
            <h3 className="action-container_greeting">Hi {userInfo.name}!</h3>
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
