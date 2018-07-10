// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "@/App";
import router from "@/router"; // api: https://github.com/vuejs/vue-router
import store from "@/store"; // api: https://github.com/vuejs/vuex
import VueCookie from "vue-cookie"; // api: https://github.com/alfhen/vue-cookie
import "@/element-ui"; // api: https://github.com/ElemeFE/element
import "@/icons"; // api: http://www.iconfont.cn/
import "@/assets/scss/index.scss";
import { isAuth } from "@/utils";
import { getIEVersion } from "@/utils/browserVer";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
import VueQuillEditor from "vue-quill-editor";

Vue.use(VueQuillEditor);
Vue.use(VueCookie);
Vue.config.productionTip = false;

// 非生产环境, 适配mockjs模拟数据.        api: https://github.com/nuysoft/Mock
// if (process.env.NODE_ENV !== "production") {
//   require("@/mock");
// }

// 挂载权限方法
Vue.prototype.isAuth = isAuth;

const IEVersion = getIEVersion();

if (IEVersion === -1 || IEVersion === "edge") {
  /* eslint-disable no-new */
  new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: { App }
  });
} else {
  /* eslint-disable no-new */
  new Vue({
    el: "#app",
    template: `
      <div>
        <h1 style="padding: 10px 20px;">抱歉，该项目使用了大量 HTML5 新特性，不支持 IE 浏览器。</h1>
        <h2 style="padding: 10px 20px;">推荐最新版本的 Chrome 和火狐，或者 QQ、搜狗等浏览器的极速模式。Windows 10 用户可以采用 Edge。</h2>
      </div>
    `
  });
}

