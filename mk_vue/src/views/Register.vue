<template>
    <b-container>
        <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
        <b-row class="w-50">
            <b-col cols="12">
                <h2 class="text-center">新用户注册</h2>
                <b-form @submit="register">
                    <b-form-group
                        id="input-group-1"
                        label="用户名:"
                        label-for="uname"
                        description="请输入用户名"
                    >
                        <b-form-input
                            id="uname"
                            v-model="form.uname"
                            type="text"
                            required
                            @blur="checkUname"
                            placeholder="用户名"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="手机号:" label-for="phone">
                        <b-form-input
                            id="phone"
                            type="text"
                            v-model="form.phone"
                            @blur="checkPhone"
                            required
                            :state="vaildatePhone"
                            placeholder="请输入手机号"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="vaildatePhone">手机号非法</b-form-invalid-feedback>
                        <b-form-valid-feedback :state="vaildatePhone">正确</b-form-valid-feedback>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="密码:" label-for="upwd">
                        <b-form-input
                            id="upwd"
                            type="password"
                            v-model="form.upwd"
                            required
                            placeholder="请输入密码"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="确认密码:" label-for="upwd2">
                        <b-form-input
                            id="upwd2"
                            type="password"
                            v-model="form.upwd2"
                            required
                            placeholder="确认密码"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4">
                        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                            <b-form-checkbox value="me">我已阅读并同意用户注册协议</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>

                    <b-button type="submit" variant="primary">注册</b-button>
                    <b-button type="reset" variant="danger" class="ml-3">取消</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { userRegister, verifyUname, verifyPhone } from "@/util/api.js";
export default {
    name: "register",
    data() {
        return {
            form: {
                uname: "",
                upwd: "",
                upwd2: "",
                phone: ""
            },
            items: [
                {
                    text: "首页",
                    to: "/"
                },
                {
                    text: "注册",
                    active: true
                }
            ]
        };
    },
    methods: {
        // 注册表单提交方法
        register() {
            // console.log(this.form);
            // this.axios
            //     .post("/user/register", qs.stringify(this.form))
            //     .then(res => {
            //         if (res.data.code == 200) {
            //             var data = res.data.data;
            //             sessionStorage.uid = data.uid;
            //             sessionStorage.uname = data.uname;
            //             alert("恭喜你，注册成功");
            //             this.$router.go(-1);
            //         }
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     });
            userRegister(this.form)
                .then(res => {
                    if (res.data.code == 200) {
                        var data = res.data.data;
                        sessionStorage.uid = data.uid;
                        sessionStorage.uname = data.uname;
                        alert("恭喜你，注册成功");
                        this.$router.go(-1);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        // 验证用户名是否为空
        checkUname() {
            // this.axios
            //     .post(
            //         "/user/check_uname",
            //         qs.stringify({
            //             uname: this.form.uname
            //         })
            //     )
            //     .then(res => {
            //         console.log(res);
            //         if (res.data.code == 301) {
            //             alert("用户名已存在，请换一个");
            //         }
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     });
            verifyUname({
                uname: this.form.uname
            })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 301) {
                        alert("用户名已存在，请换一个");
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        // 验证手机号是否为空
        checkPhone() {
            // this.axios
            //     .post("/user/check_phone", {
            //         phone: this.form.phone
            //     })
            //     .then(res => {
            //         console.log(res);
            //         if (res.data.code == 301) {
            //             alert("手机号已存在，请换一个");
            //         }
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     });
            verifyPhone({
                phone: this.form.phone
            })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 301) {
                        alert("手机号已存在，请换一个");
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    computed: {
        // 状态校验会解析成 oninput事件
        vaildatePhone() {
            if (this.form.phone != "") {
                var pt = /^1[3-9]\d{9}$/;
                return pt.test(this.form.phone);
            }
        }
    },
    created() {
        console.log(this.$global.isLogin);
    },
    mounted() {}
};
</script>
<style scoped>
.breadcrumb-item ~ .breadcrumb-item:before {
    content: ">";
}
</style>