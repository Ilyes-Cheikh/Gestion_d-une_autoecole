const mongoose = require("mongoose")

const Schema = mongoose.Schema

const candidatSchema = new Schema({
    nom : {type:String,required:true},
    prenom: {type:String,required:true},
    departmentId : {type:String,required:true,unique:false},
    mobile : {type:String,required:true},
    resteapayer : {type:String,required:true},
    email : {type:String},
    password:{type:String},
    prix:{type:String},
    numcin:{type:String,required:true},
    nombredheurestheorique:{type:String},
    nombredheurespratique:{type:String},
    gender:{type:String},
    lieudenaissance:{type:String},
    datededebutdesseancestheoriques : {type:String,required:true},
    datededebutdesseancespratiques : {type:String,required:true},
    datedenaissance : {type:String,required:true},
},{timestamps : true})


const candidat = mongoose.model('candidats',candidatSchema)
module.exports = candidat
