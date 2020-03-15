<template>
  <b-container class="p-4 bg-light mb-3">
    <span>课程等级：</span>
    <router-link
      :to="{ name: 'course', query: { curPage: 1, typeId: 0 } }"
      :class="typeId == 0 ? 'btn btn-success mx-1' : 'btn mx-1'"
      >不限</router-link
    >
    <router-link
      v-for="(item, i) of list"
      :key="i"
      :to="{ name: 'course', query: { curPage: 1, typeId: item.tpid } }"
      :class="typeId == item.tpid ? 'btn btn-success mx-1' : 'btn mx-1'"
      >{{ item.tpname }}</router-link
    >
  </b-container>
</template>
<script>
import { getTypes } from "@/util/api.js";
export default {
  name: "typeNav",
  data() {
    return {
      list: [],
      typeId: 0
    };
  },
  methods: {
    // getTypes() {
    //     this.axios
    //         .get("/type")
    //         .then(res => {
    //             if (res.data.code == 200) {
    //                 this.list = res.data.data;
    //             }
    //             // console.log(res);
    //             console.log(this.list);
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }
  },
  created() {
    // 将网址上得typeId赋值给vue变量typeId
    this.typeId = this.$route.query.typeId;
    // this.getTypes();
    // 获取课程类型
    getTypes()
      .then(res => {
        if (res.data.code == 200) {
          this.list = res.data.data;
        }
        // console.log(res);
        console.log(this.list);
      })
      .catch(err => {
        console.error(err);
      });
  },
  watch: {
    $route(n, o) {
      if (n.query.typeId != o.query.typeId) {
        this.typeId = n.query.typeId;
      }
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
