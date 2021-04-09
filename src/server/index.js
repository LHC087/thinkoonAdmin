// node后端服务器
const gwApi = require('./api/gwApi') //官网api
const bannerApi = require('./api/bannerApi')
const resourceMatrixApi = require('./api/resourceMatrixApi')
const marketingCaseApi = require('./api/marketingCaseApi')
const redRecruitingApi = require('./api/redRecruitingApi')
const contanctUsApi = require('./api/contanctUsApi')
const uploadImgApi = require('./api/uploadImgApi')
const bodyParser = require('body-parser')
// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析

const express = require('express') // express框架
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 后端api路由
app.use('/gw', gwApi) // 使用bannerApi文件中的接口
app.use('/banner', bannerApi) // 使用bannerApi文件中的接口
app.use('/resourceMatrix', resourceMatrixApi) // 使用resourceMatrixApi文件中的接口
app.use('/marketingCase', marketingCaseApi) // 使用marketingCaseApi文件中的接口
app.use('/redRecruiting', redRecruitingApi) // 使用redRecruitingApi文件中的接口
app.use('/contanctUs', contanctUsApi) // 使用contanctUsApi文件中的接口
app.use('/upload', uploadImgApi) // 使用uploadImgApi文件中的接口
// 监听端口
app.listen(3001) // 监听server3000端口
console.log('success listen at port:3001')
