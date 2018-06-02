import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";

/**
 * 预约数量
 * @param {*} params
 */
export function getAppoint(params) {
  return request({
    url: requestUrl("/appoint/appointment/getAppoint"),
    method: "post",
    data: requestParam(params)
  });
}

/**
 * 订单数量
 * @param {*} params
 */
export function getOrderNum(params) {
  return request({
    url: requestUrl("/order/miorder/getOrderNum"),
    method: "post",
    data: requestParam(params)
  });
}

/**
 * 营业额
 * @param {*} params
 */
export function getTurnover(params) {
  return request({
    url: requestUrl("/order/miorder/getTurnover"),
    method: "post",
    data: requestParam(params)
  });
}

/**
 * 客户统计
 * @param {*} params
 */
export function getGuest(params) {
  return request({
    url: requestUrl("/member/member/getGuest"),
    method: "post",
    data: requestParam(params)
  });
}

/**
 * 预约信息
 * @param {*} day
 */
export function getAppointmentList(params) {
  return request({
    url: requestUrl("/appoint/appointment/getList"),
    method: "post",
    data: requestParam(params)
  });
}
