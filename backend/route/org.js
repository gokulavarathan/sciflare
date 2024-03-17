const express = require("express")
const controller= require("../controller/orgController")
const route = express.Router()
const validator = require("../helper/validator")
const tokenUtils = require('../helper/passport');


route.get("/routHealtCheck",(req,res)=>{res.json({status:true,message:"response from route"})})

// route.post("/seedData",controller.seedData)

route.post("/crtOrg",tokenUtils.verifyTokenWithPassport,validator.postValidation,controller.crtOrg)

route.get("/listOrg",tokenUtils.verifyTokenWithPassport,controller.listOrg)

route.get("/viewOrg/:id",tokenUtils.verifyTokenWithPassport,controller.viewOrg)

route.delete("/delOrg/:id",tokenUtils.verifyTokenWithPassport,controller.delOrg)

route.put("/updateOrg/:id",tokenUtils.verifyTokenWithPassport,controller.updateOrg)



module.exports = route