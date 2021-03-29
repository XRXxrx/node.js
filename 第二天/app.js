// 加载http模板
const http = require('http');
let arr = ['九年', '数据', '骄傲', '可能', '扩大上课了']
    // 创建服务
const server = http.createServer((req, res) => {
    // 设置响应头
    res.setHeader('content-type', 'text/html;charset=utf-8');
    // res.end('hello word你好啊！');
    // 随机返回值
    const index = Math.floor(Math.random() * arr.length);
    res.end(arr[index]);
});
//监听端口
server.listen(8001, () => {
    console.log('run.............');
})