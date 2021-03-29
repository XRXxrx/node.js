//加载express框架
const express = require('express');
//调用express函数
const server = express();
// 托管静态资源
// server.use(express.static('public'));
// 限制访问前缀
server.use('/public', express.static('public'));
//编写路由
// server.get('/', (req, res) => {
//     //响应数据
//     res.send('hello word')
// });
//监听端口
server.listen(8056, () => {
    console.log('run...........');

})