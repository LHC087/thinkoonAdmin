// bannerApi.js
var models = require('../db') // 引入db配置
var express = require('express') // express框架
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap') // sql语句

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 查询列表接口，
router.get('/selectBanner', (req, res) => {
  var sql = $sql.banner.search
  var parms = req.query
  console.log(parms)
  conn.query(sql, [parms.selectKey], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      res.send(result)
    }
  })
})
// 查询列表接口，
// get接口，这里配置的/getBannerList,使用的时候就是 /banner/getBannerList
// 回看index.js 中 app.use('/banner', bannerApi) ，就懂了
router.get('/getBannerList', (req, res) => {
  var sql = $sql.banner.searchAll
  var parms = req.query
  console.log(parms)
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      res.send(result)
    }
  })
})

// 新增列表
router.post('/addBanner', (req, res) => {
  var sql = $sql.banner.add
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.type, parms.banner_img_url, parms.order_num, parms.invaild], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 编辑列表
router.put('/updateBanner', (req, res) => {
  var sql = $sql.banner.update
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.type, parms.banner_img_url, parms.order_num, parms.invaild, parms.banner_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 是否生效
router.put('/changeBannerInvaild', (req, res) => {
  var sql = $sql.banner.changeInvaild
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.invaild, parms.banner_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 删除列表
router.post('/deleteBanner', (req, res) => {
  var sql = $sql.banner.delete
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.banner_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
