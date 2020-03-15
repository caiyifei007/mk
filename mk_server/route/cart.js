const express = require("express");
const pool = require("../pool");

const router = express.Router();

// 添加购物车  /cart/add
router.post("/add", (req, res) => {
    var obj = req.body;
    // 用户id参数
    if (!obj.uid) {
        res.json({
            code: 301,
            msg: "uid id required"
        });
        return;
    }
    // 商品id参数
    if (!obj.cid) {
        res.json({
            code: 302,
            msg: "cid id required"
        });
        return;
    }
    // 购买数量参数
    if (!obj.count) {
        obj.count = 1;
    }
    // 查询用户的购物车中是否已经添加过该商品
    let sql = "select count(*) as num from cart where userId = ? and courseId = ?";
    pool.query(sql, [obj.uid, obj.cid], (err, result) => {
        if (err) throw err;
        if (result[0].num > 0) {
            // 商品已在购物车中(更新购买数量)
            var sql = `update cart set count = count + ${obj.count} where userId = ${obj.uid} and courseId = ${obj.cid}`;
        } else {
            // 商品尚未添加到购物车中(执行添加)
            var sql = `insert into cart values (null, ${obj.uid}, ${obj.cid}, ${obj.count})`;
        }
        pool.query(sql, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.json({
                    code: 200,
                    msg: "success"
                });
            } else {
                res.json({
                    code: 400,
                    msg: "failed"
                })
            }
        });

    });








});

// 查询购物车列表
router.post("/list", (req, res) => {
    var obj = req.body;
    // 用户未登录
    if (!obj.uid) {
        res.json({
            code: 301,
            msg: "uid id required"
        })
    }


    let sql = "select course.title, course.price, course.pic, cart.courseId, cart.count, cart.ctid from cart, course where cart.courseId = course.cid and cart.userId = ?";
    pool.query(sql, [obj.uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({
                code: 200,
                msg: 'success',
                data: result
            })
        } else {
            res.json({
                code: 201,
                msg: 'cart is empty'
            })
        }
    });

});

// 更新购物车
router.post("/update", (req, res) => {
    var obj = req.body;
    // 判断购物车id是否为空
    if (!obj.ctid) {
        res.json({
            code: 401,
            msg: "ctid is required"
        });
        return
    }
    // 判断数量是否存在
    if (!obj.count) {
        res.json({
            code: 402,
            msg: "count is required"
        });
        return;
    }


    let sql = "update cart set count = ? where ctid = ?";
    pool.query(sql, [obj.count, obj.ctid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.json({
                code: 200,
                msg: "update success"
            });
        } else {
            res.json({
                code: 301,
                msg: "update failed"
            })
        }
    });

});

// 清空购物车
router.post("/empty", (req, res) => {
    var obj = req.body;
    // 判断用户id是否为空
    if (!obj.uid) {
        res.json({
            code: 401,
            msg: "uid is required"
        });
        return;
    }


    let sql = "delete from cart where userId = ?";
    pool.query(sql, [obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.json({
                code: 200,
                msg: "delete success"
            });
        } else {
            res.json({
                code: 301,
                msg: "delete failed"
            })
        }
    });

});

// 删除购物车
router.post("/del", (req, res) => {
    var obj = req.body;
    // 判断用户id是否为空
    if (!obj.ctid) {
        res.json({
            code: 401,
            msg: "ctid is required"
        });
        return;
    }


    let sql = "delete from cart where ctid = ?";
    pool.query(sql, [obj.ctid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.json({
                code: 200,
                msg: "delete success"
            });
        } else {
            res.json({
                code: 301,
                msg: "delete failed"
            })
        }
    });

});













module.exports = router;