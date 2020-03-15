const express = require("express");
const pool = require("../pool");

const router = express.Router();

// 添加收藏
router.post("/add", (req, res) => {
    var obj = req.body;
    if (!obj.uid) {
        res.json({
            code: 301,
            msg: "uid is required"
        });
        return;
    }
    if (!obj.cid) {
        res.json({
            code: 302,
            msg: "cid is required"
        });
        return;
    }
    // 以秒为单位的时间戳
    var fTime = Math.ceil(new Date().getTime() / 1000);

    let sql = 'select * from favorite where userId = ? and courseId = ?';
    pool.query(sql, [obj.uid, obj.cid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({
                code: 201,
                msg: '已收藏'
            })
        } else {
            var sql = "insert into favorite (userId, courseId, fTime) values (?, ?, ?)";
            pool.query(sql, [obj.uid, obj.cid, fTime], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.json({
                        code: 200,
                        msg: "success",
                        data: {
                            fid: result.insertId
                        }
                    });
                } else {
                    res.json({
                        code: 301,
                        msg: "failed"
                    })
                }
            })
        }
    });



});

// 我的收藏 /favorite/list
router.post("/list", (req, res) => {
    var obj = req.body;
    if (!obj.uid) {
        res.json({
            code: 301,
            msg: "uid id required"
        });
        return;
    }

    let sql = "select course.title, course.pic, course.price, favorite.courseId, favorite.fid, favorite.fTime from favorite, course where favorite.courseId = course.cid and userId = ? order by favorite.fTime desc limit 3";
    pool.query(sql, [obj.uid], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            res.json({
                code: 200,
                msg: "success",
                data: result
            });
        } else {
            res.json({
                code: 201,
                msg: "no favorite"
            })
        }
    });




});



module.exports = router;