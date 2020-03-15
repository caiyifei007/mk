<template>
    <b-container>
        <!-- 面包屑 -->
        <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
        <!-- 主体内容 -->
        <div class="cart">
            <div class="cart_con">
                <div class="cartcon_title clearfloat">
                    <span>
                        <input
                            type="checkbox"
                            :checked="checkAllState"
                            @click="checkAll"
                            class="checkbox_all"
                        /> 全选
                    </span>
                    <span>课程信息</span>
                    <span>单价</span>
                    <span>数量</span>
                    <span>金额</span>
                    <span>操作</span>
                </div>
                <div class="cartcon_list">
                    <h2 v-show="this.$global.isLogin == false">
                        请登录后查看您的购物车
                        <router-link to="/login" class="btn btn-warning text-white">去登录</router-link>
                    </h2>
                    <h2 v-show="this.$global.isLogin == true && list.length == 0">
                        购物车中没有任何课程！
                        <router-link
                            :to="{ name: 'course', query: { curPage: 1, typeId: 0 } }"
                        >查看全部课程</router-link>
                    </h2>
                    <ul class="list-unstyled">
                        <li class="clearfloat" v-for="(item, i) of list" :key="i">
                            <span>
                                <input
                                    type="checkbox"
                                    :checked="item.isChecked"
                                    @change="checkItem(i)"
                                    class="cart_checkbox"
                                />
                            </span>
                            <a href class="cart_img">
                                <img :src="require(`@/assets/images/${item.pic}`)" alt />
                            </a>
                            <a href class="cart_title">{{ item.title }}</a>
                            <i>¥ {{ item.price }}</i>
                            <div>
                                <span @click="subNum(i)">-</span>
                                <input type="text" :value="item.count" disabled />
                                <span @click="addNum(i)">+</span>
                            </div>
                            <strong>¥ {{ item.count * item.price }}</strong>
                            <em @click="cartDel2(i)"></em>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cart_header">
                <span class="btn btn-outline-primary mr-2" @click="cartEmpty2">清空购物车</span>
                <span class="mr-2">
                    已选课程
                    <em>{{ checkCount }}</em>门
                </span>
                <span class="mr-2">
                    总金额：
                    <strong>¥ {{ totalPrice }}</strong>
                </span>
                <button type="button" class="ml-2" @click="orderConfirm">结算</button>
            </div>
        </div>
    </b-container>
