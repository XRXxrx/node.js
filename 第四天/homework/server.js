// 用express框架
const express = require('express');
const multer = require('multer');
//解决跨域的插件
const cors = require('cors');
//创建文件夹
const upload = multer({ dest: 'uploads/' })
const server = express();

// 1. 静态页面托管
//    localhost:3000/index.html可以访问public下的index.html文件
server.use(express.static('public'));
//普通键值对的解析
server.use(express.urlencoded());
//复杂的JSON对象数据的解析
server.use(express.json());
//跨域引用
server.use(cors());
// 2. 写接口
//    在后端实现三个接口，分别来处理在index.html中发出的post请求：
//    只需要在后端接收到参数即可
// 普通的键值对接口
server.post('/post', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    let data = req.body;
    // console.log(data);
    const { a, b } = data;
    if (!a || !b) {
        res.status(400).json({ code: 400, message: '请求参数错误！' })
    }
    res.json(data);
});

//复杂的JSON对象数据接口
server.post('/postJSON', (req, res) => {
    let data = req.body;
    // console.log(data);
    const { name, address } = data;
    if (!name || !address) {
        res.status(400).json({ code: 400, message: '请求参数错误！' })
    }
    res.json(data);
})

//formData表单数据接口
server.post('/admin/article_publish', upload.single('cover'), function(req, res, next) {
    // req.file 是 `cover` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    let file = req.file;
    console.log(file);
    if (!file) {
        res.status(400).json({ code: 400, message: '请求参数错误！' })
    }
    res.json({ code: 200, message: '上传成功', img: file.path });
})

// 监听端口
server.listen(3000, () => {
    console.log('run..........');
})