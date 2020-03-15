import axios from './axios.js';

// 登录
export const login = data => {
    return (async function () {
        var result = await axios.post('/user/login', data);
        return result;
    })();
}

// 请求最新课程接口
export const getNewCourse = data => {
    return (async function () {
        var result = await axios.get('/course/newest', data);
        return result;
    })();
}

// 查询购物车的内容
export const getCart = data => {
    return (async function () {
        var result = await axios.post('/cart/list', data);
        return result;
    })();
}

// 清空购物车
export const cartEmpty = data => {
    return (async function () {
        var result = await axios.post('/cart/empty', data);
        return result;
    })();
}

// 删除购物车中商品
export const cartDel = data => {
    return (async function () {
        var result = await axios.post('/cart/del', data);
        return result;
    })();
}

// 判断课程类型
export const getTypes = data => {
    return (async function () {
        var result = await axios.get('/type', data);
        return result;
    })();
}

// 获取用户订单列表
export const getOrderList = data => {
    return (async function () {
        var result = await axios.post('/order/list', data);
        return result;
    })();
}

// 获取用户收藏列表
export const getFavoriteList = data => {
    return (async function () {
        var result = await axios.post('/favorite/list', data);
        return result;
    })();
}

// 查询教师列表
export const getTeachers = data => {
    return (async function () {
        var result = await axios.get('/teacher/list', data);
        return result;
    })();
}

// 注册表单提交方法
export const userRegister = data => {
    return (async function () {
        var result = await axios.post('/user/register', data);
        return result;
    })();
}

// 验证用户名是否为空
export const verifyUname = data => {
    return (async function () {
        var result = await axios.post('/user/check_uname', data);
        return result;
    })();
}

// 验证手机号是否为空
export const verifyPhone = data => {
    return (async function () {
        var result = await axios.post('/user/check_phone', data);
        return result;
    })();
}

// 提交订单接口的调用
export const orderCommit = data => {
    return (async function () {
        var result = await axios.post('/order/add', data);
        return result;
    })();
}

// 查找课程详情
export const getCourseDetail = data => {
    return (async function () {
        var result = await axios.get('/course/detail', data);
        return result;
    })();
}

// 添加购物车
export const addCart = data => {
    return (async function () {
        var result = await axios.post('/cart/add', data);
        return result;
    })();
}

// 添加收藏
export const addFavorite = data => {
    return (async function () {
        var result = await axios.post('/favorite/add', data);
        return result;
    })();
}

// 查看全部课程
export const getCourse = data => {
    return (async function () {
        var result = await axios.get('/course/list', data);
        return result;
    })();
}