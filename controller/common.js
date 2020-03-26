const {Router} = require("express");
const router = Router();

router.get('/banner', (req, res) => {
    let {pn = 1, size = 10, title} = req.query;
    let reg = new RegExp(title)

    article.aggregate(
        [
            {
                $match: {
                    $or: [
                        {title: reg},
                        {content: reg}
                    ]
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorMsg",
                    foreignField: "_id",
                    as: "authorMsg"
                }
            },
            {
                $project: {
                    heatNum: 1,
                    browseNum: 1,
                    replyNum: 1,
                    tags: 1,
                    title: 1,
                    content: 1,
                    contentText: 1,
                    author: 1,
                    authorMsg: {
                        avatar: 1,
                        username: 1
                    },
                    abstract: 1,
                    coverImgUrl: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $limit: size
            },
            {
                $skip: (pn - 1) * size
            }
        ]
    ).then(data => {
        data.forEach(v => {
            v.coverImgUrl = `http://${getLocalIP()}:3300/${v.coverImgUrl}`
        })
        res.json({
            code: 200,
            data,
            msg: "获取成功"
        })
    })
})

