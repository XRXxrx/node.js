// 加载fs文件系统模块
const fs = require('fs');
// 加载path路径模块
const path = require('path');
//获取数据文件地址
let ph = path.join(__dirname, 'db', 'data.json');
let str;
//读取文件数据（异步写法）
// fs.readFile(ph, 'utf8', function(err, data) {
//     if (err) {
//         throw err;
//     }
//     str = data;
//     // console.log(str);
//     //转为数组
//     str = JSON.parse(str);
//     // console.log(str);
//     //添加数据
//     str.push({ name: '小张' });
//     // console.log(str);
//     //转回字符串
//     str = JSON.stringify(str);
//     // console.log(str);
//     //覆盖写入
//     fs.writeFile(ph, str, function(err) {
//         if (err) {
//             throw err;
//         }
//     })
// })
//读取文件数据（同步写法）
str = fs.readFileSync(ph, 'utf8');
// console.log(str);
// 转为数组
str = JSON.parse(str);
// console.log(str);
//添加数据
str.push({ name: '小刘' });
// console.log(str);
//转回字符串
str = JSON.stringify(str);
// console.log(str);
//覆盖写入
fs.writeFileSync(ph, str);