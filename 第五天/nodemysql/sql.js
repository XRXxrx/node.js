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
   module.exports = connection;