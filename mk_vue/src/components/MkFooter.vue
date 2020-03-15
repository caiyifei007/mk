<template>
    <b-container class="my-5">
        <b-row>
            <b-col md="8">
                <b-row>
                    <b-col cols="3" v-for="(item, i) of list" :key="i">
                        <h5>{{ item.name }}</h5>
                        <ul class="list-unstyled">
                            <li>
                                <a href="#">{{ item.detail }}</a>
                            </li>
                            <li>
                                <a href="#">{{ item.detail2 }}</a>
                            </li>
                            <li>
                                <a href="#">{{ item.detail3 }}</a>
                            </li>
                            <li>
                                <a href="#">{{ item.detail4 }}</a>
                            </li>
                        </ul>
                    </b-col>
                </b-row>
            </b-col>
            <b-col md="4" class="py-5">
                <dt id="hotline"></dt>
                <dd>
                    客服热线
                    <br />4008-200-200(9:00 - 4:00)
                </dd>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <!-- 页脚的下半部分 -->
            <div cols="12" class="footer_bottom">
                <ul class="list-inline">
                    <li
                        class="list-inline-item"
                    >Copyright © 2016 iqianduan.com, All Rights Reserved 版权所有</li>
                </ul>
            </div>
        </b-row>
        <b-row>
            <div cols="12" class="footer_bottom">
                <ul class="list-inline">
                    <li class="list-inline-item">北京前端教育科技有限公司</li>
                    <li class="list-inline-item">京ICP备123456号-1</li>
                    <li class="list-inline-item">京公网安备110180201608号</li>
                </ul>
            </div>
        </b-row>
    </b-container>
</template>
<script>
export default {
    name: "mkFooter",
    data() {
        return {
            list: [
                {
                    name: "关于i前端",
                    detail: "发展历程",
                    detail3: "管理团队",
                    detail2: "企业文化",
                    detail4: "加入我们"
                },
                {
                    name: "新手帮助",
                    detail: "学员账号",
                    detail3: "选课流程",
                    detail2: "网报流程",
                    detail4: "上课地点"
                },
                {
                    name: "常见问题",
                    detail: "如何注册",
                    detail3: "如何搜索",
                    detail2: "如何报名",
                    detail4: "如何缴费"
                },
                {
                    name: "练习我们",
                    detail: "校区电话",
                    detail3: "意见建议",
                    detail2: "联系邮箱"
                }
            ]
        };
    }
};
</script>
<style scoped>
.footer_bottom {
    margin: 0 auto;
}

#hotline {
    float: left;
    width: 40px;
    height: 39px;
    background: url("~@/assets/images/iconlist.png") no-repeat 0 -410px;
    margin: 6px 10px 0 0;
}
</style>