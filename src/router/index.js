import Vue from "vue";
import Router from "vue-router";

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有开发环境使用懒加载
const _import = require("./import-" + process.env.NODE_ENV);

Vue.use(Router);

// 路由定义使用说明:
// 1. 代码中路由统一使用name属性跳转.
// 2. 开放path属性用做简短路由, 比如: '/a1', 访问地址: www.renren.io/#/a1
export default new Router({
  mode: "hash",
  routes: [
    { path: "/404", component: _import("error/404"), name: "404", desc: "404未找到" },
    { path: "/login", component: _import("login/index"), name: "login", desc: "登录" },
    {
      path: "/register",
      component: _import("register/index"),
      name: "register",
      desc: "注册"
    },
    {
      path: "/",
      component: _import("layout/index"),
      name: "layout",
      redirect: { name: "home" },
      desc: "上左右整体布局",
      children: [
        // 通过isTab属性, 设定是否通过tab标签页展示内容
        { path: "/home", component: _import("home/index"), name: "home", desc: "首页" },
        { path: "/layout-setting", component: _import("layout/setting"), name: "setting", desc: "布局设置" },
        { path: "/user", component: _import("user/index"), name: "user", desc: "管理员管理", meta: { isTab: false } },
        { path: "/role", component: _import("role/index"), name: "role", desc: "角色管理", meta: { isTab: false } },
        { path: "/menu", component: _import("menu/index"), name: "menu", desc: "菜单管理", meta: { isTab: false } },
        { path: "/sql", component: _import("sql/index"), name: "sql", desc: "SQL监控", meta: { isTab: false } },
        { path: "/schedule", component: _import("schedule/index"), name: "schedule", desc: "定时任务", meta: { isTab: false } },
        { path: "/config", component: _import("config/index"), name: "config", desc: "参数管理", meta: { isTab: false } },
        { path: "/oss", component: _import("oss/index"), name: "oss", desc: "文件上传", meta: { isTab: false } },
        { path: "/log", component: _import("log/index"), name: "log", desc: "系统日志", meta: { isTab: false } },
        { path: "/more_settings", component: _import("more_settings/index"), name: "more_settings", desc: "更多设置", meta: { isTab: false } },
        { path: "/more_settings/shop_list", component: _import("more_settings/shop_list"), name: "shop_list", desc: "门店列表", meta: { isTab: false } },
        {
          path: "/more_settings/individuation",
          component: _import("more_settings/individuation/index"),
          name: "individuation",
          desc: "个性化",
          meta: { isTab: false }
        },
        {
          path: "/more_settings/product_list",
          component: _import("more_settings/product_list"),
          name: "product_list",
          desc: "产品列表",
          meta: { isTab: false }
        },
        {
          path: "/more_settings/user_list",
          component: _import("more_settings/user_list"),
          name: "user_list",
          desc: "用户列表",
          meta: { isTab: false }
        },
        {
          path: "/sysdict",
          component: _import("sysdict/index"),
          name: "sysdict",
          desc: "字典管理",
          meta: { isTab: false }
        },
        {
          path: "/member",
          component: _import("member/index"),
          name: "member",
          desc: "会员",
          meta: { isTab: false }
        },
        {
          path: "/appointment",
          component: _import("appointment/index"),
          name: "appointment",
          desc: "预约",
          meta: { isTab: false }
        },
        {
          path: "/appointmentTip",
          component: _import("appointment/tip"),
          name: "appointmentTip",
          desc: "预约提醒",
          meta: { isTab: false }
        },
        {
          path: "/createorder",
          component: _import("createorder/index"),
          name: "createorder",
          desc: "开单",
          meta: { isTab: false }
        },
        {
          path: "/createorder/:orderId",
          component: _import("createorder/index"),
          name: "createorder",
          desc: "开单",
          meta: { isTab: false }
        },
        {
          path: "/miorder",
          component: _import("miorder/main"),
          name: "miorder",
          desc: "订单",
          meta: { isTab: false }
        },
        {
          path: "/ordervisit",
          component: _import("ordervisit/index"),
          name: "ordervisit",
          desc: "回访提醒",
          meta: { isTab: false }
        },
        {
          path: "/knowledge",
          component: _import("knowledge/index"),
          name: "knowledge",
          desc: "知识库管理",
          meta: { isTab: false }
        },
        {
          path: "/knowledgegrid",
          component: _import("knowledge/grid"),
          name: "knowledgegrid",
          desc: "知识库",
          meta: { isTab: false }
        },
        {
          path: "/sysmerchant",
          component: _import("sysmerchant/index"),
          name: "sysmerchant",
          desc: "商户管理",
          meta: { isTab: false }
        }
      ],
      beforeEnter(to, from, next) {
        let token = Vue.cookie.get("token");
        if (!token || !/\S/.test(token)) {
          next({ name: "login" });
        }
        next();
      }
    },
    { path: "*", redirect: { name: "404" } }
  ]
});
