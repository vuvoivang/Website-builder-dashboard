import { message } from "antd";
import { useNavigate } from "react-router-dom";

import {
  formatResponse,
  getWithPath,
  postWithPath,
  putWithPath,
} from "~/src/adapters/api.http";
import API from "~/src/constant/api";
import { WebArticle } from "~/src/domain/webArticle";

export function useWebArticle() {
  const navigate = useNavigate();

  return {
    async getAllWebArticles(): Promise<WebArticle[]> {
      const data = await getWithPath(API.WEB_ARTICLE.GET.ARTICLES);
      return formatResponse(data);
    },

    async createWebArticle(body): Promise<WebArticle> {
      const data = await postWithPath(
        `${API.WEB_ARTICLE.POST.CREATE_ARTICLE}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới article thành công!`);
        navigate("/admin/web-article/list");
      } else {
        message.error("Tạo mới article thất bại!");
      }
      return formatResponse(data);
    },

    async getDetailWebArticle(id: number): Promise<WebArticle> {
      const data = await getWithPath(
        `${API.WEB_ARTICLE.GET.ARTICLES}/${id}`,
        {}
      );
      return formatResponse(data);
    },

    async updateWebArticle(body): Promise<WebArticle> {
      const data = await putWithPath(
        `${API.WEB_ARTICLE.PUT.UPDATE_ARTICLE}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Cập nhật article thành công!`);
        navigate("/admin/web-article/list");
      } else {
        message.error("Cập nhật article thất bại!");
      }
      return formatResponse(data);
    },
  };
}
