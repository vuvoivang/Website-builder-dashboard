import { lazy } from "react";

import { DownloadOutlined } from "@ant-design/icons";

import { ROLE } from "./role";

const Login = lazy(() => import("../ui/modules/login/containers/Login"));

const ViewDynamicData = lazy(() => import("../ui/modules/dynamic-data/containers/ViewDynamicData"));

export const MAIN_ROUTES = [
  {
    path: "/login",
    name: "login",
    element: Login,
  },
  {
    path: "/dynamic-data",
    name: "dynamicData",
    element: ViewDynamicData,
  },
];

export const websiteMenus = [
  // {
  //   id: "bank",
  //   name: "Ngân hàng",
  //   icon: DownloadOutlined,
  //   route: "/admin/banks/list",
  //   role: [ROLE.Admin, ROLE.Registered, ROLE.OP, ROLE.Setup, ROLE.CustomSetup],
  // },
  // {
  //   id: "partner",
  //   name: "Đối tác",
  //   icon: DownloadOutlined,
  //   route: "/admin/partners/list",
  //   role: [ROLE.Admin, ROLE.OP, ROLE.Setup, ROLE.CustomSetup],
  // },
  // {
  //   id: "campaign",
  //   name: "Chiến dịch",
  //   icon: DownloadOutlined,
  //   route: "/admin/campaigns/list",
  //   role: [ROLE.Admin, ROLE.OP, ROLE.Setup, ROLE.CustomSetup],
  // },
  {
    id: "web-article-parent",
    name: "Web Articles",
    icon: DownloadOutlined,
    role: [ROLE.Admin, ROLE.OP],
  },
  {
    id: "web-article",
    name: "Articles",
    icon: DownloadOutlined,
    route: "/admin/web-article/list",
    menuParentId: "web-article-parent",
    role: [ROLE.Admin, ROLE.OP],
  },
  // {
  //   id: "report",
  //   name: "Report",
  //   icon: DownloadOutlined,
  //   role: [ROLE.Admin, ROLE.OP, ROLE.KeyAccountManager, ROLE.CustomSetup],
  // },
  {
    id: "web-category",
    name: "Categories",
    icon: DownloadOutlined,
    route: "/admin/web-category/list",
    menuParentId: "web-article-parent",
    role: [ROLE.Admin, ROLE.OP],
  },
];
