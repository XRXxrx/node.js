// 加载http模板
const http = require('http');
// 加载fs模板
const fs = require('fs');
// 加载path模板
const path = require('path');
// 创建服务
const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === '/' || url === '/index.html') {
        let htmlStr = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8')
        res.end(htmlStr);
    } else if (url === '/style.css') {
        let htmlStr = fs.readFileSync(path.join(__dirname, 'public', url), 'utf8')
        res.end(htmlStr);
    } else if (url === '/01.jpg') {
        let htmlStr = fs.readFileSync(path.join(__dirname, 'public', url))
        res.end(htmlStr);
    } else if (url === '/jquery.js') {
        let htmlStr = fs.readFileSync(path.join(__dirname, 'public', url), 'utf8')
        res.end(htmlStr);
    } else if (url === '/01.mp4') {
        res.setHeader('content-type', 'video/mp4')
        let htmlStr = fs.readFileSync(path.join(__dirname, 'public', url))
        res.end(htmlStr);
    } else {
        res.statusCode = 404;
        res.end('没有该资源')
    }
});
//监听端口
server.listen(8041, () => {
    console.log('run..........');

})