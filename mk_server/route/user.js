const express = require("express");
const router = express.Router();
const pool = require("../pool");

// 用户注册
router.post("/register", (req, res) => {
    var obj = req.body;

    // 检测用户名是否为空
    if (!obj.uname) {
        res.json({
            code: 401,
            msg: "uname required",
        });
        return;
    }

    // 检测密码是否为空
    if (!obj.upwd) {
        res.json({
            code: 402,
            msg: "upwd required"
        });
        return;
    }

    // 检测重复密码是否为空
    if (!obj.upwd2) {
        res.json({
            code: 403,
            msg: "upwd2 required"
        });
        return;
    }

    // 检测手机号码是否为空
    if (!obj.phone) {
        res.json({
            code: 404,
            msg: "phone required"
        });
        return;
    }
    // 检测手机号的合法性
    var pt = /^1[3-9]\d{9}$/;
    if (!pt.test(obj.phone)) {
        res.json({
            code: 406,
            msg: "手机号格式非法"
        });
        return;
    }

    // 检测两次输入的密码是否一致
    if (obj.upwd != obj.upwd2) {
        res.json({
            code: 405,
            msg: "两次输入的密码不一致，请重新输入"
        });
        return;
    }

    // 比较两次输入的密码是否一致
    // 比较完成后需要删除upwd2
    delete obj.upwd2;

    let sql = "insert into user set ?";
    pool.query(sql, [obj], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({
            code: 200,
            msg: "success",
            data: {
                uid: result.insertId,
                uname: obj.uname
            }
        })
    })
});

// 用户登录
router.post("/login", (req, res) => {
    // 接收表单提交的数据
    var obj = req.body;

    // 检测用户名是否为空
    if (!obj.uname) {
        res.json({
            code: 401,
            msg: "uname required",
        });
        return;
    }

    // 检测密码是否为空
    if (!obj.upwd) {
        res.json({
            code: 402,
            msg: "upwd required"
        });
        return;
    }

    // 查询语句
    let sql = "select * from user where (uname = ? and upwd = ?) or (phone = ? and upwd = ?) limit 1";
    pool.query(sql, [obj.uname, obj.upwd, obj.uname, obj.upwd], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            res.json({
                code: 200,
                msg: "success",
                data: {
                    uid: result[0].uid,
                    uname: result[0].uname
                }
            })
        } else {
            res.json({
                code: 301,
                msg: "no user"
            })
        }
    })




});

// 检测用户名是否存在
router.post("/check_uname", (req, res) => {
    var obj = req.body;

    // 判断用户名是否为空
    if (!obj.uname) {
        res.json({
            code: 401,
            msg: "uname required"
        });
        return;
    }

    // 查询语句
    let sql = "select * from user where uname = ?";
    pool.query(sql, [obj.uname], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            res.json({
                code: 301,
                msg: "uname is exist"
            });
        } else {
            res.json({
                code: 200,
                msg: "uname not exist"
            });
        }
    });


});

// 检测手机号是否存在
router.post("/check_phone", (req, res) => {
    var obj = req.body;
    // 检测手机号是否为空
    if (!obj.phone) {
        res.json({
            code: 405,
            msg: "phone is required"
        });
        return;
    }
    // 检测手机号码是否合法
    var pt = /^1[3-9]\d{9}$/;
    if (!pt.test(obj.phone)) {
        res.json({
            code: 406,
            msg: "手机号码格式不合法"
        });
        return;
    }

    // 查询语句
    let sql = "select * from user where phone = ?";
    pool.query(sql, [obj.phone], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({
                code: 301,
                msg: "phone is exist"
            });
        } else {
            res.json({
                code: 200,
                msg: "phone not exist"
            })
        }
    })

});


module.exports = router;