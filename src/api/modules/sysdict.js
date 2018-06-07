import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";
import isInteger from "lodash/isInteger";

// 获取列表
export function list(params) {
  return request({
    url: requestUrl("/sys/sysdict/list"),
    method: "get",
    params: requestParam(params, "get")
  });
}

// 修改
export function updateValue(params) {
  return request({
    url: requestUrl("/sys/sysdict/updateValue"),
    method: "post",
    data: requestParam(params)
  });
}
// 获取信息
export function info(id) {
  return request({
    url: requestUrl("/sys/sysdict/info" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 添加
export function add(params) {
  return request({
    url: requestUrl("/sys/sysdict/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 修改
export function update(params) {
  return request({
    url: requestUrl("/sys/sysdict/update"),
    method: "post",
    data: requestParam(params)
  });
}

// 删除
export function del(params) {
  return request({
    url: requestUrl("/sys/sysdict/delete"),
    method: "post",
    data: requestParam(params, "post", false)
  });
}

export function getlist(params) {
  return request({
    url: requestUrl("/sys/sysdict/getList"),
    method: "post",
    data: requestParam(params)
  });
}
