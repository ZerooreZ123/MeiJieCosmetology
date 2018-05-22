import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";

// 获取列表
export function list(params) {
  return request({
    url: requestUrl("/serviceProduct/serviceproduct/list"),
    method: "get",
    params: requestParam(params, "get")
  });
}

// 获取信息
export function info(id) {
  return request({
    url: requestUrl("/serviceProduct/serviceproduct/info/" + id),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 添加
export function add(params) {
  return request({
    url: requestUrl("/serviceProduct/serviceproduct/save"),
    method: "post",
    data: requestParam(params)
  });
}

// 修改
export function update(params) {
  return request({
    url: requestUrl("/serviceProduct/serviceproduct/update"),
    method: "post",
    data: requestParam(params)
  });
}

// 删除
export function del(params) {
  return request({
    url: requestUrl("/serviceProduct/serviceproduct/delete"),
    method: "post",
    data: requestParam(params, "post", false)
  });
}
