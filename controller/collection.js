var express = require('express');
var router = express.Router();
var collection = require("../database/model/collection")
function isMobile(mobile) {
    // return /^1[34578]\d{9}$/.test(this);
    return /^1[3456789]\d{9}$/.test(mobile); // 2017年底10批电信网码号申请199  198  166
}

router.post('/collection/add', function (req, res) {
    let {username, mobile, content} = req.body;

    collection.findOne({mobile}).then(data => {
        if (data) {
            res.json({
                code: 401,
                msg: "手机号已存在！",
            })
        } else {
            if (!isMobile(mobile)) {
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
