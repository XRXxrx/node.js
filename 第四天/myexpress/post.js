//加载express框架
const express = require('express');
//调用express函数
const server = express();
// 下边的一句的功能是：将在 请求体 中的携带的 普通键值对 解析出来，保存在req.body中
server.use(express.urlencoded());
// 路由-post接口- 普通键值对
server.post('/postList', (req, res) => {
        console.log('请求头是', req.headers);
        // 接受参数
        console.log(req.body);
        if (Math.random() > 0.5) {
            res.json({ code: 200, msg: '成功' })
        } else {
            res.json({ code: 400, msg: '失败' })
        }
    })
    //监听端口
server.listen(8059, () => {
    console.log('run...........');

})