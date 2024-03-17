const User = require("../model/userModel")
const tokenUtils = require('../helper/passport');
const mongoose = require('mongoose');
const orgModel = require("../model/orgModel")


exports.crtUsr = async(req,res)=>{

    try{
        const {firstName,lastName,emailId,role,companyId,password } = req.body
        const usrFindRec = await userModel.exists({emailId:emailId})
        if(!usrFindRec){
            const reqData = {
                firstName:firstName,
                lastName:lastName,
                emailId:emailId,
                role:role,
                companyId:companyId,
                password:password
            }
            const createRec = await userModel.create(reqData)
            if(createRec){
                res.json({status:true,message:"Record update successfully"})
            }else{
            res.json({status:false,message:"Error occur while updating record",error:createRec})
            }
        }else{
            res.json({status:false,message:"EmailId already exist. EmailId should be unique!!"})
        }
        

    }catch(e){
    res.json({status:false,message:"Error occur while updating record",error:e})

    }
    

}

exports.login = async(req,res)=>{

    try{
        const {emailId,password } = req.body
        const usrFindRec = await userModel.exists({emailId:emailId,password:password})
        if(!usrFindRec){
            res.json({status:false,message:"Invalid credential!!!"})
        }else{
            const payload = { id: usrFindRec._id };
            const token = tokenUtils.generateToken(payload);
            res.json({ status:true,message: 'Successfully logged in', token: token });
            // res.json({status:true,usrFindRec})
        }
        
    }catch(e){
    res.json({status:false,message:"Error occur while updating record",error:e})
    }
    

}


exports.listusr = async(req,res)=>{
    try{
        var query
        if (req.userRole == "user"){
            query = {_id: new mongoose.Types.ObjectId(req.user.id)}
        }else{
            query = {}
        }
            const fetchRec = await userModel.find(query)
            if(fetchRec &&fetchRec.length!=0 ){
                res.json({status:true,data:fetchRec})
            }else{
            res.json({status:false,message:"No Record found",error:fetchRec})
            }
    }catch(e){
    res.json({status:false,message:"Error occur while fetching record",error:e})
    }
}

exports.viewusr = async(req,res)=>{
    try{
        const id = req.params.id
            User.findById({_id:id})
            .populate('companyId') 
            .then(user => {
                res.json({status:true,data:user})
            })
            .catch(err => {
            console.error('Error finding user:', err);
            res.json({status:false,message:"No Record found",error:fetchRec})
            });
    }catch(e){
    res.json({status:false,message:"Error occur while fetching record",error:e})
    }
}

exports.delusr = async(req,res)=>{
    try{
        const id = req.params.id
            const delRec = await userModel.deleteOne({_id:id})
            if(delRec){
                res.json({status:true,data:delRec})
            }else{
            res.json({status:false,message:"Error occur while Fetching record",error:delRec})
            }
    }catch(e){
    res.json({status:false,message:"Error occur while updating record",error:e})
    }
}

exports.updateusr = async(req,res)=>{
        const data = req.body;
        const id = req.params.id
        try {
            const fetchRec = await userModel.updateOne({ _id: new mongoose.Types.ObjectId(id) },{ $set: data });
            if(fetchRec){
                res.json({status:true,message:"Data updated successfully"})
            }else{
                res.json({status:false,message:"Error while updating record"})
            }
        } catch (error) {
            console.error("Error updating record:", error);
            res.status(500).json({ status: false, message: "Error updating record", error });
        }
    
}

exports.mapOrgToUsr = async(req,res)=>{
    const {id,companyId} = req.body;
    try {
        const fetchRec = await userModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id) },{ $set: {companyId:companyId} });
        if(fetchRec){
            res.json({status:true,message:"Data updated successfully"})
        }else{
            res.json({status:false,message:"Error while updating record"})
        }
    } catch (error) {
        console.error("Error updating record:", error);
        res.status(500).json({ status: false, message: "Error updating record", error });
    }

}