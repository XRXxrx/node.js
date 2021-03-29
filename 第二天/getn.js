// 加载http模板
const http = require('http');
// 加载fs模板
const fs = require('fs');
// 加载path模板
const path = require('path');
// 加载path模板
const qs = require('querystring');
//创建服务
const server = http.createServer((req, res) => {
    // const { url } = req;
    // console.log(url);
    // let ud = url.split('?');
    // console.log(ud);
    //数组解构
    let [url, querys] = req.url.split('?');
    // console.log(querys);
    // console.log(url);
    if (url === '/getList.js' && req.method === 'GET') {
        // 把查询字符串转成对象
        let obj = qs.parse(querys);
        // console.log(obj);
        //地址拼接
        let ph = path.join(__dirname, 'db', 'data.json');
        //获取数据
        let htmls = fs.readFileSync(ph, 'utf8');
        // console.log(htmls);
        //将数据转为数组
        htmls = JSON.parse(htmls);
        // console.log(htmls);
        //查询数据
        // let rs = htmls.find((item) => {
        //     if (item.name === obj.name) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // });
        // 优化,箭头函数只有一个参数可以去掉括号
        let rs = htmls.find(itms => itms.name === obj.name);
        // console.log(rs);
        // res.end返回的内容必须是字符串，或者是buffer
        rs = JSON.stringify(rs);
        res.setHeader('content-type', 'application/json')
        res.end(rs)
    } else {
        res.statusCode(404);
        res.end('404');
    }
});
//监听端口
server.listen(8053, () => {
    console.log('run..........');
})