//引入包
const mysql = require('mysql');
//创建连接
const connection = mysql.createConnection({
    host: 'localhost', // 你要连接的数据库服务器的地址
    port: 3306, //连接数据库服务器需要的端口
    user: 'root', // 连接数据库服务器需要的用户名
    password: 'root', // 连接数据库服务器需要的密码
    database: 'xrx' //你要连接的数据库的名字
});
//测试连接
connection.connect((err) => {
    //如果有错误对象，表示连接失败
    if (err) {
        console.log('连接失败', err);
        return;
    }
    //如果没有错误对象，表示连接成功
    console.log('连接成功');
});
//执行sql语句
const str = 'select * from stu';
connection.query(str, (err, result, fields) => {
    if (err) {
        console.log('查询错误', err);
        return;
    }
    console.log('查询结果是', result);
    // console.log(fields);
});
//添加
const inst = 'insert into stu(name,age,sex,height) value("小黑",56,"男",78)';
connection.query(inst, (err, result) => {
    //- affectedRows： 受影响行数
    // - insertID： 查询数据的主键值
    if (err) {
        console.log('添加错误', err);
        return;
    }
    console.log('添加结果是', result);
});
//删除
const delt = 'delete from stu where id=8';
connection.query(delt, (err, result) => {
    //- affectedRows： 受影响行数
    // - insertID： 查询数据的主键值
    if (err) {
        console.log('删除错误', err);
        return;
    }
    console.log('删除结果是', result);
});
//修改
const updt = 'update stu set age=4546 where id=10';
connection.query(updt, (err, result) => {
    //- affectedRows： 受影响行数
    // - insertID： 查询数据的主键值
    if (err) {
        console.log('修改错误', err);
        return;
    }
    if (result.affectedRows > 0) {
        console.log('修改成功');
    } else {
        console.log('修改失败');
    }
});