// 如果session中有uid，则认为用户登录
var isLogin = (function () {
    return sessionStorage.getItem('uid') ? true : false;
})();
var uname = (function () {
    return sessionStorage.getItem('uname');
})();
const siteName = 'iweb'; // 站点名称


export default {
    isLogin,
    uname,
    siteName
}