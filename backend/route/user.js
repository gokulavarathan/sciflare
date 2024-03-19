const express = require("express")
const controller= require("../controller/userController")
const route = express.Router()
const validator = require("../helper/validator")
const tokenUtils = require('../helper/passport');



route.get("/routHealtCheck",(req,res)=>{res.json({status:true,message:"response from route"})})

route.post("/signUp",validator.postValidation,controller.crtUsr)

route.post("/login",validator.postValidation,controller.login)


route.get("/listusr",tokenUtils.verifyTokenWithPassport,controller.listusr)

route.get("/viewusr/:id",tokenUtils.verifyTokenWithPassport,controller.viewusr)

route.delete("/delusr/:id",tokenUtils.verifyTokenWithPassport,controller.delusr)

route.put("/updateusr/:id",tokenUtils.verifyTokenWithPassport,controller.updateusr)

route.post("/mapOrgToUsr",tokenUtils.verifyTokenWithPassport,validator.postValidation,controller.mapOrgToUsr)


module.exports = route