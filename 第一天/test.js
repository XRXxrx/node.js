// 加载fs文件系统模块
const fs = require('fs');
//读取文件
// fs.readFile('aaa.txt', 'utf8', function (err, data) {
//     if (err) {
//         console.log('读取文件失败');

//     }
//     console.log(data);

// });
//访问文件
// fs.readFileSync('aaa.txt', 'utf8');
//读取图片
// fs.readFile('timg4C1YJOX1.jpg', function(err, data) {
//     if (err) {
//         console.log('读取文件失败');

//     }
//     console.log(data);

// });
// 读取视频
// fs.readFile('01.rem适配布局学习目标_.mp4', 'utf8', function(err, data) {
//     if (err) {
//         console.log('读取文件失败');

//     }
//     console.log(data);

// });
//写入数据
// let arr = [{
//     name: '技术',
//     age: 34
// }, { name: '士大夫', age: 53 }];
// let arrs = JSON.stringify(arr);
// fs.writeFile('aaa.txt', arrs, function(err) {
//     if (err) {
//         console.info('修改文件失败');
//         throw err;
//     }
// });
//追加数据
fs.appendFile('aaa.txt', '技术开发即使发生纠纷', function(err) {
    if (err) {
        console.info('追加错误')
        throw err;
    }
})