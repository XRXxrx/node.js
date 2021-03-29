//加载express框架
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
//调用express函数
const server = express();

// 路由-post接口- 接收formData格式的参数（文件）
server.post('/postForm', upload.single('img'), function(req, res, next) {
        // req.file 是 `img` 文件的信息
        // req.body 将具有文本域数据，如果存在的话
        console.log('本次的请求头是', req.headers)

        console.log('接收到的文件是', req.file);
        console.log('接收到的参数是', req.body);
        res.end('/admin/article/publish')
    })
    //监听端口
server.listen(8061, () => {
    console.log('run...........');

})