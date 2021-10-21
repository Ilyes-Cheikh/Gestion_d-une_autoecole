import React, { useState,useEffect } from 'react'
import VoitureForm from "./VoitureForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";

import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import Grid from '@material-ui/core/Grid';
import InfoCard from '../../components/controls/InfoCard';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Moment from 'react-moment';
import moment from 'moment'
import 'moment/locale/fr';
import Axios from 'axios'
import Sidebar from '../../components/Sidebar/SideBarAdmin';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        background:"#ffffff",
        marginLeft:"4%"
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

var nearest = require('nearest-date')

const headCells = [
    { id: 'Marque', label: 'Marque' },
    { id: 'Modele  ', label: 'Modele' },
    { id: 'Matricule', label: 'Matricule' },
    { id: 'Miseenservice', label: 'En service' },
    { id: 'Prochainevisite', label: 'Prochaine visite' },
    { id: 'Prochaineassurance', label: 'Prochaine assurance' },
    { id: 'Prochainevignette', label: 'Prochaine vignette' },

    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Voitures() {
    const [comingVisite, setComingVisite]=useState()
    const [nombreVoitures , setNombreVoitures] = useState();
    const [comingAssurance, setComingAssurance]=useState();
    const [comingVignette, setComingVignette]=useState();
    const [editclick,setEditclick] = useState()
    const [idtoedit,setIdtoedit] = useState('')
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    useEffect(() => {
        let unmounted = false
        let todayDate = moment(new Date());
        let assurance = [];
        let vignette = [];
        let visite = [];
        if (!unmounted) {
            Axios.get('http://localhost:5000/voitures').then(
                (data) => {
                    console.log(data)
                    setRecords(data.data)
                    setNombreVoitures( data.data.length)
                    for (let i = 0; i < data.data.length; i++){
                        
                        if ( moment(data.data[i].prochaineassurance).diff(todayDate) >= 0 ){
                            assurance.push(data.data[i].prochaineassurance.split('T')[0]  )
                        }
                        if ( moment(data.data[i].prochainevignette).diff(todayDate) >=0 ){
                            vignette.push(data.data[i].prochainevignette.split('T')[0]  )
                        }
                        if ( moment(data.data[i].prochainevisite).diff(todayDate) >1 ){
                            visite.push(data.data[i].prochainevisite.split('T')[0] )
                        }
                       
                    }
                    var min1=assurance[0]
                    var min2=visite[0]
                    var min3=vignette[0]

                    for (let i = 0; i < assurance.length; i++){
                        if(assurance[i]<min1)
                         min1=assurance[i]
                        if(visite[i]<min2)
                         min2=visite[i]
                        if(vignette[i]<min3)
                         min3=vignette[i]
                    }
 

                    setComingAssurance(min1)
                    setComingVisite(min2)
                    setComingVignette(min3)
                    console.log()

                     
                },

               
            )
        }
        return () => { unmounted = true }
    }, [notify])
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.matricule.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (voiture, resetForm) => {

        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

    fetch(`http://localhost:5000/voitures/${id}`, {
      method: 'DELETE'})
      .then(() => {
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })

    })

}
    let d=moment().startOf('day').fromNow()
    return (
        <>
               

            <PageHeader
                title="Nos voitures"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
                <Grid  container style={{marginLeft:"5%",display:"flex"}}  >
                <Grid item xs={12} sm={12} md={3}>
            <InfoCard
            color="#1a8daa"
            Iconim={<DirectionsCarIcon/>} 
            number={nombreVoitures}
            numbersize="h4"
            numberof="Voitures"/>
          </Grid>
               
          <Grid  item xs={12} sm={12} md={3}>
            <InfoCard 
            color="#df6c4f"
            Iconim={<DirectionsCarIcon/>} 
            number={moment(comingVisite).fromNow()}
            numbersize="h4"
            numberof="Prochaine visite"/> 
          </Grid>
          <Grid style={{}} item xs={12} sm={12} md={3}>
            <InfoCard
            numbersize="h4"
            color="#3c948b"
            Iconim={<DirectionsCarIcon/>} 
            number={moment(comingAssurance).fromNow()}
            numberof="Prochaine assurance"/> 
          </Grid>
          <Grid style={{}} item xs={12} sm={12} md={3}>
            <InfoCard
            numbersize="h4"
            color="#3c948b"
            Iconim={<DirectionsCarIcon/>} 
            number={moment(comingVignette).fromNow()}
            numberof="Prochaine vignette "/> 
          </Grid>

                    </Grid>


            <Paper className={classes.pageContent} style={{borderTop: "4px solid var(--white)",borderBottom: "4px solid var(--white)"}}>

                <Toolbar>
                    <Controls.Input
                        label="recherche du voiture"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />

                    <Controls.Button
                        text="Ajouter une voiture"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); setEditclick(false) }}
                    />

                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.marque}</TableCell>
                                    <TableCell>{item.modele}</TableCell>
                                    <TableCell>{item.matricule}</TableCell>
                                    <TableCell>{item.miseenservice}</TableCell>
                                    <TableCell>{moment(item.prochainevisite.split("T")[0]).fromNow()}</TableCell>
                                    <TableCell >{moment(item.prochaineassurance.split("T")[0]).fromNow()}</TableCell>
                                    <TableCell>{moment(item.prochainevignette.split("T")[0]).fromNow()}</TableCell>

                                    
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { 
                                                openInPopup(item)
                                                setEditclick(true)
                                                setIdtoedit(item._id)
                                                }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Êtes-vous sûr de supprimer ce voiture?',
                                                    subTitle: "Vous ne pouvez pas annuler cette opération",
                                                    onConfirm: () => { onDelete(item._id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Informations du voiture"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <VoitureForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                    editclick={editclick} 
                    idtoedit={idtoedit}
                   />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
