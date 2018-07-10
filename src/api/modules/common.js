import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";

// 获取验证码
export function captcha(uuid) {
  return requestUrl(`/captcha.jpg?uuid=${uuid}`);
}

// 登录
export function login(params) {
  return request({
    url: requestUrl("/sys/login"),
    method: "post",
    data: requestParam(params)
  });
}

// 退出
export function logout() {
  return request({
    url: requestUrl("/sys/logout"),
    method: "post",
    data: requestParam()
  });
}

// 忘记密码-验证码
export function smsCode(params) {
  return request({
    url: requestUrl("/user/smsCode"),
    method: "post",
    data: requestParam(params)
  });
}

// 忘记密码-重置
export function resetPassword(params) {
  return request({
    url: requestUrl("/user/resetPassword"),
    method: "post",
    data: requestParam(params)
  });
}

// 获取所有角色
export function getRoles() {
  return request({
    url: requestUrl("/sys/role/getList"),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 获取门店列表
export function getOfficeList() {
  return request({
    url: requestUrl("/sys/sysoffice/getList"),
    method: "get",
    params: requestParam({}, "get")
  });
}

export function getAllOfficeList() {
  return request({
    url: requestUrl("/sys/sysoffice/getList"),
    method: "get",
    params: requestParam({type: "all"}, "get")
  });
}

// 获取员工身份
export function getIdentityList() {
  return request({
    url: requestUrl("/sys/sysidentity/getList"),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 获取分类列表
export function getCategoryList() {
  return request({
    url: requestUrl("/serviceCategory/servicecategory/getList"),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 上传文件
export function upload(token) {
  return requestUrl(`/common/uploadFile?token=${token}`);
}
