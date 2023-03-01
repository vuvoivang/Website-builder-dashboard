import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getWithPath, postWithPath } from "~/src/adapters/api.http";
import { setUserInfo } from "~/src/adapters/redux/actions/auth";
import { ResponseData } from "~/src/constant";
import API from "~/src/constant/api";
import { ILoginData, ILoginResponseData } from "~/src/domain/auth";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return {
    async loginByAccount(
      data: ILoginData
    ): Promise<ResponseData<ILoginResponseData>> {
      const resp = await postWithPath(`${API.AUTH.POST.LOGIN}`, {}, data);
      if (resp.success) {
        const auth = resp.data;
        if (auth.roles) {
          auth.roles = JSON.parse(auth.roles);
        }
        dispatch(setUserInfo(auth));
        message.success("Đăng nhập thành công!");
        navigate("/admin/web-article/list");
      } else {
        message.error("Đăng nhập thất bại!");
      }
      return resp;
    },
    async checkSession(): Promise<ResponseData<ILoginResponseData>> {
      const resp = await postWithPath(`${API.AUTH.POST.SESSION}`, {});
      if (resp.success) {
        const auth = resp.data;
        if (auth.roles) {
          auth.roles = JSON.parse(auth.roles);
        }
        dispatch(setUserInfo(auth));
      } else {
        throw new Error(JSON.stringify(resp));
      }
      return resp;
    },
    async logout(): Promise<ResponseData<any>> {
      const resp = await getWithPath(`${API.AUTH.GET.LOGOUT}`);
      if (resp.success) {
        dispatch(
          setUserInfo({
            name: "",
            roles: [],
          })
        );
        navigate("/admin/login");
      } else {
        throw new Error(JSON.stringify(resp));
      }
      return resp;
    },
  };
}
