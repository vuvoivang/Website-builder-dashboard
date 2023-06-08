import { lazy } from "react";

import { DatabaseOutlined, InsertRowLeftOutlined, CaretRightOutlined,ProfileOutlined  } from "@ant-design/icons";

import { ROLE } from "./role";
import ROUTE from "./routes";

const Login = lazy(() => import("../ui/modules/login/containers/Login"));

const DynamicData = lazy(() => import("../ui/modules/dynamic-data/containers/dynamic-data/DynamicData"));
const DynamicDataCollection = lazy(() => import("../ui/modules/dynamic-data/containers/DynamicDataCollection"));
const DynamicDataDocument = lazy(() => import("../ui/modules/dynamic-data/containers/DynamicDataDocument"));
const Profile = lazy(() => import("../ui/modules/profile/containers/Profile"));

export const MAIN_ROUTES = [
  {
    path: ROUTE.LOGIN,
    name: "login",
    element: Login,
  },
  {
    path: ROUTE.DYNAMIC_DATA.OVERVIEW,
    name: "dynamicData",
    element: DynamicData,
    title: 'Dynamic data Overview',
  },
  {
    path: ROUTE.PROFILE,
    name: "profile",
    element: Profile,
    title: 'Profile',
  },
  // {
  //   path: ROUTE.DYNAMIC_DATA.COLLECTION,
  //   name: "DynamicDataCollection",
  //   element: DynamicDataCollection,
  //   title: 'Dynamic data Collection',
  // },
  // {
  //   path: ROUTE.DYNAMIC_DATA.DOCUMENT,
  //   name: "DynamicDataDocument",
  //   element: DynamicDataDocument,
  //   title: 'Dynamic data Document',
  // },
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
    route: ROUTE.DYNAMIC_DATA.OVERVIEW,
    menuParentId: "dynamic-data",
    role: [ROLE.Admin, ROLE.Guest],
  },
  {
    id: "profile",
    name: "Profile",
    icon: ProfileOutlined,
    role: [ROLE.Admin, ROLE.Guest],
    route: ROUTE.PROFILE,
  },
  // {
  //   id: "dynamic-data-collection",
  //   name: "Collections",
  //   icon: CaretRightOutlined,
  //   route: ROUTE.DYNAMIC_DATA.COLLECTION,
  //   menuParentId: "dynamic-data",
  //   role: [ROLE.Admin, ROLE.Guest],
  // },
  // {
  //   id: "dynamic-data-document",
  //   name: "Documents",
  //   icon: CaretRightOutlined,
  //   route: ROUTE.DYNAMIC_DATA.DOCUMENT,
  //   menuParentId: "dynamic-data",
  //   role: [ROLE.Admin, ROLE.Guest],
  // },
];
