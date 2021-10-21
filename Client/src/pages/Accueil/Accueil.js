import React, { useState, useEffect, Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Accueil.css";
import "bootstrap/dist/css/bootstrap.css";
import drivingbg from '../../Assets/drivingbg.jpg';
import logopng from '../../Assets/logo33.png';
import { useHistory } from 'react-router-dom';
import { Message } from "@material-ui/icons";
import Footer from '../../components/Footer/Footer'
const Axios = require('axios')

export default function Login() {
  localStorage.removeItem("userInfo")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 
  const [candidatlogged,setCandidatlogged] = useState(true)
  const [employelogged,setEmployelogged] = useState(true)

  let history = useHistory()

  const getCandidatData = (e) => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/candidats",

    }).then(resp => {

      for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].email == [email]) {
          localStorage.setItem("userInfo", JSON.stringify(resp.data[i]));
          let storageData = localStorage.getItem("userInfo");
          let dataNchala = JSON.parse(storageData)
          console.log(dataNchala)
          console.log(dataNchala.role)
          history.push("/home_candidat")
          
        }
      }
    })
  };

  const getEmployeData = (e) => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/employes",

    }).then(resp => {

      for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].email == [email]) {
          localStorage.setItem("userInfo", JSON.stringify(resp.data[i]));
          let storageData = localStorage.getItem("userInfo");
          let dataNchala = JSON.parse(storageData)
          console.log(dataNchala)
          if (dataNchala.prenom == "admin") {
            history.push("./home_admin")
          }
          else { history.push("./home_employe")}
          
        }
      }
    })
  };

  const isAuthen = (e) => {
    e.preventDefault();
   
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/checkToken",
      headers: {
        'Content-Type': "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        localStorage.setItem("loggedIn", "true")
        
        const data = res.data;
        console.log(data);
      }
    })
  };
  const login = (e) => {
   
    Axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:5000/candidats/login",
    }).then((response) => {
      if (response.data.auth) {
        localStorage.setItem("token", response.data.token)
        console.log(response.data)
        isAuthen(e);
        getCandidatData(e)
        setMessage('')
        setCandidatlogged(true)
      
       
      }
      else {
        console.log(response.data.message)
        setCandidatlogged(false)
      }
    });

    Axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:5000/employes/login",
    }).then((response) => {
      if (response.data.auth) {
        localStorage.setItem("token", response.data.token)
        console.log(response.data)
        isAuthen(e);
        getEmployeData(e)
        setMessage('')
        setEmployelogged(true)
      
       
      }
      else {
        console.log(response.data)
       setEmployelogged(false)
      }
    }
    )
  
  
  };
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    console.log(employelogged)
    console.log(candidatlogged)
     handleShow();
  };

  return (
    <div className="acc_container">
      <div className="acc_image_container">
        <div className="car_block"></div>
        <img className="acc_img" src={drivingbg} />
      </div>
      <div className="welcome_text">
        <span className="bienvenue">Bienvenue</span> <br />à la meilleur des <br />
        auto-écoles.
      </div>
      <div className="cadre_noir"></div>
      <img className="logoo" src={logopng} />
      <div className="allezytext">Allez-y</div>
      <div className="notez_bien"> Conduire, ça rend libre! </div>
      <div
        className="loginbutton"

      >
        <Button variant="primary" onClick={handleShow} style={{ backgroundColor: "#1a8daa", color: "black", border: "black", boxShadow: "rgba(46, 46, 46, 0.62)", height: "58px", width: "240px", fontSize: "27px" ,fontFamily:'Info'}}>
          Connectez-vous !
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#6a6a6a" }}>
          <Modal.Title style={{ color: "white"  , fontFamily:'Info'}}>Connectez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body >

          <Form onSubmit={onLoginFormSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{fontFamily:'Info' ,fontSize:'17px',fontWeight:'bold'}}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) =>{ 
                  setEmail(e.target.value)
                  setMessage("")
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{fontFamily:'Info' ,fontSize:'17px',fontWeight:'bold'}}>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setMessage('')
                }}
              />
            </Form.Group>
           <br/>
            <Button variant="primary" type="submit" block onClick={login} >
              Se connecter
            </Button>
          </Form>
          <br/>
         {employelogged==false && candidatlogged==false?(<p style={{color:'red' , fontSize:'15px' , fontFamily:'Info',fontWeight:'bold'}}> Erreur lors de la connexion, Veuillez vérifier vos données !</p>):(<p>  </p>)}
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary"  onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
             
    </div>
  );
}