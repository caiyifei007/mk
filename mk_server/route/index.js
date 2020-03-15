const express = require("express");
const pool = require("../pool");

const router = express.Router();

// 首页路由
router.get("/index", (req, res) => {
    res.json("这是主页");
});

module.exports = router;