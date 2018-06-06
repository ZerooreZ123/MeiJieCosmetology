import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";

/**
 * 正在服务的员工
 * @param {*} params
 * officeId
 */
export function getStaff(params) {
  return request({
    url: requestUrl("/order/miorder/getStaff"),
    method: "get",
    params: requestParam(params, "get")
  });
}

/**
 * 预约数量
 * @param {*} params
 */
export function getAppoint(params) {
  return request({
    url: requestUrl("/appoint/appointment/getAppoint"),
    method: "get",
    params: requestParam(params, "get")
  });
}

/**
 * 订单数量
 * @param {*} params
 */
export function getOrderNum(params) {
  return request({
    url: requestUrl("/order/miorder/getOrderNum"),
    method: "get",
    params: requestParam(params, "get")
  });
}

/**
 * 营业额
 * @param {*} params
 */
export function getTurnover(params) {
  return request({
    url: requestUrl("/order/miorder/getTurnover"),
    method: "get",
    params: requestParam(params, "get")
  });
}

/**
 * 客户统计
 * @param {*} params
 */
export function getGuest(params) {
  return request({
    url: requestUrl("/member/member/getGuest"),
    method: "get",
    params: requestParam(params, "get")
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
