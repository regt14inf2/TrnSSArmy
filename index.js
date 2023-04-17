const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const dotenv = require("dotenv")
const reg = require('./route/reg')
const globalSetting = require('./route/globalSetting')
const imports = require('./route/import')
const soldierlist = require('./route/soldierlist')
const cors = require('cors')
dotenv.config()

app.use(cors())
app.use(bodyParser.json())

app.use('/authen', reg)
app.use('/setting',globalSetting)
app.use('/import',imports)
app.use('/callinfo',soldierlist)

app.listen(process.env.PORT, () => {
    console.log(`running at ${process.env.PORT}`)
})
