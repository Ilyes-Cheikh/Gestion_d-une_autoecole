const express = require("express")
const port = 5000|| process.env.PORT
const hostname='localhost'
site = express()
site.use(express.json())
site.use(express.urlencoded())
const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:admin@autoecole.kb0cu.mongodb.net/autoecole?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('connected')
    site.listen(port, ()=>{
        console.log(`server is running at http:${hostname}:${port}`)
})
}).catch((err)=>{
    console.log('error while connecting to database')
})

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
site.use(cors(corsOptions));

site.use('/candidats',require('./router/api/candidat'))

site.get('/',(req,res)=>{
    res.send("hello ")
})

site.use("/checkToken",require("./router/api/checkToken"));
site.use('/employes',require('./router/api/employe'));
site.use('/events',require('./router/api/event'));
site.use('/voitures',require('./router/api/voiture'));