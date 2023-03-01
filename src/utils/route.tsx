import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Loading from '~/src/ui/shared/loading';

export interface IRouteBase {
  id?: number;
  name?: string;
  icon?: string | any;
  path: string;
  container?: string;
  element?: any;
  redirect?: string;
  featureId?: number;
  hideLink?: boolean;
  type?: string;
  // roles?: ACCOUNT_ROLE[];
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

export function renderRoute(route: IRoute, role?: number[]) {
  return (
    <Route
      key={route.path}
      // exact={route.path !== "*"}
      path={route.path}
      element={<route.element />}
    />
  );
}

export function renderRoutes(routes: IRoute[], role?: number[]) {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((route) => {
          return renderRoute(route, role);
        })}
      </Routes>
    </Suspense>
  );
}

export function flattenRoute(routeList: IRoute[], deep: boolean): IRoute[] {
  const result: IRoute[] = [];

  routeList.forEach((route) => {
    result.push({
      ...route,
    });

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep));
    }
  });

  return result;
}

export function getRouteList(routes: any): IRoute[] {
  const routeList = routes;

  if (routeList.length > 0) {
    return flattenRoute(routeList, true);
  }
  return [];
}

export function findRoutesByPaths(
  pathList: string[],
  routeList: IRoute[],
  basename?: string
): IRoute[] {
  return routeList.filter(
    (child: IRoute) => pathList.indexOf((basename || '') + child.path) !== -1
  );
}

export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) =>
      '/'.concat(array.slice(0, index + 1).join('/'))
    );
}
