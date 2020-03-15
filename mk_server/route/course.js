const express = require("express");
const pool = require("../pool");

const router = express.Router();

// 课程列表路由
router.get("/list", (req, res) => {
    // 接收get请求的参数  req.query
    // console.log(req.query);
    var obj = req.query;
    // 判断有没有curPage参数
    if (!obj.curPage) {
        obj.curPage = 1;
    }
    // 判断有没有pageSize参数
    if (!obj.pageSize) {
        obj.pageSize = 3;
    }
    // 判断有没有typeId参数
    if (!obj.typeId) {
        obj.typeId = 0;
    }


    // 查看总的记录数
    if (obj.typeId == 0) {
        // 查询所有分类的课程总数
        var sql = "select count(*) as num from course";
    } else {
        // 查看某个分类的课程总数
        var sql = "select count(*) as num from course where typeId =" + parseInt(obj.typeId);
    }

    pool.query(sql, (err, result) => {
        if (err) throw err;
        // 总的记录数
        let total = result[0].num;
        // 总页数
        let pageTotal = Math.ceil(total / obj.pageSize);
        // 查询的起始位置
        let offset = (obj.curPage - 1) * obj.pageSize;

        // 分页查询及多表联查 查询课程分类及教师信息
        if (obj.typeId == 0) {
            var sql2 = `select * from course, teacher where course.teacherId = teacher.tid order by course.cid desc limit ?, ?`;
        } else {
            var sql2 = `select * from course, teacher where course.teacherId = teacher.tid and typeId = ${parseInt(obj.typeId)} order by course.cid desc limit ?, ?`;
        }
        pool.query(sql2, [offset, parseInt(obj.pageSize)], (err, result) => {
            if (err) throw err;
            res.json({
                code: 200,
                msg: "success",
                data: {
                    list: result,
                    total,
                    pageTotal,
                    pageSize: obj.pageSize,
                    curPage: obj.curPage
                }
            })
        })

    });
});

// 课程详情
router.get("/detail", (req, res) => {
    var obj = req.query;

    if (!obj.cid) {
        res.json({
            code: 300,
            msg: "cid is required"
        });
        return;
    }

    // 查询语句
    let sql = "select * from course, teacher where course.teacherId = teacher.tid and course.cid =" + obj.cid;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            code: 200,
            msg: "success",
            data: result[0]
        })
    });
});

// 最新课程
router.get("/newest", (req, res) => {
    var obj = req.query;
    if (!obj.countNum) {
        obj.countNum = 4;
    }

    let sql = "select cid, title, pic, price, tname from course, teacher where course.teacherId = teacher.tid order by cid desc limit " + Number(obj.countNum);
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            code: 200,
            msg: "success",
            data: result
        })
    });

});



module.exports = router;