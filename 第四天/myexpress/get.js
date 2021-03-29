//加载express框架
const express = require('express');
//调用express函数
const server = express();
// 托管静态资源
// server.use(express.static('public'));
// 限制访问前缀
// server.use('/public', express.static('public'));
//编写路由(不带参数)
// server.get('/get', (req, res) => {
//     //响应数据
//     res.json({ name: '小米' })
// });
//编写路由(带参数)
server.get('/get', (req, res) => {
    //express框架会自动收集get参数，并保存在req对象的`query`属性中
    console.log(req.query);
    //响应数据
    res.send({ name: '小米' })
});
//监听端口
server.listen(8057, () => {
    console.log('run...........');

})