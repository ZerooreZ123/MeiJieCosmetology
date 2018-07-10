import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";

// 总业绩
export function getAmount(params) {
  return request({
    url: requestUrl("/order/miorder/getAmount"),
    method: "post",
    data: requestParam(params)
  });
}

// 营业收入
export function realPrice(params) {
  return request({
    url: requestUrl("/order/miorderdetail/realPrice"),
    method: "post",
    data: requestParam(params)
  });
}

// 业绩走势
export function achievement(params) {
  return request({
    url: requestUrl("/order/miorderdetail/achievement"),
    method: "post",
    data: requestParam(params)
  });
}

// 男女业绩
export function sexAchievement(params) {
  return request({
    url: requestUrl("/member/member/sexAchievement"),
    method: "post",
    data: requestParam(params)
  });
}

// 业绩来源对比
export function achievementSource(params) {
  return request({
    url: requestUrl("/order/miorderdetail/achievementSource"),
    method: "post",
    data: requestParam(params)
  });
}

// 收入-走势
export function consumeTrend(params) {
  return request({
    url: requestUrl("/order/miorderdetail/consumeTrend"),
    method: "post",
    data: requestParam(params)
  });
}

// 其它消耗走势
export function otherConsumeThrend(params) {
  return request({
    url: requestUrl("/order/miorderdetail/otherConsumeThrend"),
    method: "post",
    data: requestParam(params)
  });
}

// 项目服务营收具体项目
export function detailItem(params) {
  return request({
    url: requestUrl("/serviceItem/serviceitem/detailItem"),
    method: "post",
    data: requestParam(params)
  });
}

// 产品营收之产品大类
export function catFirstRevenue(params) {
  return request({
    url: requestUrl("/serviceProduct/serviceproduct/catFirstRevenue"),
    method: "post",
    data: requestParam(params)
  });
}

// 具体产品营收
export function detailProduct(params) {
  return request({
    url: requestUrl("/serviceProduct/serviceproduct/detailProduct"),
    method: "post",
    data: requestParam(params)
  });
}

// 总卡耗
export function cardConsumn(params) {
  return request({
    url: requestUrl("/order/miorderpay/cardConsumn"),
    method: "post",
    data: requestParam(params)
  });
}

// 卡耗走势
export function cardConsumnTrend(params) {
  return request({
    url: requestUrl("/order/miorderpay/cardConsumnTrend"),
    method: "post",
    data: requestParam(params)
  });
}

// 卡耗统计
export function cardConsumnCount(params) {
  return request({
    url: requestUrl("/order/miorderpay/cardConsumnCount"),
    method: "post",
    data: requestParam(params)
  });
}

// 卡耗来源对比
export function cardConsumnSource(params) {
  return request({
    url: requestUrl("/order/miorderpay/cardConsumnSource"),
    method: "post",
    data: requestParam(params)
  });
}

// 开卡/充值卡大类排行
export function cardCarFirst(params) {
  return request({
    url: requestUrl("/order/miorderpay/cardCarFirst"),
    method: "post",
    data: requestParam(params)
  });
}

// 开卡/充值具体卡排行
export function detailCard(params) {
  return request({
    url: requestUrl("/order/miorderpay/detailCard"),
    method: "post",
    data: requestParam(params)
  });
}

// 卡耗排行卡大类
export function cardConsumnCarFirst(params) {
  return request({
    url: requestUrl("/order/miorderpay/cardConsumnCarFirst"),
    method: "post",
    data: requestParam(params)
  });
}

// 卡耗排行具体卡
export function detailCardConsumn(params) {
  return request({
    url: requestUrl("/order/miorderpay/detailCardConsumn"),
    method: "post",
    data: requestParam(params)
  });
}

export function openAndContinueCard(params) {
  return request({
    url: requestUrl("/order/miorderpay/openAndContinueCard"),
    method: "post",
    data: requestParam(params)
  });
}
