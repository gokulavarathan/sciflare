const mongoose = require('mongoose');

const orgSchema =  mongoose.Schema({
    orgName:{type:String},
    orgAddress: { type: String },
    orgCity: { type: String },
    postalCode: { type: Number },
    orgCountry: { type: String },
    createdAt: { type: Date, default: Date.now },
},{ versionKey: false ,})
orgSchema.index({orgName:1})
module.exports =  mongoose.model('orgSchema',orgSchema,"orgSchema")