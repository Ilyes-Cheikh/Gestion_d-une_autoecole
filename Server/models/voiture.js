const mongoose = require("mongoose")

const Schema = mongoose.Schema

const voitureSchema = new Schema({
    marque : {type:String,required:true},
    modele: {type:String,required:true},
    matricule : {type:String,required:true,unique:true},
    prochaineassurance : {type:String,required:true},
    prochainevisite : {type:String,required:true},
    prochainevignette : {type:String,required:true},

    miseenservice : {type:String,required:true}
},{timestamps : true})


const voiture = mongoose.model('voiture',voitureSchema)
module.exports = voiture
