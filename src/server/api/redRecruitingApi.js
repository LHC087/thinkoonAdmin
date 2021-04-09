// redRecruitingApi.js
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
router.get('/selectredRecruiting', (req, res) => {
  var sql = $sql.redRecruiting.search
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
router.get('/getredRecruitingList', (req, res) => {
  var sql = $sql.redRecruiting.searchAll
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
router.post('/addredRecruiting', (req, res) => {
  var sql = $sql.redRecruiting.add
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.type, parms.reds_img_url, parms.reds_relate_url], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 编辑列表
router.put('/updateredRecruiting', (req, res) => {
  var sql = $sql.redRecruiting.update
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.type, parms.reds_img_url, parms.reds_relate_url, parms.reds_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 删除列表
router.post('/deleteredRecruiting', (req, res) => {
  var sql = $sql.redRecruiting.delete
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.reds_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
