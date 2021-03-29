const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost', // 你要连接的数据库服务器的地址
//     port: 3306, // 你要连接的数据库服务器的端口
//     user: 'root', // 连接数据库服务器需要的用户名
//     password: 'root', // 连接数据库服务器需要的密码
//     database: 'herodb' //你要连接的数据库的名字
// });
// connection.connect((err) => {
//     // 如果有错误对象，表示连接失败
//     if (err) {
//         console.log('数据库连接失败');
//         return;
//     }
//     // 没有错误对象提示连接成功
//     console.log('数据库连接成功');
// })
// module.exports = connection;
module.exports = {
    query: function(sql, callback) {
        const mysql = require('mysql');
        const conn = mysql.createConnection({
            host: 'localhost', // 你要连接的数据库服务器的地址
            user: 'root', // 连接数据库服务器需要的用户名
            password: 'root', // 连接数据库服务器需要的密码
            database: 'herodb' //你要连接的数据库的名字
        });
        conn.connect();
        // 完成增删改查
        conn.query(sql, callback);
        // 手动关闭连接
        conn.end();
    }
}