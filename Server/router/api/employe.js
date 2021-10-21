const express = require("express")
const router = express.Router() 
const employe = require("../../models/employe")
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';

router.get("/", (req,res)=>{

    employe.find().then((result)=>{
        res.send(JSON.stringify(result))
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
});

router.post("/",(req,res)=>{
    const newEmploye = new employe({
      nom : req.body.nom,
      prenom : req.body.prenom,
      mobile : req.body.mobile,
      numcin : req.body.numcin,
      email : req.body.email,
      password : req.body.password,
      departmentId : req.body.departmentId,
      salaire : req.body.salaire,
      nombredheuresdutravail : req.body.nombredheuresdutravail,
      lieudenaissance : req.body.lieudenaissance,
      datedenaissance : req.body.datedenaissance,
      gender : req.body.gender
    })
    newEmploye.save().then((result) => {
        console.log(result)
        res.send(JSON.stringify(result))
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ err: "une erreur s'est produite" }))
    })
})

router.put("/:id",(req,res)=>{
    
    employe.findByIdAndUpdate(req.params.id, {
      nom : req.body.nom,
      prenom : req.body.prenom,
      mobile : req.body.mobile,
      numcin : req.body.numcin,
      email : req.body.email,
      password : req.body.password,
      departmentId : req.body.departmentId,
      salaire : req.body.salaire,
      nombredheuresdutravail : req.body.nombredheuresdutravail,
      lieudenaissance : req.body.lieudenaissance,
      datedenaissance : req.body.datedenaissance,
      gender : req.body.gender
    }).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

router.delete("/:id",(req,res)=>{
    const employe_id = req.params.id
    employe.findById(employe_id).then((employeToDelete)=>{
        employeToDelete.delete();
        res.json({message:"l'employ est supprimé !"})
    }).catch(err=>{
        console.log(err)
    })
  
})
router.post('/login', function (req, res) {
    const { email, password } = req.body;
    employe.findOne({ email }).then((user) => {
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