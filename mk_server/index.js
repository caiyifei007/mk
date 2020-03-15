const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.listen(5050);
console.log("server is listening 5050");

// 注册body-parser中间件
app.use(bodyParser.urlencoded({
    extended: false
}));

// 声明跨域
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options') {
        res.send(200); //让options尝试请求快速结束
    } else {
        next();
    }
});

// 教师页面
const teacherRouter = require("./route/teacher");
// 主页面
const indexRouter = require("./route/index");
// 注册页
const userRouter = require("./route/user");
// 类型模块
const typeRouter = require("./route/type");
// 课程列表
const courseRouter = require("./route/course");
// 购物车
const cartRouter = require("./route/cart");
// 收藏
const favoriteRouter = require("./route/favorite");
// 订单
const orderRouter = require("./route/order");


app.use("/teacher", teacherRouter);
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/type", typeRouter);
app.use("/course", courseRouter);
app.use("/cart", cartRouter);
app.use("/favorite", favoriteRouter);
app.use("/order", orderRouter);