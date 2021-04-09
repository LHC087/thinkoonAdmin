// resourceMatrixApi.js
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
router.get('/selectResourceMatrix', (req, res) => {
  var sql = $sql.resourceMatrix.search
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
router.get('/getResourceMatrixList', (req, res) => {
  var sql = $sql.resourceMatrix.searchAll
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
router.post('/addResourceMatrix', (req, res) => {
  var sql = $sql.resourceMatrix.add
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.type, parms.species, parms.resource_name, parms.resource_img_url, parms.resource_desc, parms.resource_relate_url, parms.order_num, parms.invaild], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 编辑列表
router.put('/updateResourceMatrix', (req, res) => {
  var sql = $sql.resourceMatrix.update
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.type, parms.species, parms.resource_name, parms.resource_img_url, parms.resource_desc, parms.resource_relate_url, parms.order_num, parms.invaild, parms.resource_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 是否生效
router.put('/changeResourceMatrixInvaild', (req, res) => {
  var sql = $sql.resourceMatrix.changeInvaild
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.invaild, parms.resource_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 删除列表
router.post('/deleteResourceMatrix', (req, res) => {
  var sql = $sql.resourceMatrix.delete
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.resource_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
