const {Router} = require("express")
const router = Router()
const path = require('path')

const register = require('./register')
const login = require('./login')
const categories = require('./categories')
const upload = require('./upload')
const article = require('./article')

router.get('/client', function(req, res, next) {
    res.sendFile(path.resolve(__dirname,'../public/index.html'));
});

router.get('/admin', function(req, res, next) {
    res.sendFile(path.resolve(__dirname,'../admin/index.html'));
});

router.get('/react', function(req, res, next) {
  res.sendFile(path.resolve(__dirname,'../react/index.html'));
});

router.get('/demo', (req, res) => {
    res.json({
        text: "测试",
        data: "测试数据"
    })
})
router.use(register);
router.use(login);
router.use(categories);
router.use(upload);
router.use(article);

module.exports = router;
