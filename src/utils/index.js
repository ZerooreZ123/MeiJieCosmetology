/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return JSON.parse(sessionStorage.getItem("permissions") || "[]").indexOf(key) !== -1 || false;
}

/**
 * 是否是管理员
 */
export function isSuper() {
  var roleIdList = sessionStorage.getItem("roleIdList");
  var roleIdArray = roleIdList.split(",");
  for (var i = 0; i < roleIdArray.length; i++) {
    if (roleIdArray[i] === "1" || roleIdArray[i] === "2" || roleIdArray[i] === "3") {
      return true;
    }
  }
  return false;
}
/**
 * 获取路由名称, 根据url地址
 * @param {*} url
 */
export function getRouteNameByUrl(url) {
  let val = /.*\/(.*)\.html/.exec(url);
  return val && val.length >= 1 ? val[1] : "";
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = "id", pid = "parentId") {
  var res = [];
  var temp = {};
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i];
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]["children"]) {
        temp[data[k][pid]]["children"] = [];
      }
      if (!temp[data[k][pid]]["_level"]) {
        temp[data[k][pid]]["_level"] = 1;
      }
      data[k]["_level"] = temp[data[k][pid]]._level + 1;
      temp[data[k][pid]]["children"].push(data[k]);
    } else {
      res.push(data[k]);
    }
  }
  return res;
}

/**
 * 获取字符串字节长度
 * @param {*} s
 */
export function getStringLength(s) {
  return s.replace(/[\u4e00-\u9fa5\uff00-\uffff]/g, "**").length;
}

/**
 * 获取uuid
 */
export function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(16);
  });
}

export function formatDate(date, format) {
  // format: "yyyy年MM月dd日hh小时mm分ss秒"
  var o = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "h+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

export function GetMDay(y, m) {
  var mday = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) mday[1] = 29;
  return mday[m - 1];
}

export function getTimeList(start, end, step) {
  let _start = start.split(":");
  let _end = end.split(":");
  let result = [];
  for (let i = +_start[0]; i <= +_end[0]; i++) {
    let h = 59;
    if (i === +_end[0]) {
      h = _end[1];
    }
    for (let j = 0; j <= h; j += step) {
      let hour = i;
      let minutes = j;
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      result.push(hour + ":" + minutes);
    }
  }
  return result;
}
