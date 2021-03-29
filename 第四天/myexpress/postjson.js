//加载express框架
const express = require('express');
//调用express函数
const server = express();
// 下边的一句的功能是：将在 请求体 中的携带的 复杂的JSON结构数据 解析出来，保存在req.body中
server.use(express.json());
server.post('/postJson', (req, res) => {
        console.log('请求头是', req.headers);
        // 接受参数
        console.log(req.body);
        // 设置返回值
        res.json({ name: '小张', say: [{ a: '你好', b: '拉拉' }], code: 200 });
    })
    //监听端口
server.listen(8060, () => {
    console.log('run...........');

})