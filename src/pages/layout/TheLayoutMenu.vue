<template>
  <div>
    <el-tabs v-model="editableTabsValue" @tab-remove="removeTab" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="index==0?false:true"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "TheLayoutMenu",
  inject: ["reload"],
  data() {
    return {
      editableTabsValue: "Index",
      editableTabs: [
        { title: "首页", name: "Index", path: "/index", fullPath: "/index" }
      ]
    };
  },
  watch: {
    $route(to, from) {
      if (!to.meta.hide) {
        //面包屑不添加隐藏的详情页
        let newTabName = to.path;
        this.editableTabsValue = to.name;
        let obj = this.editableTabs.find(function(obj) {
          return obj.title === to.meta.title;
        });
        if (!obj) {
          let cope = {
            title: to.meta.title,
            name: to.name,
            path: newTabName,
            fullPath: to.fullPath
          };
          this.editableTabs.push(cope);
          //设置需要缓存的页面（如果不需要缓存的页面是否在路由添加一个字段来校验）
          let arr = [];
          if (this.$store.state.cachedViews) {
            arr = this.$store.state.cachedViews;
          }
          arr.push(to.name);
          this.$store.commit("set_cachedViews", arr);
        }
      }
    }
  },

  methods: {
    handleClick(tab, event) {
      let obj = this.editableTabs.find(function(obj) {
        return obj.title === tab.label;
      });
      this.$router.push(obj.path);
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push(nextTab.path);
            } else {
              this.$router.push("/index"); // 删除完所有标签跳回首页
            }
          }
        });
      }

      //删除标签页时，去除缓存的页面，下次点击路由时就会是新的页面
      let obj = this.editableTabs.find(function(obj) {
        return obj.name === targetName;
      });
      let arr = [];
      if (this.$store.state.cachedViews) {
        arr = this.$store.state.cachedViews;
        let arr2 = arr.filter(item => item !== obj.name);
        this.$store.commit("set_cachedViews", arr2);
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
