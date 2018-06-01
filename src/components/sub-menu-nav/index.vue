<template>
  <el-submenu v-if="menuNav.list && menuNav.list.length >= 1" :data-idx="menuNav.menuId + ''" :index="menuNav.menuId + ''">
    <template slot="title" @mouseenter="enter" class="hoverStyle">
      <icon-svg :name="menuNav.icon" class="site-sidebar__menu-icon"></icon-svg>
      <span>{{ menuNav.name }}</span>
    </template>
    <sub-menu-nav v-for="item in menuNav.list" :key="item.menuId" :menu-nav="item" class="hoverStyle1">
    </sub-menu-nav>
  </el-submenu>
  <el-menu-item v-else :index="menuNav.menuId + ''" :data-idx="menuNav.menuId + ''" @click="gotoRouteHandle(menuNav.url, menuNav.menuId)" class="hoverStyle2">
    <icon-svg :name="menuNav.icon" class="site-sidebar__menu-icon"></icon-svg>
    <span>{{ menuNav.name }}</span>
  </el-menu-item>
</template>

<script>
import { mapMutations } from 'vuex'
import SubMenuNav from "../sub-menu-nav";
import { getRouteNameByUrl } from "@/utils";
export default {
  name: "sub-menu-nav",
  props: {
    menuNav: Object,
    required: true
  },
  components: {
    SubMenuNav
  },
  methods: {
    ...mapMutations(["UPDATE_MENU_NAV_ACTIVE_NAME"]),
    // 跳转到菜单导航对应路由
    gotoRouteHandle(url, menuId) {
      var routeName = getRouteNameByUrl(url);
      if (/\S/.test(routeName)) {
        this.$router.push({
          name: routeName
        });
        this.UPDATE_MENU_NAV_ACTIVE_NAME({ name: menuId + '' });
      }
    },
    enter() {}
  }
};
</script>
<style>
.el-menu-item {
  width: 183px;
  background-color: #c99f63;
  padding: 0 1px 0 0px;
  color: #fff !important;
}

.el-submenu .el-menu-item {
  min-width: 183px;
}

.site-sidebar .site-sidebar__menu .el-menu-item:hover,
.el-submenu .el-menu-item:hover {
  background-color: #a67c40 !important;
}

.site-sidebar .site-sidebar__menu li.is-active {
  background-color: #a67c40 !important;
}
.site-sidebar--dark .site-sidebar__menu.el-menu .el-menu-item:focus,
.site-sidebar--dark .site-sidebar__menu.el-menu .el-menu-item:hover,
.site-sidebar--dark .site-sidebar__menu.el-menu .el-submenu .el-submenu__title:focus,
.site-sidebar--dark .site-sidebar__menu.el-menu .el-submenu .el-submenu__title:hover {
  background-color: #a67c40 !important;
}
.el-submenu__title:hover {
  background-color: #a67c40 !important;
}
.hoverStyle1:hover,
.hoverStyle2:hover {
  background-color: #a67c40 !important;
}
</style>
