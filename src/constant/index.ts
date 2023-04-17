export const IS_DEVELOPMENT =
  document.location.href.indexOf("localhost") > -1 ||
  document.location.href.indexOf("dev") > -1;
export const IS_PRODUCTION = import.meta.env.VITE_ENV === "production";

export const DOMAIN_API_URL = import.meta.env.VITE_API_URL;

export enum AppType {
  MOBILE = 1,
  MINIAPP = 2,
  WEBSITE = 3,
}
export interface ResponseData<T> {
  msg: string;
  code: number;
  data: T;
  success: boolean;
  total?: number;
  not_empty?: boolean;
  empty?: boolean;
}

export enum ApiStatus {
  SUCCESS = 0,
  UNAUTHORIZED = 403,
}

export enum DYNAMIC_DATA_TYPE {
  STRING = 1,
  NUMBER = 2,
}
