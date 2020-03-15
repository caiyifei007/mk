const express = require("express");
const pool = require("../pool");

const router = express.Router();

// 添加订单
router.post("/add", (req, res) => {
    var obj = req.body;

    // 检测用户id是否为空
    if (!obj.uid) {
        res.json({
            code: 401,
            msg: "uid required"
        });
        return;
    }
    // 检测订单金额是否为空
    if (!obj.orderAmount) {
        res.json({
            code: 402,
            msg: "orderAmount required"
        });
        return;
    }
    // 检测商品是否为空
    if (!obj.selected) {
        res.json({
            code: 403,
            msg: "no course selected"
        });
        return;
    }
    // 以秒为单位的时间戳
    var created = parseInt(Date.now() / 1000)
    var order = {
        userId: obj.uid,
        amount: obj.orderAmount,
        created
    }

    // 添加订单(orders)
    let sql = "insert into orders set ?";
    pool.query(sql, [order], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            // 添加订单表成功(oid)
            var orderId = result.insertId; // 新插入的id
            // 对选中的商品进行遍历
            var details = [];
            var selected = JSON.parse(obj.selected)
            for (var i = 0; i < selected.length; i++) {
                var tmp = [];
                tmp.push(orderId);
                tmp.push(selected[i].courseId);
                tmp.push(selected[i].count);
                details.push(tmp);
            }
            let sql = 'insert into orders_detail (orderId, courseId, count) values ?';
            pool.query(sql, [details], (err, result) => {
                if (err) throw err;
                console.log(result);
                if (result.affectedRows > 0) {
                    res.json({
                        code: 200,
                        msg: 'success',
                        data: {
                            orderId: orderId
                        }
                    })
                }
            })
        } else {
            res.json({
                code: 301,
                msg: 'failed'
            })
        }
    })


});


// 订单列表
router.post('/list', (req, res) => {
    // 获取表单提交数据
    var obj = req.body;

    // 检测用户id是否为空
    if (!obj.userId) {
        res.json({
            code: 401,
            msg: 'userId required'
        });
        return;
    }

    let sql = 'select * from orders, orders_detail, course where orders.oid = orders_detail.orderId and orders_detail.courseId = course.cid and orders.userId = ? order by orders.created desc';
    pool.query(sql, [obj.userId], (err, result) => {
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
                msg: 'order list is null'
            })
        }

    })



});

module.exports = router;