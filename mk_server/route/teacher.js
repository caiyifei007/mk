const express = require("express");

const pool = require("../pool");

// 创建路由器对象
const router = express.Router();

// 讲师列表
router.get("/list", (req, res) => {
    let sql = "select * from teacher";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        // 将取到的数据返回给调用端
        res.json({
            code: 200,
            msg: "success",
            data: result
        });
    });
    // res.json("hello teacher");
})


// 模块导出
module.exports = router;