<template>
  <div id="app">
    <top-nav></top-nav>
    <mk-header></mk-header>
    <router-view></router-view>
    <mk-footer></mk-footer>
  </div>
</template>
<script>
import MkHeader from "./components/MkHeader.vue";
import MkFooter from "./components/MkFooter.vue";
import TopNav from "./components/TopNav.vue";

export default {
  name: "app",
  components: {
    MkHeader,
    MkFooter,
    TopNav
  }
  /* data() {
        return {
            Key: "" // 监听url的变化(解决路由不变，参数变，但是页面不刷新的问题)
        };
    },
    watch: {
        $route(val) {
            // 路由(包括参数)发生变化时，对Key进行赋值
            // 如果Key发生了变化，则页面执行刷新
            this.Key = new Date().getTime();
        }
    } */
};
</script>
<style scoped></style>
