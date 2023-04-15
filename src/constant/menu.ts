import { lazy } from "react";

import { DatabaseOutlined, InsertRowLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

import { ROLE } from "./role";

const Login = lazy(() => import("../ui/modules/login/containers/Login"));

const DynamicData = lazy(() => import("../ui/modules/dynamic-data/containers/DynamicData"));
const DynamicDataCollection = lazy(() => import("../ui/modules/dynamic-data/containers/DynamicDataCollection"));
const DynamicDataDocument = lazy(() => import("../ui/modules/dynamic-data/containers/DynamicDataDocument"));

export const MAIN_ROUTES = [
  {
    path: "/login",
    name: "login",
    element: Login,
  },
  {
    path: "/dynamic-data",
    name: "dynamicData",
    element: DynamicData,
    title: 'Dynamic data Overview',
  },
  {
    path: "/dynamic-data/collection",
    name: "DynamicDataCollection",
    element: DynamicDataCollection,
    title: 'Dynamic data Collection',
  },
  {
    path: "/dynamic-data/document",
    name: "DynamicDataDocument",
    element: DynamicDataDocument,
    title: 'Dynamic data Document',
  },
];

export const websiteMenus = [
  {
    id: "dynamic-data",
    name: "Dynamic Data",
    icon: DatabaseOutlined,
    role: [ROLE.Admin, ROLE.Guest],
  },
  {
    id: "dynamic-data-overview",
    name: "Overview",
    icon: InsertRowLeftOutlined,
    route: "/dynamic-data",
    menuParentId: "dynamic-data",
    role: [ROLE.Admin, ROLE.Guest],
  },
  {
    id: "dynamic-data-collection",
    name: "Collections",
    icon: CaretRightOutlined,
    route: "/dynamic-data/collection",
    menuParentId: "dynamic-data",
    role: [ROLE.Admin, ROLE.Guest],
  },
  {
    id: "dynamic-data-document",
    name: "Documents",
    icon: CaretRightOutlined,
    route: "/dynamic-data/document",
    menuParentId: "dynamic-data",
    role: [ROLE.Admin, ROLE.Guest],
  },
];
