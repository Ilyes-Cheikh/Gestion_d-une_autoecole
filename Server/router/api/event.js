const express = require("express")
const router = express.Router() 
const event = require("../../models/event")
module.exports = router
router.get("/",(req,res)=>{

    event.find().then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})
router.get('/:candidat',(req,res)=>{
    const nom_candidat = req.params.candidat
    event.find({candidat : nom_candidat}).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})
router.get('/employes/:employe',(req,res)=>{
    const nom_employe = req.params.employe
    event.find({employe : nom_employe}).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

router.post("/",(req,res)=>{
    const newEvent = new event({
      date : req.body.date,
      content : req.body.content,
      candidat : req.body.candidat,
      employe : req.body.employe,
      heure : req.body.heure
    })
    newEvent.save().then((result) => {
        console.log(result)
        res.send(JSON.stringify(result))
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ err: "une erreur s'est produite" }))
    })
})
router.delete("/:id",(req,res)=>{
    const event_id = req.params.id
    event.findById(event_id).then((eventToDelete)=>{
        eventToDelete.delete();
        res.json({message:"l'evenement est supprimé !"})
    }).catch(err=>{
        console.log(err)
    })
  
})