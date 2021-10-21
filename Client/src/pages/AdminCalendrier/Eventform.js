import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Datepicker from './Datepicker';
import './Eventform.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';

export default function EventFormDialog() {
  const [open, setOpen] = React.useState(false);
  const [nomcandidat, setNomcandidat] = useState('');
  const [heure, setHeure] = useState('');
  const [content, setContent] = useState('');
  const [nomemploye, setNomemploye] = useState('')
  const [dateseance, setDateseance] = useState(new Date())

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(nomcandidat)
    console.log(nomemploye)
    console.log(heure)
    console.log(content)
    let date = dateseance.toISOString()
    console.log(date)


    axios.post(
      'http://localhost:5000/events/', {

      'content': content,
      'candidat': nomcandidat,
      'employe': nomemploye,
      'heure': heure,
      'date': date,


    }


    ).then(response => {
      console.log("données enregistées dans la base de données ")
      window.location.reload()
    }).catch(error => {

      console.log(error)
    }
    )




  };
  const handleHeureChange = (e) => {
    setHeure(e.target.value);

  };
  const handleContentChange = (e) => {
    setContent(e.target.value);

  };
  const handleCandidatChange = (e) => {
    setNomcandidat(e.target.value);

  };

  const handleEmployeChange = (e) => {
    setNomemploye(e.target.value);

  };



  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen} className="ajouter_button">
        Ajouter une seance
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{ color: '#1a99aa' }} >Ajouter une seance ! </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: '#1a99aa' }}>
            Ajouter votre  seance  du code/conduit en indiquant le nom du candidat et du l'employé.
          </DialogContentText>
          <FormControl component="fieldset">
            <FormLabel component="legend">Seance : </FormLabel>
            <RadioGroup aria-label="seance" name="seance1"  value={content}  onChange={handleContentChange} >
              <FormControlLabel value="code" control={<Radio />} label="Code" />
              <FormControlLabel value="conduite" control={<Radio />} label="Conduite" />
         
            </RadioGroup>
          </FormControl>
          
          <TextField
            autoFocus
            margin="dense"
            id="nom_condidat"
            label="Nom du candidat"
            type="nom"
            fullWidth
            onChange={handleCandidatChange}
            value={nomcandidat}
          />
          <br />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="nom_employe"
            label="Nom du l'employé"
            type="nom"
            fullWidth
            value={nomemploye}
            onChange={handleEmployeChange}
          />

          <TextField
            id="time"
            label="Heure de la seance"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            value={heure}
            onChange={handleHeureChange}
            style={{ width: '230px', marginLeft: '160px', marginBottom: '40px', marginTop: '30px' }}
          />
          <Datepicker setDateseance={setDateseance} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Ajouter cette seance
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}