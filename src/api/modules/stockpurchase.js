import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";
import isInteger from "lodash/isInteger";

// 根据采购过滤门店选择添加商品列表
// 过滤条件 所属门店：officeId  大类：catFirst  品牌：brandId  按产品名称/编号：key
export function getGoodList(params) {
  return request({
    url: requestUrl("/serviceProduct/serviceproduct/getList"),
    method: "post",
    data: requestParam(params)
  });
}

// 获取供货商列表（无分页）
export function getSupplierList() {
  return request({
    url: requestUrl("/stock/supplier/getList"),
    method: "get",
    params: requestParam({}, "get")
  });
}

export function getInboundDetail(params) {
  return request({
    url: requestUrl("/stock/stockpurchase/getInboundDetail"),
    method: "post",
    data: requestParam(params)
  });
}

// 获取列表
export function list(params) {
  return request({
    url: requestUrl("/stock/stockpurchase/list"),
    method: "get",
    params: requestParam(params, "get")
  });
}

// 获取信息
export function info(id) {
  return request({
    url: requestUrl("/stock/stockpurchase/info" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 添加
export function add(params) {
  return request({
    url: requestUrl("/stock/stockpurchase/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 修改
export function update(params) {
  return request({
    url: requestUrl("/stock/stockpurchase/update"),
    method: "post",
    data: requestParam(params)
  });
}

// 删除
export function del(params) {
  return request({
    url: requestUrl("/stock/stockpurchase/delete"),
    method: "post",
    data: requestParam(params, "post", false)
  });
}
