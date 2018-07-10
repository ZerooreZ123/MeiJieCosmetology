import request from "../request";
import requestUrl from "../requestUrl";
import requestParam from "../requestParam";
import isInteger from "lodash/isInteger";

// 获取短信列表
export function messageList(params) {
  return request({
    url: requestUrl("/message/messagetemplate/getList"),
    method: "get",
    params: requestParam(params, 'get')
  });
}

// 获取短信模板列表
export function messageTemplateList() {
  return request({
    url: requestUrl("/message/messagetemplate/getCommonList"),
    method: "get",
    params: requestParam({}, 'get')
  });
}

// 获取短信余量
export function messageRemain() {
  return request({
    url: requestUrl("/message/messageoffice/getList"),
    method: "get",
    params: requestParam({}, 'get')
  });
}

// 确认发送信息
export function makeSurePost (params) {
  return request({
    url: requestUrl('/message/messageexamine/save'),
    method: 'post',
    data: requestParam(params)
  })
}

// 修改短信设置
export function messageSetting (params) {
  return request({
    url: requestUrl('/message/messagetemplate/update'),
    method: 'post',
    data: requestParam(params)
  })
}

// 获取短信通知记录
export function messageNoticeList(params) {
  return request({
    url: requestUrl("/message/messagetemplate/getList"),
    method: "get",
    params: requestParam(params, 'get')
  });
}

// 获取群发短信详情
// export function messageDetail(params) {
//   return request({
//     url: requestUrl("/message/messageexamine/info/"),
//     method: "get",
//     params: requestParam(params, 'get')
//   });
// }

export function messageDetail(id) {
  return request({
    url: requestUrl("/message/messageexamine/info" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}

// 立刻发送短信
export function postMessageRightNow(params) {
  return request({
    url: requestUrl("/message/messageexamine/updateExamineSuccess"),
    method: 'post',
    data: requestParam(params)
  });
}

// 取消发送短信
export function canclePostMessage(id) {
  return request({
    url: requestUrl("/message/messageexamine/updateExaminefail" + (isInteger(id) ? `/${id}` : "")),
    method: "get",
    params: requestParam({}, "get")
  });
}
