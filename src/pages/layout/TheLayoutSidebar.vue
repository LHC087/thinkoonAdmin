<template>
  <aside class="sidebar" id="aslide" :class="{'sidebar-hide': !openNav}">
    <vue-scroll>
      <el-menu
        :default-active="$route.path"
        class="sidebar-menu"
        :collapse="!openNav"
        @select="menuSelect"
        :collapse-transition="false"
      >
        <template v-for="(level1, index1) in activeUsers">
          <!-- 一级菜单 -->
          <el-menu-item
            v-if="level1.children.length === 1"
            :index="level1.children[0].path"
            :key="index1"
          >
            <i :class="level1.children[0].icon"></i>
            <span slot="title">{{level1.children[0].meta.title}}</span>
          </el-menu-item>
          <el-submenu :index="index1+''" v-if="level1.children.length > 1" :key="index1+''">
            <template slot="title">
              <i :class="level1.icon"></i>
              <span slot="title">{{level1.name}}</span>
            </template>
            <template v-for="(level2, index2) in level1.children">
              <!-- 二级菜单 -->
              <el-menu-item
                v-if="!level2.children"
                :index="level2.path"
                :key="index1+'-'+index2"
                :class="level2.meta.hide?'hidden':''"
              >
                <i :class="level2.icon"></i>
                <span slot="title">{{level2.meta.title}}</span>
              </el-menu-item>
              <el-submenu
                :index="index1+'-'+index2"
                v-if="level2.children"
                :key="index1+'-'+index2"
              >
                <!-- 三级菜单 -->
                <template slot="title">
                  <i :class="level2.icon"></i>
                  {{level2.meta.title}}
                </template>
                <el-menu-item
                  v-for="(level3, index3) in level2.children"
                  :index="level3.path"
                  :key="index1+'-'+index2+'-'+index3"
                  :class="level3.meta.hide?'hidden':''"
                >
                  <i :class="level3.icon"></i>
                  <span slot="title">{{level3.meta.title}}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </vue-scroll>
  </aside>
</template>

<script>
export default {
  name: "TheLayoutSidebar",
  props: ["openNav"],
  data() {
    return {
      fromUrl: ""
    };
  },

  computed: {
    activeUsers: function() {
      return this.$router.options.routes.filter(function(level1) {
        return level1.menu;
      });
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    // $route(to, from) {}
  },
  methods: {
    menuSelect(index) {
      this.$router.push(index);
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  width: 240px;
  position: absolute;
  top: 0;
  bottom: 0;
  border-right: 1px solid #e6e6e6;
  .sidebar-menu {
    border: none;
    height: 100%;
  }
}

.sidebar-hide {
  width: 65px;
}
.hidden {
  display: none;
}
</style>