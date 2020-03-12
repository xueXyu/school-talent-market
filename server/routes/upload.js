'use strict';

const express = require('express');
const router = express.Router();

const util = require('../util');
const multer = require('multer');
const fs = require('fs');

router.get('/', (req, res) => {
    res.end('Hello! this is upload api');
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = __dirname + '/../uploads/' + util.getCurrentDay();
        util.checkDirExist(path);
        // 保存的路径
        cb(null, path)
    },
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split('.'); // 取后缀
        cb(null, 'img-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
});

var upload = multer({storage: storage});

router.post('/img', upload.single('file'),
    async (req, res, next) => {
        var date = util.getCurrentDay();
        var url = `/uploads/${date}/${req.file.filename}`;
        res.json({
            code: 0,
            message: 'success',
            data: {
                'url': url
            }
        });
    }
);

// 图片加载
router.get('/*', function (req, res) {
    let file_path = __dirname + "/" + req.url;
    console.log('图片显示');
    fs.readFile(file_path, 'binary', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            //console.log(data);
            console.log("输出文件");
            //不加这句，页面可能会乱码，图片包含中文也会乱码
            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            });
            res.write(data, 'binary');
            res.end();
        }
    })
});

module.exports = router;
