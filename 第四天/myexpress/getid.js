//加载express框架
const express = require('express');
//调用express函数
const server = express();
// 路由-get接口
server.get('/getList', (req, res) => {
    //express框架会自动收集get参数，并保存在req对象的`query`属性中
    console.log(req.query);
    const { id } = req.query;
    if (!id) {
        res.status(400).json({ code: 400, message: '你还没有传参' });
    }
    //响应数据
    const data = {
        code: 200,
        message: '获取成功',
        data: [{
            id: id,
            name: '小张',
            age: 24
        }]
    }
    res.json(data);
});
//监听端口
server.listen(8058, () => {
    console.log('run...........');

})