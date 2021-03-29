// 加载相关插件
const express = require('express');
const conn = require('../utils/connection.js');
//加载创建令牌模块
const jwt = require('jsonwebtoken');
const router = express.Router();
router.use(express.urlencoded());
//写接口
// 注册接口
router.post('/register', (req, res) => {
    // res.send('ok')
    // 获取参数
    let { username, password } = req.body;
    console.log(req.body);
    console.log(username, password);
    // 根据注册业务的要求，先去看一下名字有没有占用！
    //    根据用户名去做一次查询 如果找到了结果，说明名字被占用了，如果查询结果为空，说明
    //    名字可以使用
    const sqlStr = `select username from user where username="${username}"`;
    conn.query(sqlStr, (err, result) => {
        //说明名字没被占用
        if (err) {
            res.json({ code: 500, msg: "服务器错误" });
            return;
        };
        // console.log(result.length);
        //说明名字被占用
        if (result.length > 0) {
            res.json({ code: 201, msg: "注册失败，名字占用了" });
            return;
        };
        //如果没有被占用，就进行添加
        conn.query(`insert into user(username,password) value("${username}","${password}")`, (err, result) => {
            if (err) {
                res.json({ code: 500, msg: "服务器错误" });
                return;
            };
            res.json({ code: 200, msg: "注册成功" });
        })
    });
});
//登录接口
router.post('/login', (req, res) => {
    // 获取参数
    let { username, password } = req.body;
    // console.log(username, userpwd);
    // 根据注册业务的要求，先去看一下账号密码有没有错！
    //    根据用户名和密码去做一次查询 如果找到了结果，说明名字账号密码没错，如果查询结果为空，说明账号密码错误
    const sqlStr = `select * from user where username="${username}" and password="${password}"`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ code: 500, msg: "服务器错误" });
            return;
        };
        if (result.length <= 0) {
            res.json({ code: 201, msg: "登录失败，账号密码错误" });
        } else {
            const tokenStr = jwt.sign({ name: username }, 'xrx', { expiresIn: 2 * 60 * 60 * 60 });
            const token = 'Bearer ' + tokenStr;
            res.json({ code: 200, msg: "登录成功", token });
        }
    });
});
//导出
module.exports = router;