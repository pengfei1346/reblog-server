const {Router} = require("express")
const router = Router()
const path = require('path')
const fs = require('fs');
const request = require('request');
const register = require('./register')
const login = require('./login')
const categories = require('./categories')
const upload = require('./upload')
const article = require('./article')
var multiparty = require('multiparty');

router.get('/client', function(req, res, next) {
    res.sendFile(path.resolve(__dirname,'../public/index.html'));
});

router.get('/admin', function(req, res, next) {
    res.sendFile(path.resolve(__dirname,'../admin/index.html'));
});

router.get('/react', function(req, res, next) {
  res.sendFile(path.resolve(__dirname,'../react/index.html'));
});

router.get('/test', (req, res) => {
    res.json({
        text: "测试",
        data: "测试数据"
    })
})

router.post('/getText', async (req, res) => {

    let form = new multiparty.Form();

    function callback(error, response, body) {
        if (error != null) {
            console.log(error);
        }
        else {
            console.log('The audio file recognized result:');
            console.log(body);
            if (response.statusCode == 200) {
                body = JSON.parse(body);
                if (body.status == 20000000) {
                    res.json({
                        data: body.result
                    })
                    console.log('result: ' + body.result);
                    console.log('The audio file recognized succeed!');
                } else {
                    console.log('The audio file recognized failed!');
                }
            } else {
                console.log('The audio file recognized failed, http code: ' + response.statusCode);
            }
        }
    }

    function process(requestUrl, token, audioFile) {
        /**
         * 读取音频文件
         */
        var audioContent = null;
        console.log(typeof audioFile);
        try {
            audioContent = audioFile;
        } catch(error) {
            if (error.code == 'ENOENT') {
                console.log('The audio file is not exist!');
            }
            return;
        }

        /**
         * 设置HTTPS请求头部
         */
        var httpHeaders = {
            'X-NLS-Token': token,
            'Content-type': 'application/octet-stream',
            'Content-Length': audioContent.length
        };

        var options = {
            url: requestUrl,
            method: 'POST',
            headers: httpHeaders,
            body: audioContent
        };

        request(options, callback);
    }


    var appkey = 'dL7JBCb7g6kFNILP';
    var token = 'f13837e1a7be43e9b9eb451110c742a0';

    var url = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/asr';
    var audioFile = path.resolve(__dirname,'../public/hello.mp3')

    var format = 'pcm';
    var sampleRate = '16000';
    var enablePunctuationPrediction = true;
    var enableInverseTextNormalization = true;
    var enableVoiceDetection  = false;

    /**
     * 设置RESTful请求参数
     */
    var requestUrl = url;
    requestUrl = requestUrl + '?appkey=' + appkey;
    requestUrl = requestUrl + '&format=' + format;
    requestUrl = requestUrl + '&sample_rate=' + sampleRate;
    if (enablePunctuationPrediction) {
        requestUrl = requestUrl + '&enable_punctuation_prediction=' + 'true';
    }
    if (enableInverseTextNormalization) {
        requestUrl = requestUrl + '&enable_inverse_text_normalization=' + 'true';
    }
    if (enableVoiceDetection) {
        requestUrl = requestUrl + '&enable_voice_detection=' + 'true';
    }

    form.parse(req, function (err, fields, files) {
        let { file } = fields
        process(requestUrl, token, file);
    })


})

router.use(register);
router.use(login);
router.use(categories);
router.use(upload);
router.use(article);

module.exports = router;
