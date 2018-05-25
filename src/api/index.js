import * as common from "./modules/common";
import * as user from "./modules/user";
import * as role from "./modules/role";
import * as menu from "./modules/menu";
import * as log from "./modules/log";
import * as config from "./modules/config";
import * as oss from "./modules/oss";
import * as schedule from "./modules/schedule";
import * as sysarea from "./modules/sysarea";
import * as productbrand from "./modules/productbrand";
import * as sysidentity from "./modules/sysidentity";
import * as sysoffice from "./modules/sysoffice";
import * as syspaymode from "./modules/syspaymode";
import * as room from "./modules/room";
import * as servicecategory from "./modules/servicecategory";
import * as device from "./modules/device";
import * as sysdict from "./modules/sysdict";
import * as serviceitem from "./modules/serviceitem";
import * as servicepackagedetail from "./modules/servicepackagedetail";
import * as servicepackage from "./modules/servicepackage";
import * as serviceproduct from "./modules/serviceproduct";
import * as member from "./modules/member";
import * as miorder from "./modules/miorder";
import * as miorderdetail from "./modules/miorderdetail";
import * as miorderpay from "./modules/miorderpay";
import * as appointdeatail from "./modules/appointdeatail";
import * as appointment from "./modules/appointment";

export default {
  common, // 公共
  user, // 管理员管理
  role, // 角色管理
  menu, // 菜单管理
  log, // 系统日志
  config, // 参数管理
  oss, // 文件服务
  schedule, // 定时任务
  sysarea,
  productbrand,
  sysidentity,
  sysoffice,
  syspaymode,
  room,
  servicecategory,
  device,
  sysdict,
  serviceitem,
  servicepackagedetail,
  servicepackage,
  serviceproduct,
  member,
  miorder,
  miorderdetail,
  miorderpay,
  appointdeatail,
  appointment
};