</template>
<script>
import { getCart, cartDel, cartEmpty } from "@/util/api.js";
export default {
    name: "cart",
    data() {
        return {
            items: [
                {
                    text: "首页",
                    to: "/"
                },
                {
                    text: "购物车",
                    active: true
                }
            ],
            list: [],
            checkAllState: false,
            checkCount: 0, // 选中商品的数量
            totalPrice: 0
        };
    },
    methods: {
        // 查询购物车的内容
        /* getCart() {
            if (this.$global.isLogin) {
                this.axios
                    .post("/cart/list", {
                        uid: sessionStorage.getItem("uid")
                    })
                    .then(res => {
                        console.log(res.data.data);
                        if (res.data.code == 200) {
                            this.list = res.data.data;
                            // 给每个商品添加选中状态
                            for (var i = 0; i < this.list.length; i++) {
                                this.list[i].isChecked = false;
                            }
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                this.$router.push("/login");
            }
        }, */
        // 删除购物车中商品
        cartDel2(i) {
            if (this.$global.isLogin) {
                /* this.axios
                    .post(
                        "/cart/del",
                        this.qs.stringify({
                            ctid: this.list[i].ctid
                        })
                    )
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list.splice(i, 1);
                            this.checkCount--;
                            alert("删除成功");
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    }); */
                cartDel({
                    ctid: this.list[i].ctid
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list.splice(i, 1);
                            this.checkCount--;
                            alert("删除成功");
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        },
        // 清空购物车
        cartEmpty2() {
            if (this.$global.isLogin) {
                /* this.axios
                    .post(
                        "/cart/empty",
                        this.qs.stringify({
                            uid: sessionStorage.getItem("uid")
                        })
                    )
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = [];
                            this.checkCount = 0;
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    }); */
                cartEmpty({
                    uid: sessionStorage.getItem("uid")
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = [];
                            this.checkCount = 0;
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                alert("请先登录");
                this.router.push("/login");
            }
        },
        // 全选
        checkAll() {
            // 选中与未选中来回切换
            this.checkAllState = !this.checkAllState;
            // 循环遍历list列表中的每一项跟全选按钮同步
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].isChecked = this.checkAllState;
            }
            if (this.checkAllState) {
                this.checkCount = this.list.length;
            } else {
                this.checkCount = 0;
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].isChecked) {
                        this.checkCount++;
                    }
                }
            }
            // 全选切换执行选中商品价格计算
            this.totalPrice2();
        },
        // 单选
        checkItem(i) {
            // 当前商品的选中状态切换
            this.list[i].isChecked = !this.list[i].isChecked;
            // 单个商品选中则商品选中的数量加一，否则减一
            if (this.list[i].isChecked) {
                this.checkCount += 1;
            } else {
                this.checkCount -= 1;
            }
            // 如果商品选中数量等于全部商品数量则全选切换为true，否则为false
            // if (this.checkCount == this.list.length) {
            //     this.checkAllState = true;
            // } else {
            //     this.checkAllState = false;
            // }
            this.checkAllState =
                this.checkCount == this.list.length ? true : false;
            // 单选切换执行选中商品价格计算
            this.totalPrice2();
        },
        // 计算选中商品的总价
        totalPrice2() {
            for (var i = 0, total = 0; i < this.list.length; i++) {
                if (this.list[i].isChecked) {
                    total += this.list[i].count * this.list[i].price;
                }
            }
            this.totalPrice = total;
        },
        // 商品数量递增(+1)
        addNum(i) {
            // 当前商品数量+1
            this.list[i].count++;
            // 计算订单金额
            this.totalPrice2();
        },
        // 商品数量递减(-1)
        subNum(i) {
            // 当前商品数量-1
            if (this.list[i].count > 1) {
                this.list[i].count--;
            }
            // 计算订单金额
            this.totalPrice2();
        },
        // 跳转提交订单页面
        orderConfirm() {
            if (this.totalPrice > 0) {
                // 获取选中的商品
                var selected = [];
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].isChecked) {
                        selected.push(this.list[i]);
                    }
                }
                // 将选中的商品存到session中
                sessionStorage.setItem("selected", JSON.stringify(selected));
                sessionStorage.setItem("orderAmount", this.totalPrice);
                // 跳转到订单确认页面
                this.$router.push("/order_confirm");
            } else {
                alert("请选择商品");
            }
        }
    },
    computed: {
        // totalPrice() {
        //     for (var i = 0, total = 0; i < this.list.length; i++) {
        //         if (this.list[i].isChecked) {
        //             this.totalPrice += this.list[i].count * this.list[i].price;
        //         }
        //     }
        // }
    },
    created() {
        // this.getCart();

        // 查看购物车列表
        if (this.$global.isLogin) {
            /* this.axios
                .post("/cart/list", {
                    uid: sessionStorage.getItem("uid")
                })
                .then(res => {
                    console.log(res.data.data);
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        // 给每个商品添加选中状态
                        for (var i = 0; i < this.list.length; i++) {
                            this.list[i].isChecked = false;
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                }); */
            getCart({
                uid: sessionStorage.getItem("uid")
            })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        // 给每个商品添加选中状态
                        for (var i = 0; i < this.list.length; i++) {
                            this.list[i].isChecked = false;
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            this.$router.push("/login");
        }
        // 订单提交后，删除数据
        this.bus.$once("order_phone", data => {
            // console.log(data);
            for (var i = 0; i < this.list.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (data[j] == this.list[i].ctid) {
                        cartDel({
                            ctid: this.list[i].ctid
                        })
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.list.splice(i, 1);
                                }
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    }
                }
            }
        });
    },
    mounted() {}
};
</script>
<style scoped>
.breadcrumb-item ~ .breadcrumb-item:before {
    content: ">";
}
.cart {
    margin-top: 20px;
}
.cart_header {
    text-align: right;
    font-size: 14px;
    line-height: 36px;
}
.cart_header > button {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    height: 36px;
    background: #f63;
    border: none;
    color: #fff;
    font-size: 18px;
}
.cart_header > span,
.cart_header > a {
    display: inline-block;
    vertical-align: middle;
}
.cart_header > span > em {
    font-style: normal;
    color: #f63;
}
.cart_header > span > strong {
    font-size: 18px;
    color: #f63;
}
.cart_header > p {
    float: left;
    width: 110px;
    text-align: center;
}
.cart_con {
    margin: 10px 0;
    font-size: 14px;
}
.cartcon_title {
    background: #eee;
    border: 1px solid #ddd;
}
.cartcon_title > span {
    line-height: 33px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
}
.cartcon_title > span:nth-child(1) {
    width: 10%;
}
.cartcon_title > span:nth-child(2) {
    width: 50%;
}
.cartcon_title > span:nth-child(3) {
    width: 10%;
}
.cartcon_title > span:nth-child(4) {
    width: 10%;
}
.cartcon_title > span:nth-child(5) {
    width: 10%;
}
.cartcon_title > span:nth-child(6) {
    width: 10%;
}
/*���ﳵ�б�*/
.cartcon_list h2 {
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    font-weight: lighter;
    border: 1px solid #ddd;
    border-top: none;
}
.cartcon_list h2 a {
    color: #f60;
}
.cartcon_list ul li {
    padding: 20px 0;
    border: 1px solid #ddd;
    border-top: none;
}
.cartcon_list > ul > li > span,
.cartcon_list > ul > li > span > input,
.cartcon_list > ul > li > a,
.cartcon_list > ul > li > i,
.cartcon_list > ul > li > div,
.cartcon_list > ul > li > div > span,
.cartcon_list > ul > li > div > input,
.cartcon_list > ul > li > strong,
.cartcon_list > ul > li > em {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    font-style: normal;
}
.cartcon_list > ul > li > span {
    width: 10%;
}
.cartcon_list > ul > li > a.cart_img {
    width: 15%;
    max-height: 100px;
    overflow: hidden;
}
.cartcon_list > ul > li > a.cart_img img {
    max-width: 100%;
}
.cartcon_list > ul > li > a.cart_title {
    width: 35%;
    padding-left: 40px;
    font-size: 18px;
    text-align: left;
}
.cartcon_list > ul > li > i {
    width: 10%;
}
.cartcon_list > ul > li > div {
    width: 10%;
}
.cartcon_list > ul > li > div > span {
    width: 20px;
    height: 20px;
    background: #e8e8e8;
    line-height: 20px;
}
.cartcon_list > ul > li > div > span:hover {
    cursor: pointer;
    background: #eee;
}
.cartcon_list > ul > li > div > input {
    width: 28px;
    height: 18px;
    border: 1px solid #ccc;
}
.cartcon_list > ul > li > strong {
    width: 10%;
    color: #f63;
}
.cartcon_list > ul > li > em {
    width: 10%;
    height: 14px;
    background: url(~@/assets/images/iconlist.png) no-repeat 35px -460px;
    cursor: pointer;
}
.cartcon_list > ul > li > em:hover {
    background-position: 35px -480px;
}
</style>