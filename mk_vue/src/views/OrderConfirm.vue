<template>
    <b-container>
        <!-- 面包屑 -->
        <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
        <!-- 订单内容 -->
        <h2 class="order_title">
            选择收货地址
            <a href>管理收货地址</a>
        </h2>
        <div class="user_address">
            <ul class="list-unstyled">
                <li class="active">
                    <span></span>韩小米 18512345678 广东 广州市 海珠区
                </li>
                <li>
                    <span></span>张大胖 18512345678 北京 北京市 海淀区
                </li>
                <li>
                    <span></span>王小明 18512345678 河北 石家庄市 桥西区
                </li>
            </ul>
        </div>
        <h2 class="order_title">确认订单信息</h2>
        <div class="order_list">
            <h3 class="clearfloat">
                <span>商品信息</span>
                <span>单价</span>
                <span>数量</span>
                <span>小计</span>
            </h3>
            <ul class="list-unstyled">
                <li v-for="(item, i) of list" :key="i">
                    <img :src="require(`@/assets/images/${item.pic}`)" alt />
                    <h4>{{ item.title }}</h4>
                    <span>{{ item.price.toFixed(2) }}</span>
                    <em>{{ item.count }}</em>
                    <strong>{{ (item.count * item.price).toFixed(2) }}</strong>
                </li>
            </ul>
        </div>
        <h2 class="order_title">
            备注信息：
            <input type="text" />
        </h2>
        <div class="order_sum">
            <ul class="list-unstyled">
                <li>
                    <span>商品总金额：</span>
                    <span id="priceSum">¥ {{ orderAmount ? orderAmount.toFixed(2) : 0 }}</span>
                </li>
                <li>
                    <span>应付金额：</span>
                    <strong id="paySum">¥ {{ orderAmount ? orderAmount.toFixed(2) : 0 }}</strong>
                </li>
                <li>
                    <button type="button" @click="orderCommit2">提交订单</button>
                </li>
            </ul>
        </div>
    </b-container>
</template>
<script>
import { orderCommit } from "@/util/api.js";
export default {
    name: "orderComfirm",
    data() {
        return {
            items: [
                {
                    text: "首页",
                    to: "/"
                },
                {
                    text: "提交订单",
                    active: true
                }
            ],
            list: [],
            orderAmount: 0,
            ctid: []
        };
    },
    methods: {
        getSelected() {
            var selected = sessionStorage.getItem("selected");
            // 减json字符串解析成JS中的变量(数组，对象...)
            this.list = JSON.parse(selected);
            this.orderAmount = parseInt(sessionStorage.getItem("orderAmount"));
            // console.log(this.orderPrice);
        },
        // 提交订单接口的调用
        orderCommit2() {
            // this.axios
            //     .post("/order/add", {
            //         uid: sessionStorage.getItem("uid"),
            //         orderAmount: this.orderAmount,
            //         selected: sessionStorage.getItem("selected")
            //     })
            //     .then(res => {
            //         console.log(res);
            //         if (res.data.code == 200) {
            //             alert("提交成功");
            //         }
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     });
            orderCommit({
                uid: sessionStorage.getItem("uid"),
                orderAmount: this.orderAmount,
                selected: sessionStorage.getItem("selected")
            })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        // 循环遍历list中的课程id给购物车，以便删除对应的数据
                        for (var i = 0; i < this.list.length; i++) {
                            this.ctid.push(this.list[i].ctid);
                        }
                        this.bus.$emit("order_phone", this.ctid);
                        this.ctid = [];
                        // console.log(this.ctid);
                        // 订单提交后，删除sessionStorage中购物车传过来的数据
                        sessionStorage.removeItem("orderAmount");
                        sessionStorage.removeItem("selected");

                        this.getSelected();
                        alert("提交成功");
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    created() {
        this.getSelected();
    },
    mounted() {
        console.log(sessionStorage);
    }
};
</script>
<style scoped>
.breadcrumb-item ~ .breadcrumb-item:before {
    content: ">";
}
.order_title {
    margin-top: 40px;
    font-size: 14px;
    color: #333;
    margin-bottom: 15px;
}
.order_title > a {
    float: right;
    font-weight: lighter;
    text-decoration: underline;
}
.order_title > input {
    width: 800px;
    height: 32px;
    border: 1px solid #ccc;
}
.user_address {
    border: 1px solid #eee;
    background: #fff;
    padding: 20px 100px;
}
.user_address > ul > li {
    line-height: 34px;
    height: 34px;
    border: 1px solid transparent;
    font-size: 14px;
    color: #999;
    cursor: pointer;
}
.user_address > ul > li:hover {
    background: #f5f5f5;
}
.user_address > ul > li > span {
    float: left;
    width: 35px;
    height: 34px;
    margin-right: 50px;
}
.user_address > ul > li.active {
    background: #fffce4;
    border: 1px solid #ff6600;
}
.user_address > ul > li.active span {
    background: #ff6600 url(~@/assets/images/iconlist.png) no-repeat 7px -741px;
}
.order_list > h3 {
    line-height: 36px;
    border-top: 2px solid #ddd;
    border-bottom: 1px solid #ddd;
    color: #999;
    font-weight: lighter;
    font-size: 14px;
}
.order_list > h3 > span {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
}
.order_list > h3 > span:nth-child(1) {
    width: 55%;
}
.order_list > h3 > span:nth-child(2) {
    width: 15%;
}
.order_list > h3 > span:nth-child(3) {
    width: 15%;
}
.order_list > h3 > span:nth-child(4) {
    width: 15%;
}
.order_list > ul > li {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
}
.order_list > ul > li > img,
.order_list > ul > li > h4,
.order_list > ul > li > span,
.order_list > ul > li > em,
.order_list > ul > li > strong {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
}
.order_list > ul > li > img {
    width: 20%;
    max-height: 100px;
}
.order_list > ul > li > h4 {
    text-align: left;
    width: 35%;
    font-weight: lighter;
    padding-left: 20px;
}
.order_list > ul > li > span {
    width: 15%;
}
.order_list > ul > li > em {
    width: 15%;
    font-style: normal;
}
.order_list > ul > li > strong {
    width: 15%;
    font-weight: bold;
    color: #f60;
}
.order_sum {
    margin-top: 40px;
    border-top: 1px solid #ddd;
    padding-top: 10px;
}
.order_sum > ul > li {
    line-height: 30px;
    text-align: right;
    font-size: 14px;
}
.order_sum > ul > li > span,
.order_sum > ul > li > strong {
    display: inline-block;
    text-align: right;
    width: 120px;
    font-style: normal;
}
.order_sum > ul > li > strong {
    color: #f60;
}
.order_sum > ul > li > button {
    width: 120px;
    height: 36px;
    background: #f63;
    font-size: 18px;
    color: #fff;
    border: none;
    margin-top: 10px;
}
.order_sum > ul > li > button:hover {
    background: #fc5a25;
}
</style>