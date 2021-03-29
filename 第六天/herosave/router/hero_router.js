// 加载相关插件
const express = require('express');
const conn = require('../utils/connection.js');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const router = express.Router();
//加载普通键值对解析
router.use(express.urlencoded());
//写接口
//获取英雄
router.get('/getHeroList', (req, res) => {
    // res.send('ok')
    // console.log(req);
    let { heroName } = req.query;
    // console.log(heroName);
    let sqlStr = `select id,name,gender,img from heros where isdelete=0`;
    //安全判断
    if (heroName) {
        sqlStr += ` and name="${heroName}"`
    }
    console.log(sqlStr);
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.status(500).json({ code: 500, msg: '服务器处理失败' });
            return;
        }
        res.json({ code: 200, msg: '请求成功', data: result });
    });
});
//获取单个英雄
router.get('/getHeroById', (req, res) => {
    // 接收参数
    let { id } = req.query;
    // console.log(id);
    conn.query(`select * from heros where id=${id} and isdelete=0`, (err, result) => {
        if (err) {
            res.status(500).json({ code: 500, msg: '服务器处理失败' });
            return;
        };
        if (result.length > 0) {
            res.json({ code: 200, msg: '请求成功', data: result });
        } else {
            res.status(403).json({ code: 403, msg: '请求失败' });
            return;
        }
    });
});
//添加英雄
router.post('/addHero', (req, res) => {
    //获取参数
    let { name, gender } = req.body;
    // console.log(name, gender);
    const sqlStr = `insert into heros(name,gender) value("${name}","${gender}")`;
    // console.log(sqlStr);
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.status(500).json({ code: 500, msg: '服务器处理失败' });
            return;
        }
        if (result.affectedRows >= 1) {
            res.json({ code: 200, msg: '添加成功' });
        } else {
            res.status(500).json({ code: 500, msg: '服务器处理失败' });
            return;
        }
    });
});
//更新英雄信息
router.post('/updateHero', (req, res) => {
    //获取信息
    let { id, name, gender, img } = req.body;
    //判断用户要修改哪些值
    let arr = [];
    if (name) {
        arr.push(`name="${name}"`);
    };
    if (gender) {
        arr.push(`gender="${gender}"`);
    };
    if (img) {
        arr.push(`img="${img}"`);
    };
    //转字符串
    const str = arr.join();
    // console.log(str);
    conn.query(`update heros set ${str} where id=${id}`, (err, result) => {
        if (err) {
            res.status(500).json({ code: 500, msg: '服务器处理失败' });
            return;
        };
        if (result.changedRows === 1) {
            res.json({ code: 200, msg: '更新成功' });
        } else {
            res.status(403).json({ code: 403, msg: '更新失败' });
            return;
        }
    })
});
//删除英雄
router.get('/delHeroById', (req, res) => {
    // 接收参数
    let { id } = req.query;
    // console.log(id);
    conn.query(`update heros set isdelete=1 where id=${id}`, (err, result) => {
        if (err) {
            res.status(500).json({ code: 500, msg: '服务器处理失败' });
            return;
        };
        if (result.changedRows === 1) {
            res.json({ code: 200, msg: '删除成功' });
        } else {
            res.status(403).json({ code: 403, msg: '删除失败' });
            return;
        }
    });
});
//头像上传
// 精细化去设置，如何去保存文件(保存的文件位置不会自动创建，要先手动创建好)
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function(req, file, cb) {
        // console.log('file', file)
        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName);
    }
});
const upload = multer({ storage });

router.post('/uploadFile', upload.single('file_data'), function(req, res, next) {
    // req.file 是 `file_data` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    // let { fileName } = req.file;
    // console.log(req.file);
    res.json({ code: 200, msg: '上传成功', img: "http://127.0.0.1:3001/uploads/" + req.file.filename });
});
//导出
module.exports = router;