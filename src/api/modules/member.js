import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";
import isInteger from "lodash/isInteger";

// 获取列表
export function list(params) {
  return request({
    url: requestUrl("/member/member/list"),
    method: "get",
    params: requestParam(params, "get")
  });
}
// 获取筛选列表
export function queryMemberList() {
  return request({
    url: requestUrl("/member/member/queryMemberList"),
    method: "get",
    params: requestParam({}, "get")
  });
}
// 获取会员渠道
export function getGuestSource(params) {
  return request({
    url: requestUrl("/member/member/getGuestSource"),
    method: "get",
    params: requestParam(params, "get")
  });
}
// 获取会员详情
export function getMemberDetail(params) {
  return request({
    url: requestUrl("/member/member/getMemberDetail"),
    method: "get",
    params: requestParam(params, "get")
  });
}
// 获取信息
export function info(id) {
  return request({
    url: requestUrl("/member/member/info" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 添加
export function add(params) {
  return request({
    url: requestUrl("/member/member/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 修改
export function update(params) {
  return request({
    url: requestUrl("/member/member/update"),
    method: "post",
    data: requestParam(params)
  });
}

// 删除
export function del(params) {
  return request({
    url: requestUrl("/member/member/delete"),
    method: "post",
    data: requestParam(params, "post", false)
  });
}
export function queryCustomerlist(params) {
  return request({
    url: requestUrl("/member/member/queryCustomerlist"),
    method: "get",
    params: requestParam(params, "get")
  });
}
