// gwApi.js
var models = require('../db') // 引入db配置
var express = require('express') // express框架
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap') // sql语句

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()


// 首页轮播查询列表接口，
router.get('/getGWBannerList', (req, res) => {
  var sql = $sql.gwindex.searchBanner
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
// 相关详情页头部背景查询列表接口，
router.get('/getGWBjBannerList', (req, res) => {
  var sql = $sql.gwindex.searchBjBanner
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

// 首页资源矩阵查询列表接口，
router.get('/getGWResourceList', (req, res) => {
  var sql = $sql.gwindex.searchResource
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
// 详情页资源矩阵查询列表接口，
router.get('/getGWResourceDetailsList', (req, res) => {
  var sql = $sql.gwindex.searchResourceDetails
  var parms = req.query
  console.log(parms)
  conn.query(sql, [parms.species], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      res.send(result)
    }
  })
})
// 首页案例查询列表接口，
router.get('/getGWCase', (req, res) => {
  var sql = $sql.gwindex.searchCase
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

// 首页红人招募查询列表接口，
router.get('/getGWRed', (req, res) => {
  var sql = $sql.gwindex.searchRed
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
// 首页红人招募查询列表接口，
router.get('/getGWRedDetails', (req, res) => {
  var sql = $sql.gwindex.searchRedDetails
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



// 联系我们查询列表接口，
router.get('/getGWContant', (req, res) => {
  var sql = $sql.gwindex.searchContant
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


module.exports = router
