export const SET_USER_INFO = "SET_USER_INFO";
export const LOG_OUT = "LOG_OUT";
export const SET_ACCOUNT = "SET_ACCOUNT";

export const setUserInfo = (user) => ({
  type: SET_USER_INFO,
  payload: user,
});
