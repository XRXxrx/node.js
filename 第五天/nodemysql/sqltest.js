const sqls = require('./sql');
sqls.query('delete from stu where id=10', (err, result) => {
    if (err) {
        console.log('删除错误', err);
        return;
    }
    console.log('删除结果是', result);
})