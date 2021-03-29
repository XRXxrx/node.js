// 加载http模板
const http = require('http');
// 加载fs模板
const fs = require('fs');
// 加载path模板
const path = require('path');
//创建服务
let contentPub = {
    ".html": "text/html;charset=utf-8",
    ".css": "text/css;charset=utf-8",
    ".png": "image/png",
    ".js": "application/javascript",
    ".jpg": "image/jpg",
};
const server = http.createServer((req, res) => {
    const { url } = req;
    // 字符串拼接
    let ph = path.join(__dirname, 'public', url);
    // console.log(ph);
    try {
        let htmlStr = fs.readFileSync(ph);
        //取后缀名
        let ext = path.extname(req.url);
        // if (contentPub[ext]) {
        //     res.setHeader('content-type', contentPub[ext]);
        // }
        // 优化
        contentPub[ext] && res.setHeader('content-type', contentPub[ext]);
        res.end(htmlStr);
    } catch (err) {
        console.log(err);
        res.statusCode = 404;
        res.end('404');
    }
});
//监听端口
server.listen(8051, () => {
    console.log('run..........');
})