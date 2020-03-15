<template>
    <b-container>
        <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
        <b-row class="my-5" v-for="(teacher, i) of teachers" :key="i">
            <b-col lg="2" md="3" sm="4">
                <img :src="require(`@/assets/images/${teacher.tpic}`)" alt class="img-fluid" />
            </b-col>
            <b-col lg="10" md="9" sm="8">
                <h3>
                    {{ teacher.tname }}
                    <span>{{ teacher.maincourse }}</span>
                </h3>
                <dl>
                    <dt>工作经历：</dt>
                    <dd>{{ teacher.experience }}</dd>
                </dl>
                <dl>
                    <dt>授课风格：</dt>
                    <dd>{{ teacher.style }}</dd>
                </dl>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { getTeachers } from "@/util/api.js";
export default {
    name: "teacher",
    data() {
        return {
            teachers: [],
            items: [
                {
                    text: "首页",
                    to: "/"
                },
                {
                    text: "名师堂",
                    active: true
                }
            ]
        };
    },
    methods: {
        // 查询教师列表
        // getTeachers() {
        //     this.axios
        //         .get("/teacher/list")
        //         .then(res => {
        //             console.log(res);
        //             if (res.data.code == 200) {
        //                 this.teachers = res.data.data;
        //             }
        //         })
        //         .catch(err => {
        //             console.error(err);
        //         });
        // }
    },
    mounted() {
        // 组件挂载时，调用getTeachers()方法
        // this.getTeachers();
    },
    created() {
        // 查询教师列表
        getTeachers()
            .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    this.teachers = res.data.data;
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
};
</script>
<style scoped>
.breadcrumb-item ~ .breadcrumb-item:before {
    content: ">";
}
</style>
