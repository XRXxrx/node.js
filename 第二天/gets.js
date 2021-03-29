// 加载http模板
const http = require('http');
// 加载fs模板
const fs = require('fs');
// 加载path模板
const path = require('path');
//创建服务
const server = http.createServer((req, res) => {
    // 获取路径和请求方式
    const { url, method } = req;
    if (url === '/getList.js' && method === 'GET') {
        // 拼接地址
        let ph = path.join(__dirname, 'db', 'data.json');
        let htmlStr = fs.readFileSync(ph);
        //设置显示类型
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.end(htmlStr);
    }
});
//监听端口
server.listen(8052, () => {
    console.log('run..........');
})