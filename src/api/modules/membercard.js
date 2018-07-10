import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";
import isInteger from "lodash/isInteger";

// 获取列表
export function list(params) {
  return request({
    url: requestUrl("/stock/membercard/list"),
    method: "get",
    params: requestParam(params, "get")
  });
}

// 获取信息
export function info(id) {
  return request({
    url: requestUrl("/stock/membercard/info" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}

export function cardList(params) {
  return request({
    url: requestUrl("/stock/membercard/cardList"),
    method: "get",
    params: requestParam(params, "get")
  });
}

export function userCard(params) {
  return request({
    url: requestUrl("/stock/membercard/userCard"),
    method: "get",
    params: requestParam(params, "get")
  });
}

// 添加
export function add(params) {
  return request({
    url: requestUrl("/stock/membercard/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 修改
export function update(params) {
  return request({
    url: requestUrl("/stock/membercard/update"),
    method: "post",
    data: requestParam(params)
  });
}

// 删除
export function del(params) {
  return request({
    url: requestUrl("/stock/membercard/delete"),
    method: "post",
    data: requestParam(params, "post", false)
  });
}
