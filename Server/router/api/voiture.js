const express = require("express")
const router = express.Router() 
const voiture = require("../../models/voiture")
module.exports = router
router.get("/",(req,res)=>{

    voiture.find().then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})


router.post("/",(req,res)=>{
    const newVoiture = new voiture({
      marque : req.body.marque,
      modele : req.body.modele,
      matricule : req.body.matricule,
      prochaineassurance : req.body.prochaineassurance,
      prochainevisite : req.body.prochainevisite,
      prochainevignette : req.body.prochainevignette,
      miseenservice : req.body.miseenservice
    })
    newVoiture.save().then((result) => {
        console.log(result)
        res.send(JSON.stringify(result))
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ err: "une erreur s'est produite" }))
    })
})

router.delete("/:id",(req,res)=>{
    const voiture_id = req.params.id
    voiture.findById(voiture_id).then((voitureToDelete)=>{
        voitureToDelete.delete();
        res.json({message:'le voiture est supprimé !'})
    }).catch(err=>{
        console.log(err)
    })
  
})

router.put("/:id",(req,res)=>{
    
    voiture.findByIdAndUpdate(req.params.id, {
        marque : req.body.marque,
        modele : req.body.modele,
        matricule : req.body.matricule,
        prochaineassurance : req.body.prochaineassurance,
        prochainevisite : req.body.prochainevisite,
        prochainevignette : req.body.prochainevignette,
        miseenservice : req.body.miseenservice
    }).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})