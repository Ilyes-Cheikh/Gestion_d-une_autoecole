import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import { makeStyles } from '@material-ui/core/styles';
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
    prix: '',
    resteapayer: '',
    nombredheurestheorique: '',
    nombredheurespratique: '',
    gender: 'Homme',
    departmentId: '3',
    datedenaissance: new Date(),
    datededebutdesseancestheoriques: new Date(),
    datededebutdesseancespratiques: new Date(),

    isPermanent: false,
}

export default function CandidatForm(props) {

    const { addOrEdit, recordForEdit, edit, id } = props
    console.log(id)
    console.log(edit)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nom' in fieldValues)
            temp.nom = fieldValues.nom ? "" : "Ce champ est requis."
        if ('prenom' in fieldValues)
            temp.prenom = fieldValues.prenom ? "" : "Ce champ est requis."
        if ('numcin' in fieldValues)
             temp.numcin = (/^[+-]?\d*(?:[.,]\d*)?$/).test(fieldValues.numcin) ? "" : "Veuillez saisir uniquement des chiffres."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email non valide."
        if ('lieudenaissance' in fieldValues)
            temp.lieudenaissance = fieldValues.lieudenaissance ? "" : "Ce champ est requis."
        if ('adresse' in fieldValues)
            temp.adresse = fieldValues.adresse ? "" : "Ce champ est requis."
        if ('prix' in fieldValues)
            temp.prix = (/^[+-]?\d*(?:[.,]\d*)?$/).test(fieldValues.prix) ? "" : "Veuillez saisir uniquement des chiffres."
        if ('resteapayer' in fieldValues)
            temp.resteapayer = (/^[+-]?\d*(?:[.,]\d*)?$/).test(fieldValues.resteapayer) ? "" : "Veuillez saisir uniquement des chiffres."
        if ('ss' in fieldValues)
            temp.ss = fieldValues.ss ? "" : "Ce champ est requis."
        if ('mobile' in fieldValues)
            temp.mobile = (/^[+-]?\d*(?:[.,]\d*)?$/).test(fieldValues.mobile) ? "" : "Veuillez saisir uniquement des chiffres."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "Ce champ est requis."
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
            console.log(JSON.stringify(values));
            
            if (edit == false) 
            {
             axios.post(
                'http://localhost:5000/candidats/',{
                    
                   'nom': values.nom,
                    'prenom' : values.prenom,
                   'mobile': values.mobile,
                    'departmentId': values.departmentId,
                    'resteapayer': values.resteapayer,
                    'email' : values.email,
                    'password' : values.password,
                    'prix' : values.prix,
                    'numcin':values.numcin,
                    'nombredheurestheorique':values.nombredheurestheorique,
                    'nombredheurespratique':values.nombredheurespratique,
                    'gender':values.gender,
                    'lieudenaissance':values.lieudenaissance,
                    'datededebutdesseancestheoriques' : values.datededebutdesseancestheoriques,
                    'datededebutdesseancespratiques' : values.datededebutdesseancespratiques,
                    'datedenaissance' : values.datedenaissance,

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
                `http://localhost:5000/candidats/${id}`,{
                    
                   'nom': values.nom,
                    'prenom' : values.prenom,
                   'mobile': values.mobile,
                    'departmentId': values.departmentId,
                    'resteapayer': values.resteapayer,
                    'email' : values.email,
                    'password' : values.password,
                    'prix' : values.prix,
                    'numcin' : values.numcin,
                    'nombredheurestheorique':values.nombredheurestheorique,
                    'nombredheurespratique':values.nombredheurespratique,
                    'gender':values.gender,
                    'lieudenaissance':values.lieudenaissance,
                    
                    'datededebutdesseancestheoriques' : values.datededebutdesseancestheoriques,
                    'datededebutdesseancespratiques' : values.datededebutdesseancespratiques,
                    'datedenaissance' : values.datedenaissance,
                

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
        <Form   onSubmit={handleSubmit}>
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
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />








                </Grid>
            </Grid>
            <Grid container style={{ marginBottom: "3%" }}>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Prix"
                        name="prix"
                        value={values.prix}
                        onChange={handleInputChange}
                        error={errors.prix}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Reste à payer"
                        name="resteapayer"
                        value={values.resteapayer}
                        onChange={handleInputChange}
                        error={errors.resteapayer}
                    />

                </Grid>
            </Grid>
            <Divider />
            <Grid container style={{ marginTop: "3%" }}>

                <Grid item xs={6} >
                    <Controls.DatePicker
                        name="datededebutdesseancestheoriques"
                        label="Date de debut des seances theoriques"
                        value={values.datededebutdesseancestheoriques}
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        name="datededebutdesseancespratiques"
                        label="Date de debut des seances pratiques"
                        value={values.datededebutdesseancespratiques}
                        onChange={handleInputChange}
                    />
                    <Controls.Select 
                        name="departmentId"
                        label="Catégorie du permis"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={Departments}
                        error={errors.departmentId}
                        inputProps={{color:'primary'}}
                    />

                </Grid>

                <Grid item xs={6}>
                    <Controls.Input
                        label="Nombre d'heures theorique"
                        name="nombredheurestheorique"
                        value={values.nombredheurestheorique}
                        onChange={handleInputChange}
                        error={errors.nombredheurestheorique}
                    />
                    <Controls.Input
                        label="Nombre d'heures pratique"
                        name="nombredheurespratique"
                        value={values.nombredheurespratique}
                        onChange={handleInputChange}
                        error={errors.nombredheurespratique}
                    />
                    <div style={{ marginTop: "3%", marginLeft: "1%", }}>
                        <Controls.Button style={{ width: "40%" }}
                            type="submit"
                            text="Submit" />
                        <Controls.Button style={{ width: "40%" }}
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>

        </Form>
    )
}
