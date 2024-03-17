const orgModel = require("../model/orgModel")
// const seedUsers = require('../helper/seed');
const mongoose = require('mongoose');
const userModel = require("../model/userModel")

exports.crtOrg = async(req,res)=>{

    try{
        const {orgName,orgAddress,orgCity,postalCode,orgCountry } = req.body
        const orgFindRec = await orgModel.exists({orgName:orgName})
        if(!orgFindRec){
            const reqData = {
                orgName:orgName,
                orgAddress:orgAddress,
                orgCity:orgCity,
                postalCode:postalCode,
                orgCountry:orgCountry
            }
            const createRec = await orgModel.create(reqData)
            if(createRec){
                res.json({status:true,message:"Record update successfully"})
            }else{
            res.json({status:false,message:"Error occur while updating record",error:createRec})
            }
        }else{
            res.json({status:false,message:"organisation name already exist. orgName should be unique!!"})
        }
        

    }catch(e){
    res.json({status:false,message:"Error occur while updating record",error:e})

    }
    

}

exports.listOrg = async(req,res)=>{
    try{
        
            const fetchRec = await orgModel.find({})
            if(fetchRec &&fetchRec.length!=0 ){
                if (req.userRole == "user"){
                    console.log(fetchRec,"id",req.companyId)
                    const resData = fetchRec.filter(val => { return val._id.equals(req.companyId)} );
                    res.json({status:true,data:resData})
                }else{
                    res.json({status:true,data:fetchRec})
                }
            }else{
            res.json({status:false,message:"No Record found",error:fetchRec})
            }
    }catch(e){
    res.json({status:false,message:"Error occur while updating record",error:e})
    }
}

exports.viewOrg = async(req,res)=>{
    try{
        const id = req.params.id
            const fetchRec = await orgModel.find({_id:id})
            if(fetchRec &&fetchRec.length!=0){
                const companyUserData = await userModel.find({"companyId":id})
                
                if (req.userRole == "user"){
                    console.log(companyUserData,"id",req.companyId)
                    const resData = companyUserData.filter(val => { return val._id.equals(req.user.id)} );
                    res.json({status:true,orgData:fetchRec,userData:resData})
                }else{
                    res.json({status:true,orgData:fetchRec,userData:companyUserData})
                }

            }else{
                res.json({status:false,message:"No Record found",error:fetchRec})
            }
    }catch(e){
    res.json({status:false,message:"Error occur while updating record",error:e})
    }
}

exports.delOrg = async(req,res)=>{
    try{
        const id = req.params.id
            const delRec = await orgModel.deleteOne({_id:id})
            if(delRec){
                res.json({status:true,data:delRec})
            }else{
            res.json({status:false,message:"Error occur while Fetching record",error:delRec})
            }
    }catch(e){
    res.json({status:false,message:"Error occur while updating record",error:e})
    }
}

exports.updateOrg = async(req,res)=>{
        const data = req.body;
        const id = req.params.id
        try {
            const fetchRec = await orgModel.updateOne({ _id: new mongoose.Types.ObjectId(id) },{ $set: data });
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






// exports.seedData = async(req,res)=>{
//         try {
//         await seedData();
//         res.json({ success: true, message: 'Seeding completed successfully' });
//         } catch (error) {
//         console.error('Error seeding data:', error);
//         res.status(500).json({ success: false, message: 'Error seeding data' });
//         }
    
// }

// async function seedData() {
//     try {
//     const organizationIds = await seedUsers;
//     // await seedUsers(organizationIds);
//     console.log('Seeding completed successfully');
//     } catch (error) {
//     console.error('Error seeding data:', error);
//     process.exit(1); 
//     }
// }