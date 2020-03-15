<template>
    <div>
        <h3 class="d-flex justify-content-between my-3 page_header">
            <span>最新课程</span>
            <router-link class="more" :to="{ name: 'course', query: { curPage: 1, typeId: 0 }}">更多</router-link>
        </h3>
        <b-row>
            <b-col md="3" sm="6" v-for="(item, i) of newCourse" :key="i">
                <router-link :to="{ name: 'course_detail', query: { cid: item.cid }}">
                    <img :src="require(`@/assets/images/${item.pic}`)" alt class="my-3" />
                </router-link>
                <router-link
                    :to="{ name: 'course_detail', query: { cid: item.cid }}"
                >{{ item.title }}</router-link>
                <div>讲师：{{ item.tname }}</div>
                <h5 class="text-danger">¥{{ item.price }}</h5>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { getNewCourse } from "@/util/api.js";
export default {
    name: "HomeCourse",
    data() {
        return {
            countNum: 4, // 返回的课程储数量
            newCourse: []
        };
    },
    methods: {
        // 请求最新课程接口
        // getNewCourse() {
        //     this.axios
        //         .get("/course/newest", {
        //             params: {
        //                 countNum: this.countNum
        //             }
        //         })
        //         .then(res => {
        //             console.log(res);
        //             if (res.data.code == 200) {
        //                 this.newCourse = res.data.data;
        //             }
        //         })
        //         .catch(err => {
        //             console.error(err);
        //         });
        // }
    },
    mounted() {
        // 组件挂载时调用函数
        // this.getNewCourse();
        // 请求最新课程接口
        /* getNewCourse({
            params: {
                countNum: this.countNum
            }
        })
            .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    this.newCourse = res.data.data;
                }
            })
            .catch(err => {
                console.error(err);
            }); */
    },
    created() {
        // 请求最新课程接口
        getNewCourse({
            params: {
                countNum: this.countNum
            }
        })
            .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    this.newCourse = res.data.data;
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
};
</script>
<style scoped>
.page_header {
    border-bottom: 2px solid #ddd;
}
.more {
    font-size: 14px;
    line-height: 2;
}
</style>
