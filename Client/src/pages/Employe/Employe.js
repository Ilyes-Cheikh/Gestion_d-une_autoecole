import React, { useState , useEffect} from 'react'
import EmployeForm from "./EmployeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { LensTwoTone, Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import Grid from '@material-ui/core/Grid';
import InfoCard from '../../components/controls/InfoCard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Axios from 'axios'
import Sidebar from '../../components/Sidebar/SideBarAdmin';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        marginLeft:"4%"

    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px',
    }
}))


const headCells = [
    { id: 'Nom', label: 'Nom' },
    { id: 'Prenom', label: 'Prenom' },
    { id: 'numtel', label: 'Numero mobile' },
    { id: 'cin', label: "Carte d'identité " },
    { id: 'salaire', label: 'Salaire' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]
export default function Employes() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [salairetotal,setSalairetotal] = useState (0)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordslength,setRecordslength] = useState(0)
    const [edit,setEdit] = useState(false)
    const [id,setId] = useState('')

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            Axios.get('http://localhost:5000/employes').then(
                (data) => {
                    console.log(data)
                    let tab =[]
                    for (let i=0; i<data.data.length ; i++)
                    {
                        if(data.data[i].prenom != 'admin')
                        tab.push(data.data[i])                
                    }
                    let sum =0;
                    for (let i=0 ; i<data.data.length ;i++) {
                        sum+= parseFloat(data.data[i].salaire);
                    }
                    setRecords(tab)
                    setRecordslength(data.data.length)
                    setSalairetotal(sum)
                    
                }
            )
        }
        return () => { unmounted = true }
    }, [notify])

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.nom.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employer, resetForm) => {
    
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
        fetch(`http://localhost:5000/employes/${id}`, {
            method: 'DELETE'
          }).then(() => {
                 setNotify({
                  isOpen: true,
                  message: 'Deleted Successfully',
                  type: 'succes'
              })
              
          })
    }

    return (
        <>  
            <Sidebar/>
            <PageHeader
                title="Nos employes"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Grid style={{marginLeft:"33%",display:"flex"}}   >
          <Grid item xs={12} sm={12} md={3}>
            <InfoCard
            color="#1a8daa"
            Iconim={<PeopleOutlineTwoToneIcon/>} 
            number={records.length}
            numberof="Employés"/>
          </Grid>
         
          <Grid  item xs={12} sm={12} md={3}>
            <InfoCard
            color="#df6c4f"
            Iconim={<AttachMoneyIcon/>} 
            number={salairetotal}
            numberof="Total des salaires"/> 
          </Grid>
          </Grid> 
            <Paper className={classes.pageContent} style={{borderTop: "4px solid var(--white)",borderBottom: "4px solid var(--white)"}}>

                <Toolbar>
                    <Controls.Input
                        label="recherche d'un employé"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Ajouter un employé"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); setEdit(false)}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item._id}>
                                    <TableCell>{item.nom}</TableCell>
                                    <TableCell>{item.prenom}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.numcin}</TableCell>
                                    <TableCell>{item.salaire}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                 openInPopup(item)
                                                 setEdit(true)
                                                 setId(item._id)
                                             }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Êtes-vous sûr de supprimer ce employé?',
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
                title="Informations du l'employé"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} 
                    edit={edit}
                    id={id}/>
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
