const mongoose = require("mongoose")

const Schema = mongoose.Schema

const eventSchema = new Schema({
    date : {type:Date,required:true},
    content: {type:String,required:true},
    candidat : {type:String,required:true},
    employe : {type:String,required:true},
    heure :{type:String,required:true}
  
},{timestamps : true})


const event = mongoose.model('event',eventSchema)
module.exports = event
