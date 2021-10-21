const mongoose = require("mongoose")

const Schema = mongoose.Schema

const employeSchema = new Schema({
    nom : {type:String,required:true},
    prenom: {type:String,required:true},
    mobile : {type:String,required:true},
    departmentId : {type:String,required:true,unique:false},
    numcin : {type:String,required:true}, 
    email : {type:String},
    password:{type:String},
    salaire:{type:String},
    lieudenaissance:{type:String},
    nombredheuresdutravail:{type:String},
    datedenaissance:{type:Date},
    gender:{type:String}
},{timestamps : true})


const employe = mongoose.model('employes',employeSchema)
module.exports = employe
