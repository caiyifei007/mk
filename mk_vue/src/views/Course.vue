<template>
  <b-container>
    <!-- 面包屑 -->
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <!-- 课程等级导航 -->
    <type-nav></type-nav>
    <!-- 分割线 -->
    <div class="mb-3" style="border: 1px solid #0aa"></div>
    <!-- 课程展示内容 -->
    <b-row class="mb-5" v-for="(item, i) of allCourse" :key="i">
      <b-col cols="3">
        <router-link :to="{ name: 'course_detail', query: { cid: item.cid } }">
          <img
            :src="require(`@/assets/images/${item.pic}`)"
            alt
            class="img-fluid"
          />
        </router-link>
      </b-col>
      <b-col cols="5" class="course_desc">
        <router-link :to="{ name: 'course_detail', query: { cid: item.cid } }">
          <h3>{{ item.title }}</h3>
        </router-link>
        <p>讲师：{{ item.tname }}</p>
        <p>课时：{{ item.cLength }}</p>
        <p>开课时间：{{ item.startTime }}</p>
        <p>
          上课地点：{{ item.address }}
          <router-link to>查看各校区地址</router-link>
        </p>
      </b-col>
      <b-col cols="2">
        <h2 class="text-danger my-5">¥ {{ item.price }}</h2>
      </b-col>
      <b-col cols="2">
        <router-link
          :to="{ name: 'course_detail', query: { cid: item.cid } }"
          class="btn btn-success my-5"
          >查看详情</router-link
        >
      </b-col>
    </b-row>
    <!-- 分页导航 -->
    <b-pagination-nav
      :link-gen="linkGen"
      :number-of-pages="pageTotal"
      use-router
    ></b-pagination-nav>
  </b-container>
</template>
<script>
import TypeNav from "@/components/TypeNav";
import { getCourse } from "@/util/api.js";
export default {
  name: "course",
  data() {
    return {
      allCourse: [],
      curPage: 1, // 查看哪一页，默认为第一页
      pageSize: 3, // 每一页显示的数据量
      total: 0, // 总的数据量
      pageTotal: 1, // 总的页数
      typeId: 0, // 课程类型
      items: [
        {
          text: "首页",
          to: "/"
        },
        {
          text: "全部课程",
          active: true
        }
      ]
    };
  },
  components: {
    TypeNav
  },
  methods: {
    // 查看全部课程
    // getCourse() {
    //     this.axios
    //         .get("/course/list", {
    //             params: {
    //                 curPage: this.curPage,
    //                 typeId: this.typeId
    //             }
    //         })
    //         .then(res => {
    //             if (res.data.code == 200) {
    //                 var data = res.data.data;
    //                 this.allCourse = data.list;
    //                 this.pageSize = data.pageSize;
    //                 this.total = data.total;
    //                 this.pageTotal = data.pageTotal;
    //             }
    //             console.log(this.allCourse);
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // },
    // pageNum是当前页码
    linkGen(pageNum) {
      // 在vue中如何做页面跳转
      // console.log(this.curPage);
      // this.$router.go(0);
      return {
        path: `/course?curPage=${pageNum}&typeId=${this.typeId}`
      };
    }
  },
  created() {
    // 组件创建完成后，给参数赋值
    this.curPage = this.$route.query.curPage;
    this.typeId = this.$route.query.typeId;
    // 创建时调用请求函数
    // this.getCourse();
    // 查看全部课程
    getCourse({
      params: {
        curPage: this.curPage,
        typeId: this.typeId
      }
    })
      .then(res => {
        if (res.data.code == 200) {
          var data = res.data.data;
          this.allCourse = data.list;
          this.pageSize = data.pageSize;
          this.total = data.total;
          this.pageTotal = data.pageTotal;
        }
        console.log(this.allCourse);
      })
      .catch(err => {
        console.error(err);
      });
  },
  mounted() {},
  watch: {
    // 解决路由不变，参数变，但是页面不刷新
    $route(to, from) {
      //监听路由是否变化
      if (
        to.query.curPage != from.query.curPage ||
        to.query.typeId != from.query.typeId
      ) {
        this.curPage = to.query.curPage;
        this.typeId = to.query.typeId;
        getCourse({
          params: {
            curPage: this.curPage,
            typeId: this.typeId
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              var data = res.data.data;
              this.allCourse = data.list;
              this.pageSize = data.pageSize;
              this.total = data.total;
              this.pageTotal = data.pageTotal;
            }
            console.log(this.allCourse);
          })
          .catch(err => {
            console.error(err);
          }); //重新加载数据 即重新请求数据
      }
    }
  }
};
</script>
<style scoped>
.course_desc > p {
  margin: 0;
}
.breadcrumb-item ~ .breadcrumb-item:before {
  content: ">";
}
</style>
