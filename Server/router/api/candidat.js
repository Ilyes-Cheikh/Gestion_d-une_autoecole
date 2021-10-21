const express = require("express")
const router = express.Router() 
const candidat = require("../../models/candidat")
const jwt = require('jsonwebtoken');

router.get("/",(req,res)=>{

    candidat.find().then((result)=>{
        res.send(JSON.stringify(result))
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
})
router.post("/",(req,res)=>{
    const newCandidat = new candidat({
      nom : req.body.nom,
      prenom : req.body.prenom,
      departmentId : req.body.departmentId,
      mobile : req.body.mobile,
      resteapayer : req.body.resteapayer,
      email : req.body.email,
      password : req.body.password,
      prix : req.body.prix,
      numcin:req.body.numcin,
      nombredheurestheorique:req.body.nombredheurestheorique,
      nombredheurespratique:req.body.nombredheurespratique,
      gender:req.body.gender,
      lieudenaissance:req.body.lieudenaissance,
      datededebutdesseancestheoriques : req.body.datededebutdesseancestheoriques,
      datededebutdesseancespratiques : req.body.datededebutdesseancespratiques,
      datedenaissance : req.body.datedenaissance,
    })
    newCandidat.save().then((result) => {
        console.log(result)
        res.send(JSON.stringify(result))
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ err: "une erreur s'est produite" }))
    })
})

const secret = 'mysecretsshhh';

router.delete("/:id",(req,res)=>{
    const candidat_id = req.params.id
    candidat.findById(candidat_id).then((candidatToDelete)=>{
        candidatToDelete.delete();
        res.json({message:'le candidat est supprimé !'})
    }).catch(err=>{
        console.log(err)
    })
  
})

router.put("/:id",(req,res)=>{
    
    candidat.findByIdAndUpdate(req.params.id, {
        nom : req.body.nom,
        prenom : req.body.prenom,
        departmentId : req.body.departmentId,
        mobile : req.body.mobile,
        resteapayer : req.body.resteapayer,
        email : req.body.email,
        password : req.body.password,
        prix : req.body.prix,
        numcin:req.body.numcin,
        nombredheurestheorique:req.body.nombredheurestheorique,
        nombredheurespratique:req.body.nombredheurespratique,
        gender:req.body.gender,
        lieudenaissance:req.body.lieudenaissance,
        datededebutdesseancestheoriques : req.body.datededebutdesseancestheoriques,
        datededebutdesseancespratiques : req.body.datededebutdesseancespratiques,
        datedenaissance : req.body.datedenaissance,

        
        
    }).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})


router.post('/login', function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .json({ auth: false, message: "Please enter all required fields." })
    }
    candidat.findOne({ email }).then((user) => {
        if (user) {
            const passwordCorrect = (password == user.password)

            if (passwordCorrect) {
                const payload = { email };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                console.log("done")
                res.json({ token: token, auth: true });
            }
            else {
                res.json({ auth: false, message: 'Le mot de passe que vous avez entré est incorrect.' });
            }
        }
        else {
            res.json({ auth: false, message: "L'e-mail que vous avez entré n'est pas connecté à un compte." })
        }
    }).catch(err => {
        res.json({ message: "error 1" })
    })
});

module.exports = router