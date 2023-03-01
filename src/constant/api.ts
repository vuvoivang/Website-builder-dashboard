import { DOMAIN_API_URL } from ".";

export const API_UPLOAD_IMAGE = `${DOMAIN_API_URL}/upload/image_url`;

export const WEB_ARTICLE = {
  GET: {
    ARTICLES: "/web-article",
  },
  POST: {
    CREATE_ARTICLE: "/web-article",
  },
  PUT: {
    UPDATE_ARTICLE: "/web-article",
  },
};

export const WEB_CATEGORY = {
  GET: {
    CATEGORIES: "/web-article-category",
  },
  POST: {
    CREATE_CATEGORY: "/web-article-category",
  },
  PUT: {
    UPDATE_CATEGORY: "/web-article-category",
  },
};

export const AUTH = {
  GET: {
    LOGOUT: "/auth/logout",
  },
  POST: {
    SESSION: "/auth/session",
    LOGIN: "/auth/login",
  },
};
const API = {
  AUTH,
  WEB_ARTICLE,
  WEB_CATEGORY,
};

export default API;
