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

// 获取所有角色
export function getRoles() {
  return request({
    url: requestUrl("/sys/role/getList"),
    method: "get",
    data: requestParam({}, "get")
  });
}

// 获取门店列表
export function getOfficeList() {
  return request({
    url: requestUrl("/sys/sysoffice/getList"),
    method: "get",
    data: requestParam({}, "get")
  });
}

// 获取员工身份
export function getIdentityList() {
  return request({
    url: requestUrl("/sys/sysidentity/getList"),
    method: "get",
    data: requestParam({}, "get")
  });
}

// 获取分类列表
export function getCategoryList() {
  return request({
    url: requestUrl("/serviceCategory/servicecategory/getList"),
    method: "get",
    data: requestParam({}, "get")
  });
}

// 上传文件
export function upload(token) {
  return requestUrl(`/common/uploadFile?token=${token}`);
}
