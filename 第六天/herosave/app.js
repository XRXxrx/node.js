const express = require('express');

//加载跨域插件
const cors = require('cors');

//中间件技术-验证token
const jwt = require('express-jwt');

// 加载连接数据库文件
// const conn = require('./utils/connection.js');

//加载接口路由中间件
const heroRouter = require('./router/hero_router.js');
const userRouter = require('./router/user_router.js')

const server = express();

server.use(cors());

server.use('/uploads', express.static('uploads'));

// server.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证
server.use(jwt({
    secret: 'xrx', // 生成token时的 钥匙，必须统一
    algorithms: ['HS256'] // 必填，加密算法，无需了解
}).unless({
    path: ['/user/login', '/user/register', /^\/uploads\/.*/] // 除了这两个接口，其他都需要认证
}));

server.use('/hero', heroRouter);
server.use('/user', userRouter);



// 中间件技术-处理错误
server.use((err, req, res, next) => {
    // console.log(err);
    if (err.name === 'UnauthorizedError') {
        // res.status(401).send('invalid token...');
        res.status(401).send({ status: 1, message: '身份认证失败！' });
    }
});

server.get('/', (req, res) => {
    res.json({ code: 200, msg: ok });
});

//测试连接
// conn.query('select * from heros', (err, result) => {
//     // console.log(result);
// });

server.listen(3001, () => {
    console.log('run................');
})