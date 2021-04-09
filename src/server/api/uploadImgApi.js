// routes/upload.js
var express = require('express');
var router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
  //存储的位置
  destination: './public/images/', // 保存的路径，备注：需要自己创建
  //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
  filename(req, file, cb) {
    // cb(null, Date.now() + file.originalname)
    cb(null, file.originalname)

  }
})
const upload = multer({
  storage
})
router.post('/uploadImg', upload.single('file'), (req, res) => {
  //线上的也就是服务器中的图片的绝对地址
  var url = '/images/' + req.file.filename
  console.log('url', url)
  res.send({
    msg: 'success',
    avatarUrl: url
  })
})

module.exports = router;
