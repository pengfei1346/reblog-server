var express = require('express');
var router = express.Router();
var collection = require("../database/model/collection")
var isMobilePhone = require('validator/lib/isMobilePhone')

router.post('/collection/add', function (req, res) {
    let {username, mobile, content} = req.body;
    // console.log(username,email, password)
    collection.findOne({mobile}).then(data => {
        if (data) {
            res.json({
                code: 401,
                msg: "手机号已存在！",
            })
        } else {
            if (!isMobilePhone(mobile)) {
                res.json({
                    code: 402,
                    msg: "请输入正确的手机号！",
                })
            }
            else {
                collection.create({username, mobile, content}).then((data) => {
                    res.json({
                        code: 200,
                        msg: "录入成功！"
                    })
                }).catch(err => {
                    res.json({
                        code: 401,
                        msg: "录入失败！"
                    })
                })
            }
        }
    })
});

// router.post('/putImg', function (req, res) {
//
// });
module.exports = router;
