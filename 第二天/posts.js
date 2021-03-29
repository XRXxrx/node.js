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
    //地址拼接
    let ph = path.join(__dirname, 'db', 'data.json');
    //数组解构
    let [url, querys] = req.url.split('?');
    // console.log(querys);
    // console.log(url);
    if (url === '/getList.js' && req.method === 'GET') {
        // 把查询字符串转成对象
        let obj = qs.parse(querys);
        // console.log(obj);
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
    } else if (url === '/add' && req.method === 'POST') {
        // res.end('ok');
        // 定义一个空对象用于装传递的参数
        let str = '';
        // data事件
        // 当收到一部分数据之后，就会执行一次回调函数，可能会执行多次
        // 并且回调中的参数就是本身收到的这一部分数据（buffer格式）
        req.on('data', function(check) {
            // console.log('asdsadas');
            str += check;
            // console.log(str);
        });
        // end事件
        // 服务器接收post参数完毕之后，就会执行回调函数，
        req.on('end', function() {
            // 把接受的参数进行解构
            let obj = qs.parse(str);
            // console.log(obj);
            // 读取数据
            let arr = fs.readFileSync(ph, 'utf8');
            // console.log(arr);
            //转数组对象
            arr = JSON.parse(arr);
            //添加数据
            arr.push({ 'name': obj.name });
            // console.log(arr);
            //转回字符串，重新写入数据
            arr = JSON.stringify(arr);
            // console.log(arr);
            fs.writeFileSync(ph, arr);
            res.end(arr);
        });
    } else {
        res.statusCode = 404;
        res.end('404');
    }
});
//监听端口
server.listen(8054, () => {
    console.log('run..........');
})