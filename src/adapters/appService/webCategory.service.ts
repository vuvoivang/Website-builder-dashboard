import { message } from "antd";
import { useNavigate } from "react-router-dom";

import {
  formatResponse,
  getWithPath,
  postWithPath,
  putWithPath,
} from "~/src/adapters/api.http";
import API from "~/src/constant/api";
import { Category } from "~/src/domain/category";

export function useWebCategory() {
  const navigate = useNavigate();
  return {
    async getAllWebCategories(): Promise<Category[]> {
      const data = await getWithPath(API.WEB_CATEGORY.GET.CATEGORIES);
      return formatResponse(data);
    },

    async createWebCategory(body): Promise<Category> {
      const data = await postWithPath(
        `${API.WEB_CATEGORY.POST.CREATE_CATEGORY}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới category thành công!`);
        navigate("/admin/web-category/list");
      } else {
        message.error("Tạo mới category thất bại!");
      }
      return formatResponse(data);
    },

    async getDetailWebCategory(id: number): Promise<Category> {
      const data = await getWithPath(
        `${API.WEB_CATEGORY.GET.CATEGORIES}/${id}`,
        {}
      );
      return formatResponse(data);
    },

    async updateWebCategory(body): Promise<Category> {
      const data = await putWithPath(
        `${API.WEB_CATEGORY.PUT.UPDATE_CATEGORY}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Cập nhật category thành công!`);
        navigate("/admin/web-category/list");
      } else {
        message.error("Cập nhật category thất bại!");
      }
      return formatResponse(data);
    },
  };
}
