import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getWithPath, postWithPath } from '~/src/adapters/api.http';
import { setUserInfo } from '~/src/adapters/redux/actions/auth';
import { ResponseData } from '~/src/constant';
import API from '~/src/constant/api';
import { ILoginData, ILoginResponseData } from '~/src/domain/auth';
import userService from '~/src/services/user';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return {
    async loginByAccount(
      data: ILoginData
    ): Promise<ResponseData<ILoginResponseData>> {
      // const resp = await postWithPath(`${API.AUTH.POST.LOGIN}`, {}, data);
      // if (resp.success) {
      //   const auth = resp.data;
      //   if (auth.role) {
      //     auth.role = JSON.parse(auth.role);
      //   }
      //   dispatch(setUserInfo(auth));
      //   message.success("Đăng nhập thành công!");
      //   navigate("/admin/web-article/list");
      // } else {
      //   message.error("Đăng nhập thất bại!");
      // }
      const authData = {
        msg: 'Login success',
        code: 0,
        data: {
          name: 'Hoàng Vũ',
          role: 'admin',
        },
        success: true,
      };
      dispatch(setUserInfo(authData.data));
      message.success('Đăng nhập thành công!');
      navigate('/admin/dynamic-data');

      return authData;
    },
    async checkSession(): Promise<ResponseData<ILoginResponseData>> {
      // const resp = await postWithPath(`${API.AUTH.POST.SESSION}`, {});
      // if (resp.success) {
      //   const auth = resp.data;
      //   if (auth.role) {
      //     auth.role = JSON.parse(auth.role);
      //   }
      //   dispatch(setUserInfo(auth));
      // } else {
      //   throw new Error(JSON.stringify(resp));
      // }
      // return resp;
      const authData = {
        msg: 'Check session success',
        code: 0,
        data: {
          name: 'Hoàng Vũ',
          role: 'admin',
        },
        success: true,
      };

      dispatch(setUserInfo(authData.data));

      return authData;
    },
    async logout(): Promise<ResponseData<any>> {
      // const resp = await getWithPath(`${API.AUTH.GET.LOGOUT}`);
      // if (resp.success) {
      //   dispatch(
      //     setUserInfo({
      //       name: "",
      //       role: [],
      //     })
      //   );
      //   navigate("/admin/login");
      // } else {
      //   throw new Error(JSON.stringify(resp));
      // }

      const logoutData = {
        msg: 'Logout success',
        code: 0,
        data: null,
        success: true,
      };
      userService.signOut();

      dispatch(
        setUserInfo({
          name: '',
          role: '',
        })
      );
      window.location.href = '/login';
      return logoutData;
    },
  };
}
