// contanctUsApi.js
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
router.get('/selectContanctUs', (req, res) => {
  var sql = $sql.contanctUs.search
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
router.get('/getContanctUsList', (req, res) => {
  var sql = $sql.contanctUs.searchAll
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
router.post('/addContanctUs', (req, res) => {
  var sql = $sql.contanctUs.add
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.company_name, parms.telphone, parms.area1, parms.area2, parms.area3, parms.business_weixin_url, parms.red_weixin_url, parms.invaild], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 编辑列表
router.put('/updateContanctUs', (req, res) => {
  var sql = $sql.contanctUs.update
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.company_name, parms.telphone, parms.area1, parms.area2, parms.area3, parms.business_weixin_url, parms.red_weixin_url, parms.invaild, parms.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 是否生效
router.put('/changeContanctUsInvaild', (req, res) => {
  var sql = $sql.contanctUs.changeInvaild
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.invaild, parms.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 删除列表
router.post('/deleteContanctUs', (req, res) => {
  var sql = $sql.contanctUs.delete
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
