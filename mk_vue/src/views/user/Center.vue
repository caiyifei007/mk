<template>
    <b-container>
        <!-- 面包屑 -->
        <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
        <b-row>
            <b-col cols="3">
                <b-list-group>
                    <b-list-group-item active>
                        <router-link class="text-light" to>个人中心</router-link>
                    </b-list-group-item>
                    <b-list-group-item>
                        <router-link to>我的课程</router-link>
                    </b-list-group-item>
                    <b-list-group-item>
                        <router-link to>我的收藏</router-link>
                    </b-list-group-item>
                    <b-list-group-item>
                        <router-link to>个人资料</router-link>
                    </b-list-group-item>
                    <b-list-group-item>
                        <router-link to>修改密码</router-link>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="9">
                <h3>{{ uname }} 您好~欢迎来到个人中心</h3>
                <h3 class="page_header py-3">我的课程</h3>
                <b-row>
                    <b-col cols="4" v-for="(item, i) of orderList" :key="i">
                        <router-link :to="{ name: 'course_detail', query: { cid: item.cid }}">
                            <img :src="require(`@/assets/images/${item.pic}`)" alt class="my-3" />
                        </router-link>
                        <router-link
                            :to="{ name: 'course_detail', query: { cid: item.cid }}"
                        >{{ item.title }}</router-link>
                    </b-col>
                </b-row>
                <h3 class="page_header py-3 mt-5">我的收藏</h3>
                <b-row>
                    <b-col cols="4" v-for="(item, i) of favoriteList" :key="i">
                        <router-link :to="{ name: 'course_detail', query: { cid: item.cid }}">
                            <img :src="require(`@/assets/images/${item.pic}`)" alt class="my-3" />
                        </router-link>
                        <router-link
                            :to="{ name: 'course_detail', query: { cid: item.cid }}"
                        >{{ item.title }}</router-link>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { getOrderList, getFavoriteList } from "@/util/api.js";
export default {
    name: "userCenter",
    data() {
        return {
            items: [
                {
                    text: "首页",
                    to: "/"
                },
                {
                    text: "个人中心",
                    active: true
                }
            ],
            uname: sessionStorage.getItem("uname"),
            orderList: [],
            favoriteList: []
        };
    },
    methods: {
        // 获取用户订单列表
        /* getOrderList() {
            this.axios
                .post("/order/list", {
                    userId: sessionStorage.getItem("uid")
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.orderList = res.data.data;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }, */
        // 获取用户收藏列表
        /* getFavoriteList() {
            this.axios
                .post("/favorite/list", {
                    uid: sessionStorage.getItem("uid")
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.favoriteList = res.data.data;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } */
    },
    created() {
        // this.getOrderList();
        // this.getFavoriteList();
        // 获取用户订单列表
        getOrderList({
            userId: sessionStorage.getItem("uid")
        })
            .then(res => {
                if (res.data.code == 200) {
                    this.orderList = res.data.data;
                }
            })
            .catch(err => {
                console.error(err);
            });
        // 获取用户收藏列表
        getFavoriteList({
            uid: sessionStorage.getItem("uid")
        })
            .then(res => {
                if (res.data.code == 200) {
                    this.favoriteList = res.data.data;
                }
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
.page_header {
    border-bottom: 1px solid #ddd;
}
</style>