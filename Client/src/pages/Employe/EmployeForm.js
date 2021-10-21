import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'

const Departments=[
    { id: 'A1', title: 'A1' },
    { id: 'A', title: 'A' },
    { id: 'B', title: 'B' },
    { id: 'B+E', title: 'B+E' },
    { id: 'C', title: 'C' },
    { id: 'C+E', title: 'C+E' },
    { id: 'D', title: 'D' },
    { id: 'D+E', title: 'D+E' },
    { id: 'D1', title: 'D1' },
    { id: 'H', title: 'H' },

]

const genderItems = [
    { id: 'Homme', title: 'Homme' },
    { id: 'Femme', title: 'Femme' },
    { id: 'Autre', title: 'Autre' },
]

const initialFValues = {
    id: 0,
    nom: '',
    prenom: '',
    numcin: '',
    lieudenaissance: '',
    password: '',
    email: '',
    mobile: '',
    salaire: '',
    poste: '',
    nombredheuresdutravail: '',
    gender: 'Homme',
    departmentId: '3',
    datedenaissance: new Date(),


    isPermanent: false,
}

export default function EmployeForm(props) {
    const { addOrEdit, recordForEdit, edit, id } = props
    console.log(edit)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nom' in fieldValues)
            temp.nom = fieldValues.nom ? "" : "This field is required."
        if ('prenom' in fieldValues)
            temp.prenom = fieldValues.prenom ? "" : "This field is required."
        if ('numcin' in fieldValues)
            temp.numcin = fieldValues.numcin.length > 7 ? "" : "Minimum 8 numbers required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('lieudenaissance' in fieldValues)
            temp.lieudenaissance = fieldValues.lieudenaissance ? "" : "This field is required."
        if ('motdepasse' in fieldValues)
            temp.motdepasse = fieldValues.motdepasse ? "" : "This field is required."
        if ('salaire' in fieldValues)
            temp.salaire = fieldValues.salaire ? "" : "This field is required."
    
        if ('ss' in fieldValues)
            temp.ss = fieldValues.ss ? "" : "This field is required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 7 ? "" : "Minimum 8 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
            if (edit==false) {
                console.log(values.departmentId)
            axios.post(
                'http://localhost:5000/employes/',{
                    
                   'nom': values.nom,
                    'prenom' : values.prenom,
                   'mobile': values.mobile,
                    'departmentId': values.departmentId,
                    'numcin': values.numcin,
                    'email':values.email,
                    'password':values.password,
                    'salaire':values.salaire,
                    'nombredheuresdutravail' : values.nombredheuresdutravail,
                    'lieudenaissance' : values.lieudenaissance,
                    'datedenaissance' : values.datedenaissance,
                     'gender' : values.gender

                }

                
            ).then(response => {
                        console.log("données enregistées dans la base de données ")
            }).catch(error => {

                console.log(error)
            }
            )
        }
        else if (edit==true){
            axios.put(
                `http://localhost:5000/employes/${id}`,{
                    
                    'nom': values.nom,
                    'prenom' : values.prenom,
                   'mobile': values.mobile,
                    'departmentId': values.departmentId,
                    'numcin': values.numcin,
                    'email':values.email,
                    'password':values.password,
                    'salaire':values.salaire,
                    'nombredheuresdutravail' : values.nombredheuresdutravail,
                    'lieudenaissance' : values.lieudenaissance,
                    'datedenaissance' : values.datedenaissance,
                    'gender' : values.gender
                    
        
                
        
                }
        
                
            ).then(response => {
                        console.log("données enregistées dans la base de données ")
            }).catch(error => {
        
                console.log(error)
            }
            )
        }
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container >
                <Grid item xs={6}>
                    <Controls.Input
                        name="nom"
                        label="Nom"
                        value={values.nom}
                        onChange={handleInputChange}
                        error={errors.nom}
                    />
                    <Controls.Input
                        name="numcin"
                        label="N° CIN"
                        value={values.numcin}
                        onChange={handleInputChange}
                        error={errors.numcin}
                    />
                    <Controls.DatePicker
                        name="datedenaissance"
                        label="date de naissance"
                        value={values.datedenaissance}
                        onChange={handleInputChange}
                    />
                
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />




                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="prenom"
                        label="Prenom"
                        value={values.prenom}
                        onChange={handleInputChange}
                        error={errors.prenom}
                    />
                    <Controls.RadioGroup
                        name="gender"
                        label="sexe"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Input
                        name="lieudenaissance"
                        label="Lieu de naissance"
                        value={values.lieudenaissance}
                        onChange={handleInputChange}
                        error={errors.lieudenaissance}
                    />
                    <Controls.Input
                        label="Mot de passe"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        type="password"
                        error={errors.password}
                    />








                </Grid>
            </Grid>
            <Grid container style={{ marginBottom: "3%" }}>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Salaire"
                        name="salaire"
                        value={values.salaire}
                        onChange={handleInputChange}
                        error={errors.salaire}
                    />

                </Grid>
           
            </Grid>
            <Divider />
            <Grid container style={{ marginTop: "3%" }}>

                <Grid item xs={6} >
                   

                <Controls.Select
                        name="departmentId"
                        label="Catégorie du permis"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={Departments}
                        error={errors.departmentId}
                    />

                </Grid>

                <Grid item xs={6}>
                    <Controls.Input
                        label="Nombre d'heures du travail"
                        name="nombredheuresdutravail"
                        value={values.nombredheuresdutravail}
                        onChange={handleInputChange}
                        error={errors.nombredheuresdutravail}
                    />

                    <div style={{ marginTop: "3%",marginLeft:"1%",}}>
                        <Controls.Button style={{width:"40%"}}
                            type="submit"
                            text="Submit" />
                        <Controls.Button style={{width:"40%"}}
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>

        </Form>
    )
}
