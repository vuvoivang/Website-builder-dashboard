/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
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
import userService from '~/src/services/user';
import AvatarZone from '../AvatarZone';

const { Header, Sider, Content } = Layout;

const filterRole = (role) => (menu) => {
  return menu.role ? menu.role.includes(role) : true;
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

export const AppContext = createContext(null);

function LayoutApp() {
  const navigate = useNavigate();
  // const { role = '', name } = useSelector(authSelector);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [user, setUser] = useState<any>(false);

  const query = useQuery();
  const { checkSession, logout } = useAuth();

  const menus = websiteMenus;
  const currentPath = useLocation().pathname;

  // const filteredMenus = menus.filter(filterRole(role));

  // Generating tree-structured data for menu content.
  const menuTree = arrayToTree(menus, 'id', 'menuParentId');

  // Find a menu that matches the pathname.
  const currentMenu = menus.find(
    (_) => _.route && pathToRegexp(_.route).exec(currentPath)
  );
  console.log(menus, menuTree, menus, currentMenu);

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenu
    ? queryAncestors(menus, currentMenu, 'menuParentId').map((_) => _.id)
    : [];

  useEffect(() => {
    userService
      .getUserInfo()
      .then((data) => {
        if (data.msg) throw new Error(data.msg);
        setUser(data);
        if (currentPath === '/' || currentPath === '/admin') {
          navigate(ROUTE.DYNAMIC_DATA.OVERVIEW, { replace: true });
        }
      })
      .catch((err) => {
        if (import.meta.env.PROD) window.location.href = '/sign-in';
        console.log("Err get user info: ", err);
      });
  }, [currentPath]);

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
        <AppContext.Provider
          value={{
            userInfo: user,
          }}
        >
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
            {/* {user?.fullName && <div className="action-container">
              <h3 className="action-container_greeting">{user?.fullName}</h3>
              <Button className="btn-logout" size="middle" onClick={logout}>
                Logout
              </Button>
            </div>} */}

            {user?.fullName && <AvatarZone user={user} handleLogout={logout}/>}

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
        </AppContext.Provider>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
