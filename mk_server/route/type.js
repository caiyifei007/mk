const express = require("express");
const pool = require("../pool");
const router = express.Router();

router.get("/", (req, res) => {
    let sql = "select * from type";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            code: 200,
            msg: "success",
            data: result
        })
    })
});






module.exports = router;