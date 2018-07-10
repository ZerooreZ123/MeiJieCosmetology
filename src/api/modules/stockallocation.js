import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";
import isInteger from "lodash/isInteger";

// 获取列表
export function list(params) {
  return request({
    url: requestUrl("/stock/stockallocation/list"),
    method: "get",
    params: requestParam(params, "get")
  });
}

export function getDetailsList(params) {
  return request({
    url: requestUrl("/stock/stockconsumedetails/getList"),
    method: "get",
    params: requestParam(params, "get")
  });
}

export function getList(params) {
  return request({
    url: requestUrl("/stock/stockallocation/getList"),
    method: "get",
    params: requestParam(params, "get")
  });
}

export function submitExamine(params) {
  return request({
    url: requestUrl("/stock/stockallocation/submitExamine"),
    method: "post",
    data: requestParam(params)
  });
}

export function updateExamine(params) {
  return request({
    url: requestUrl("/stock/stockallocation/updateExamine"),
    method: "post",
    data: requestParam(params)
  });
}

// 获取信息
export function info(id) {
  return request({
    url: requestUrl("/stock/stockallocation/info" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 添加
export function add(params) {
  return request({
    url: requestUrl("/stock/stockallocation/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 修改
export function update(params) {
  return request({
    url: requestUrl("/stock/stockallocation/update"),
    method: "post",
    data: requestParam(params)
  });
}

// 删除
export function del(params) {
  return request({
    url: requestUrl("/stock/stockallocation/delete"),
    method: "post",
    data: requestParam(params, "post", false)
  });
}
