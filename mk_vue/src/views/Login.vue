<template>
  <b-container>
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <h3 class="text-center">用户登录</h3>
    <b-row class="mt-5 w-75 ml-3">
      <b-col md="7" sm="12">
        <b-form @submit="login2">
          <b-form-group
            id="input-group-1"
            label="用户名:"
            label-for="uname"
            description
          >
            <b-form-input
              id="uname"
              v-model="form.uname"
              type="text"
              required
              placeholder="用户名或手机号"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="密码:" label-for="upwd">
            <b-form-input
              id="upwd"
              v-model="form.upwd"
              required
              type="password"
              placeholder="请输入密码"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">登录</b-button>
          <b-button type="reset" variant="danger" class="ml-3">重置</b-button>
        </b-form>
      </b-col>
      <b-col md="5" sm="12" class="d-flex flex-column">
        <router-link to="/register">
          <h6 class="text-right text-danger">新用户注册</h6>
        </router-link>
        <em></em>
        <div class="qrcode">
          <i></i>
          <span>扫码登录</span>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { login } from "@/util/api.js";
export default {
  name: "login",
  data() {
    return {
      form: {
        uname: "",
        upwd: ""
      },
      items: [
        {
          text: "首页",
          to: "/"
        },
        {
          text: "登录",
          active: true
        }
      ]
    };
  },
  methods: {
    login2() {
      login(this.form)
        .then(res => {
          if (res.data.code == 200) {
            // 将登录的用户的uid和uname赋值到session中
            var data = res.data.data;
            sessionStorage.uid = data.uid;
            sessionStorage.uname = data.uname;
            alert("登录成功");
            // 往前跳转一页
            // this.$router.go(-1);
            // location.reload();
          } else {
            alert("账号或密码错误");
          }
        })
        .catch(err => {
          console.error(err);
        });
      //   this.$router.push("/cart");

      /* this.axios
                .post("/user/login", this.form)
                .then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        // 将登录的用户的uid和uname赋值到session中
                        var data = res.data.data;
                        sessionStorage.uid = data.uid;
                        sessionStorage.uname = data.uname;
                        alert("登录成功");
                        // 往前跳转一页
                        this.$router.go(-1);
                        // location.reload();
                    } else {
                        alert("用户名或密码错误");
                    }
                })
                .catch(err => {
                    console.error(err);
                }); */
    }
  },
  created() {
    if (this.$global.isLogin) {
      this.$router.push("/");
    }
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
.qrcode {
  width: 100%;
  height: 100%;
  text-align: center;
}
.qrcode > i {
  display: block;
  width: 129px;
  height: 129px;
  background: url("~@/assets/images/qrcode.png") no-repeat;
  margin: 10px auto;
}
</style>
