<template>
    <b-container>
        <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
        <b-row>
            <b-col md="6" sm="12">
                <img :src="detail.pic" alt class="img_width" />
            </b-col>
            <b-col md="6" sm="12">
                <h2>{{ detail.title }}</h2>
                <ul class="list-unstyled">
                    <li>讲师：{{ detail.tname }}</li>
                    <li>课时：{{ detail.cLength }}</li>
                    <li>开课时间：{{ detail.startTime }}</li>
                    <li>
                        上课地点：{{ detail.address }}
                        <router-link to="/address">查看各校区地址</router-link>
                    </li>
                </ul>
                <div class="mb-2">
                    课程价格：
                    <h3 class="text-danger d-inline-block">¥ {{ detail.price }}</h3>
                </div>
                <div class="course_link">
                    <span @click="addCart2" class="btn btn-warning">
                        <em class="icon-cart"></em>加入购物车
                    </span>
                    <a href id="favorite" class="btn btn-secondary ml-3" @click="addFavorite2">加入收藏</a>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <b-col cols="12">
                <h3 class="title">
                    <span>课程详情</span>
                </h3>
                <div class="details" v-html="detail.details"></div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { getCourseDetail, addCart, addFavorite } from "@/util/api.js";
export default {
    name: "courseDetail",
    data() {
        return {
            items: [
                {
                    text: "首页",
                    to: "/"
                },
                {
                    text: "全部课程",
                    active: true
                }
            ],
            detail: {}
        };
    },
    methods: {
        // 查找课程详情
        // getCourseDetail() {
        //     this.axios
        //         .get("/course/detail", {
        //             params: {
        //                 cid: this.$route.query.cid
        //             }
        //         })
        //         .then(res => {
        //             if (res.data.code == 200) {
        //                 this.detail = res.data.data;
        //                 this.detail.pic = require("@/assets/images/" +
        //                     this.detail.pic);
        //             }
        //             console.log(this.detail);
        //         })
        //         .catch(err => {
        //             console.error(err);
        //         });
        // },
        // 添加购物车
        addCart2() {
            if (this.$global.isLogin) {
                // 如果用户已登录，则执行添加购物车
                // this.axios
                //     .post("/cart/add", {
                //         cid: this.$route.query.cid,
                //         uid: sessionStorage.getItem("uid")
                //     })
                //     .then(res => {
                //         if (res.data.code == 200) {
                //             alert("添加购物车成功");
                //         }
                //     })
                //     .catch(err => {
                //         console.error(err);
                //     });
                addCart({
                    cid: this.$route.query.cid,
                    uid: sessionStorage.getItem("uid")
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            alert("添加购物车成功");
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                // 如果用户没有登录，则跳转到登录页面
                alert("请先登录");
                this.$router.push("/login");
            }
        },
        // 添加收藏
        addFavorite2() {
            if (this.$global.isLogin) {
                // this.axios
                //     .post("/favorite/add", {
                //         cid: this.$route.query.cid,
                //         uid: sessionStorage.getItem("uid")
                //     })
                //     .then(res => {
                //         if (res.data.code == 200) {
                //             alert("成功添加收藏");
                //         } else if (res.data.code == 201) {
                //             alert("已收藏过");
                //         }
                //         console.log(res);
                //     })
                //     .catch(err => {
                //         console.error(err);
                //     });
                addFavorite({
                    cid: this.$route.query.cid,
                    uid: sessionStorage.getItem("uid")
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            alert("成功添加收藏");
                        } else if (res.data.code == 201) {
                            alert("已收藏过");
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                this.$router.push("/login");
            }
        }
    },
    created() {
        // this.getCourseDetail();
        // 查找课程详情
        getCourseDetail({
            params: {
                cid: this.$route.query.cid
            }
        })
            .then(res => {
                if (res.data.code == 200) {
                    this.detail = res.data.data;
                    this.detail.pic = require("@/assets/images/" +
                        this.detail.pic);
                }
                console.log(this.detail);
            })
            .catch(err => {
                console.error(err);
            });
    },
    mounted() {}
};
</script>
<style scoped>
.breadcrumb-item ~ .breadcrumb-item:before {
    content: ">";
}
.img_width {
    width: 400px;
}
.icon-cart {
    display: inline-block;
    vertical-align: middle;
    width: 19px;
    height: 14px;
    background: url("~@/assets/images/iconlist.png") no-repeat 0 -210px;
    margin: 0 9px 2px 0;
}
#addCart {
    color: #fff;
}
.title {
    border-bottom: 2px solid #ddd;
    margin: 20px 0;
}
</style>