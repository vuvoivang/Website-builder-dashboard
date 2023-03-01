/* eslint-disable no-use-before-define */

import { DOMAIN_API_URL, ResponseData } from "~/src/constant";
import { buildURLWithParam, extend } from "~/src/utils";

export function fetch(
  url,
  params?: {},
  options?: { responseType? },
  timeOut?: 10
): Promise<ResponseData<any>> {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const exOptions = extend(
    {
      credentials: "include",
      headers: defaultHeaders,
    },
    options
  );
  if (options?.responseType === "arraybuffer") {
    return window.fetch(buildURLWithParam(url, params), exOptions).then(toBlob);
  }
  return window
    .fetch(buildURLWithParam(url, params), exOptions)
    .then(toJson)
    .then(validResp);
}

export const getWithPath = (path, params?: {}, options?: {}, timeOut?: 10) => {
  return getWithUrl(DOMAIN_API_URL + path, params, options, timeOut);
};

export const getWithLocalPath = (
  path,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return getWithUrl(
    `http://localhost:3000/api${path}`,
    params,
    options,
    timeOut
  );
};

export const getWithUrl = (
  url: string,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return fetch(url, params, options, timeOut);
};

export const getUrlFromPath = (path, params) => {
  return buildURLWithParam(DOMAIN_API_URL + path, params);
};

export const post = (
  url,
  params = {},
  data: any = {},
  options: any = {},
  timeOut
) => {
  return fetch(
    url,
    params,
    extend(
      {
        body: JSON.stringify(data),
      },
      options
    ),
    timeOut
  );
};

export const postWithUrlBinary = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return fetch(
    url,
    params,
    extend({ body: formData, method: "POST" }, options),
    timeOut
  );
};

export const postWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return postWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const putWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return putWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const postWithPathBinary = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return postWithUrlBinary(
    DOMAIN_API_URL + path,
    params,
    data,
    options,
    timeOut
  );
};

export const postWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: "POST" }, options), timeOut);
};

export const putWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: "PUT" }, options), timeOut);
};

export const deleteWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return deleteWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const deleteWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(
    url,
    params,
    data,
    extend({ method: "DELETE" }, options),
    timeOut
  );
};

function toJson(resp) {
  if (resp.ok) {
    return resp.json();
  }
  return Promise.reject(resp);
}

function toBlob(resp) {
  if (resp.ok) {
    return resp.blob();
  }

  return Promise.reject(resp);
}

function validResp<T>(resp: ResponseData<T>): Promise<ResponseData<T>> {
  if (resp?.success) {
    return Promise.resolve(resp);
  }
  return Promise.reject(resp);
}

export function formatResponse<T>(response): T {
  const { code, data, success } = response;
  if (success) {
    return data;
  }
  throw new Error(JSON.stringify(response));
}
