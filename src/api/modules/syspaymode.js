import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";
import isInteger from "lodash/isInteger";

// 获取列表
export function list(params) {
  return request({
    url: requestUrl("/sys/syspaymode/list"),
    method: "get",
    params: requestParam(params, "get")
  });
}

export function queryPayList() {
  return request({
    url: requestUrl("/sys/syspaymode/queryPayList"),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 获取信息
export function info(id) {
  return request({
    url: requestUrl("/sys/syspaymode/info" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 添加
export function add(params) {
  return request({
    url: requestUrl("/sys/syspaymode/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 修改
export function update(params) {
  return request({
    url: requestUrl("/sys/syspaymode/update"),
    method: "post",
    data: requestParam(params)
  });
}

// 删除
export function del(params) {
  return request({
    url: requestUrl("/sys/syspaymode/delete"),
    method: "post",
    data: requestParam(params, "post", false)
  });
}
