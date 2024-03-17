const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String },
    password: { type: String },
    role:{type: String,enum:["user","admin"]},
    companyId:  {type: mongoose.Schema.Types.ObjectId,ref: 'orgSchema'},
    createdAt: { type: Date, default: Date.now }
},{ versionKey: false })
userSchema.index({emailId:1,password:1})
module.exports =  mongoose.model('userSchema',userSchema,"userSchema")