const express = require("express")
const bodyParser = require('body-parser')
const route = require("./route/org")
const user = require("./route/user")


const app = express()
const db = require("./model/db")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
});


app.get('/healthCheck', (req, res) => {res.json({status:true,message:'Response from server'})})
app.use("/",route)
app.use("/user",user)


app.listen(4000, () => console.log(`Front server running ` + 4000));

