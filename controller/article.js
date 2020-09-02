const {Router} = require("express");const router = Router();const article = require('../database/model/article')// db.collectionname.update({条件},{$set:{j:"44"}});//引入Multiparty解析表单var multiparty = require('multiparty');var fs = require('fs');function getLocalIP() {    if(process.env.NODE_ENV == 'development') {        var ifaces = require('os').networkInterfaces();        let ip = []        for (var dev in ifaces) {            ifaces[dev].forEach(function (details, alias) {                if (details.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {                    ip.push(details.address)                }            });        }        return ip[0]    }else {        return '62.234.90.11'    }}router.post('/article', (req, res) => {    let author = 'cpf'    // let username = req.session.users.username;    let username = 'cpf';    let {title, content, coverImgUrl, tags, abstract} = req.body;    let heatNum = 0, browseNum = 0, replyNum = 0;    article.create(        {            username, title, content, tags, author, abstract,            coverImgUrl, heatNum, browseNum, replyNum        }    )        .then(data => {            if (data) {                res.json({                    code: 200,                    data,                    msg: "添加成功"                })            } else {                res.json({                    code: 400,                    msg: "添加失败"                })            }        })        .catch(err => {            res.json({                code: 500,                msg: "服务器错误"            })        })    return    // let author = req.session.user.username    if (req.session.user) {        let author = req.session.user.username        // let username = req.session.users.username;        let username = 'cpf';        let {title, content, coverImgUrl, tags, abstract} = req.body;        let heatNum = 0, browseNum = 0, replyNum = 0;        article.create(            {                username, title, content, author, abstract, coverImgUrl,                heatNum, browseNum, replyNum, publishTime            }        )            .then(data => {                if (data) {                    res.json({                        code: 200,                        data,                        total: data.length,                        msg: "添加成功"                    })                } else {                    res.json({                        code: 400,                        msg: "添加失败"                    })                }            })            .catch(err => {                res.json({                    code: 500,                    msg: "服务器错误"                })            })    } else {        res.json({            code: 403,            msg: '未登录不能发布笔记'        })    }})router.get('/article', (req, res) => {    let {pn = 1, size = 10, title,tag} = req.query;    let reg = new RegExp(title)    // let tagReg = new RegExp(tag)    article.countDocuments({},(err,count) => {        article.aggregate(          [              // {$unwind: "$tags"},              {                  $match: {                      $or: [                          {title: reg},                          // {tags:{$in: [tagReg]}},                          // tagReg                          // {content: reg}                          // {title: {'$regex': title, $options: '$i'}}                      ]                  }              },              {                  $lookup: {                      from: "users",                      localField: "authorMsg",                      foreignField: "_id",                      as: "authorMsg"                  }              },              {                  $project: {                      heatNum: 1,                      browseNum: 1,                      replyNum: 1,                      tags: 1,                      title: 1,                      content: 1,                      contentText: 1,                      author: 1,                      authorMsg: {                          avatar: 1,                          username: 1                      },                      abstract: 1,                      coverImgUrl: 1,                      createdAt: 1,                      updatedAt: 1                  }              },              {                  $sort: {                      _id: -1                  }              },              {                  $limit: Number(size)              },              {                  $skip: (pn - 1) * Number(size)              }          ]        ).then(data => {            // data.forEach(v => {            //     v.coverImgUrl = `http://${getLocalIP()}:3300/${v.coverImgUrl}`            // })            res.json({                code: 200,                data,                total: count,                msg: "获取成功"            })        })    })})router.get('/article/:id', (req, res) => {    let {id} = req.params;    article        .findOneAndUpdate({_id: id},            {                $inc: {browseNum: 1}            })        .then(data => {            // data.coverImgUrl = `http://${getLocalIP()}:3300/${data.coverImgUrl}`            res.json({                code: 200,                data,                msg: "获取成功"            })        })        .catch(err => {            res.json({                code: 400,                msg: "获取失败"            })        })})router.get('/article/type/:type', (req, res) => {    let {type} = req.params;    let {pn = 1, size = 10} = req.query;    article.find({'tags': type})        .sort({_id: -1})        .limit(size)        .skip((pn - 1) * (size))        .limit(10)        .then(data => {            res.json({                code: 200,                data,                msg: 'success'            })        })})router.post('/article/uploadImg', (req, res) => {    var form = new multiparty.Form();    //保存图片    form.parse(req, function (err, fields, files) {        let { file } = fields;        //将前台传来的base64数据去掉前缀        var imgData = file[0].replace(/^data:image\/\w+;base64,/, '')        var dataBuffer = new Buffer(imgData, 'base64');        // coverImgUrl        const randomId = Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36)        let fileName = `IMG_${randomId}.png`        //写入文件        fs.writeFile('uploads/images/' + fileName, dataBuffer, function (err) {            if (err) {                res.json({                    code: 400,                    msg: "添加失败"                })            } else {                res.json({                    code: 200,                    url: `http://${getLocalIP()}:3300/images/${fileName}`,                    // url: `images/${fileName}`,                    msg: "添加成功"                })            }        });    });})router.put('/article/:id', (req, res) => {    let {id} = req.params;    let {        username, title, content,        tags, author, abstract, coverImgUrl    } = req.body;    if(!username && !title && !content) {        res.json({            code: 500,            msg: "数据不全"        })        return    }    article      .findOneAndUpdate({_id: id},        {            $set: {                username, title, content, tags,                author, abstract, coverImgUrl            }        })      .then(data => {          res.json({              code: 200,              msg: "修改成功"          })      })      .catch(err => {          res.json({              code: 400,              msg: "修改失败"          })      })})router.delete('/article/:id', (req, res) => {    let {id} = req.params;    article.remove({_id: id})      .then(data => {          res.json({              code: 200,              data,              msg: "删除成功"          })      })      .catch(err => {          res.json({              code: 500,              msg: "服务器错误"          })      })})//  分类module.exports = router;