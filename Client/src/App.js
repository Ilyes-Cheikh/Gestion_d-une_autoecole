import React ,{useEffect} from 'react';
import './App.css';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import { frFR } from '@material-ui/core/locale';
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Candidats_adminpage from './pages/CandidatsPages/Candidats_Adminpage'
import Candidats_employepage from './pages/CandidatsPages/Candidats_Employepage'
import Starttest from './pages/testcode/Starttest';
import HomePageCandid from './pages/HomePage/HomepageCandid';
import HomePageAdmin from './pages/HomePage/HomeAdmin';
import HomePageEmpl from './pages/HomePage/HomePageEmploye';
import CandidatCalendrier from './pages/CandidatCalendrier/CandidatCalendrier';
import AdminCalendrier from './pages/AdminCalendrier/AdminCalendrier';
import EmployeCalendrier from './pages/EmployeCalendrier/EmployeCalendrier';
import Voiture_adminpage from './pages/VoituresPages/Voiture_adminpage';
import Voiture_employepage from './pages/VoituresPages/Voiture_employepage';
import 'react-toastify/dist/ReactToastify.css';
import Acc from "./pages/Accueil/Accueil"
import Axios from 'axios'
import moment from 'moment'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Employes from './pages/Employe/Employe';
import Test1 from './pages/testcode/Test/test1';
import { ToastContainer, toast } from 'react-toastify';

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#ecd06f",
      light: '#1a8daa'
    },
    secondary: {
      main: "#151517",
      light: '#43dcbd'
    },
    background: {
      default: "#bdbdbd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
   
    }
  }
},frFR);


const useStyles = makeStyles({
  appMain: {

    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  useEffect(() =>{
    Axios.get('http://localhost:5000/voitures').then(
                (data) => { 
                  for (let i = 0; i < data.data.length; i++) {
                  
                  if(moment(data.data[i].prochainevisite).diff(moment(new Date()), 'days')<8)
                     toast("Vous avez une proche visite !",{
                    position: toast.POSITION.TOP_CENTER,
                    style:{background:"#ffbb33",color:"white"},
                    progressClassName: 'Toastify__progress-bar--dark',
                    autoClose: false,
                    toastId: 1
                  })
                  if(moment(data.data[i].prochaineassurance).diff(moment(new Date()), 'days')<8)
                     toast("Vous avez une proche assurance !",{
                    position: toast.POSITION.TOP_CENTER,
                    style:{background:"#ffbb33",color:"white"},
                    progressClassName: 'Toastify__progress-bar--dark',
                    autoClose: false,
                    toastId: 2
                  })
                  if(moment(data.data[i].prochaineassurance).diff(moment(new Date()), 'days')<8)
                     toast("Vous avez une proche vignette !",{
                    position: toast.POSITION.TOP_CENTER,
                    style:{background:"#ffbb33",color:"white"},
                    progressClassName: 'Toastify__progress-bar--dark',
                    autoClose: false,
                    toastId: 3
                  })
                  }

                })
    ;})
  return (
    <Router>
    <div>
    <ThemeProvider theme={theme}>
  
      
        <AnimatePresence exitBeforeEnter>
      <div className={classes.appMain}>
      <Switch>
      <Route path="/" exact component={Acc} />
      
      <Route component={HomePageCandid} exact path="/home_candidat" />
      <Route exact path="/home_employe">
          <ToastContainer />
          <HomePageEmpl />
          </Route>
      <Route exact path="/home_admin">
          <ToastContainer />
          <HomePageAdmin />
          </Route>
          <Route path="/candidats_admin">
          <ToastContainer />
          <Candidats_adminpage />
          </Route>
          <Route path="/candidats_employe">
          <ToastContainer />
          <Candidats_employepage/>
          </Route>
          <Route exact path="/testcode">
          <Starttest/>
          </Route>
          <Route exact path="/testcode/1">
          <Test1/>
          </Route>
          <Route path="/employes">
          <ToastContainer />
          <Employes />
          </Route>
          <Route path="/voitures_admin">
          <ToastContainer />
          <Voiture_adminpage/>
          </Route>
          <Route path="/voitures_employe">
          <ToastContainer />
          <Voiture_employepage/>
          </Route>
          <Route path="/calendrier">
          <ToastContainer />
          <AdminCalendrier />
          </Route>
          <Route path="/Calendrier_candidat">
          <CandidatCalendrier />
          </Route>
          <Route path="/Calendrier_employe">
          <ToastContainer />
          <EmployeCalendrier />
          </Route>
          
      </Switch>
      
      </div>
      </AnimatePresence>
      <CssBaseline />
    </ThemeProvider>
    </div>
    </Router>

  );
}

export default App;
