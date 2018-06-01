import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";
import isInteger from "lodash/isInteger";

// 获取列表
export function list(params) {
  return request({
    url: requestUrl("/order/miorder/list"),
    method: "get",
    params: requestParam(params, "get")
  });
}

export function receivables(params) {
  return request({
    url: requestUrl("/order/miorder/receivables"),
    method: "post",
    data: requestParam(params, "post")
  });
}

export function getQuantity(params) {
  return request({
    url: requestUrl("/order/miorder/getQuantity"),
    method: "post",
    data: requestParam(params, "post")
  });
}

export function getGuest(params) {
  return request({
    url: requestUrl("/order/miorder/getGuest"),
    method: "post",
    data: requestParam(params, "post")
  });
}

export function getSource(params) {
  return request({
    url: requestUrl("/order/miorder/getSource"),
    method: "post",
    data: requestParam(params, "post")
  });
}

export function getAmount(params) {
  return request({
    url: requestUrl("/order/miorder/getAmount"),
    method: "post",
    data: requestParam(params, "post")
  });
}

export function save(params) {
  return request({
    url: requestUrl("/order/miorder/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 获取信息
export function info(id) {
  return request({
    url: requestUrl("/order/miorder/info" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 添加
export function add(params) {
  return request({
    url: requestUrl("/order/miorder/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 修改
export function update(params) {
  return request({
    url: requestUrl("/order/miorder/update"),
    method: "post",
    data: requestParam(params)
  });
}

// 删除
export function del(params) {
  return request({
    url: requestUrl("/order/miorder/delete"),
    method: "post",
    data: requestParam(params, "post", false)
  });
}
