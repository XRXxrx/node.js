const express = require('express');
const conn = require('./sql')
const cors = require('cors');
const server = express();
server.use(express.urlencoded());
server.use(cors());
//查询
server.post('/user/search', (req, res) => {
    let { id, name } = req.body;
    // console.log(name);
    let str = null;
    //非空判断
    if (name !== undefined && name !== '' && name !== null) {
        str = `select * from stu where name like '%${name}%'`
    } else if (id !== undefined && id !== '' && id !== null) {
        str = `select * from stu where id=${id}`
    } else {
        str = 'select * from stu'
    };
    conn.query(str, (err, result) => {
        if (err) {
            console.log('查询失败');
        }
        console.log('查询成功', result);
        res.json({ code: 200, message: result });
    })
});
//修改
server.post('/user/update', (req, res) => {
    let { id, name, age, sex, height } = req.body;
    if (name === undefined || name === '' || name === null) {
        res.status(400).json({ code: 400, message: '姓名不能为空' })
    } else if (age === undefined || age === '' || age === null) {
        res.status(400).json({ code: 400, message: '年龄不能为空' })
    } else if (sex === undefined || sex === '' || sex === null) {
        res.status(400).json({ code: 400, message: '性别不能为空' })
    } else if (height === undefined || height === '' || height === null) {
        res.status(400).json({ code: 400, message: '身高不能为空' })
    };
    conn.query(`update stu set name="${name}",age=${age},sex="${sex}",height=${height} where id=${id}`, (err, result) => {
        if (err) {
            console.log('修改失败');
            return;
        }
        console.log('修改成功');
    })
});
//添加  
server.post('/user/add', (req, res) => {
    let { name, age, sex, height } = req.body;
    // console.log(req.body);
    conn.query(`insert into stu(name,age,sex,height) value("${name}",${age},"${sex}",${height})`, (err, result) => {
        if (err) {
            console.log('添加失败');
            return;
        }
        console.log('添加成功', result);
    })
});
//删除
server.post('/user/delete', (req, res) => {
    let { id } = req.body;
    conn.query(`update stu set isdelete=1 where id=${id}`, (err, result) => {
        if (err) {
            console.log('删除失败');
            return;
        }
        console.log('删除成功');
    })
})
server.listen(4000, () => {
    console.log('run.......');

})