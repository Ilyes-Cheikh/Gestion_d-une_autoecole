import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'


const miseenserviceItems = [
    { id: 'oui', title: 'Oui' },
    { id: 'non', title: 'Non' },

]

const initialFValues = {
    id: 0,
    marque: '',
    modele: '',
    matricule: '',
    prochaineassurance: new Date(),
    prochainevisite: new Date(),


    miseenservice: 'oui',
    departmentId: '3',
    prochainevignette: new Date(),



}




export default function VoitureForm(props) {
    const { addOrEdit, recordForEdit ,editclick,idtoedit} = props
    console.log(editclick)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('marque' in fieldValues)
            temp.marque = fieldValues.marque ? "" : "This field is required."
        if ('modele' in fieldValues)
            temp.modele = fieldValues.modele ? "" : "This field is required."
        if ('matricule' in fieldValues)
            temp.matricule = fieldValues.matricule.length > 7 ? "" : "Minimum 8 numbers required."






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
            
            if (editclick==false) {

            
             axios.post(
                'http://localhost:5000/voitures/',{
                    
                   'marque': values.marque,
                    'modele' : values.modele,
                   'matricule': values.matricule,
                    'prochaineassurance': values.prochaineassurance,
                    'prochainevisite': values.prochainevisite,
                    'prochainevignette': values.prochainevignette,
                    'miseenservice': values.miseenservice,
                    

                

                }

                
            ).then(response => {
                        console.log("données enregistées dans la base de données ")
            }).catch(error => {

                console.log(error)
            }
            )


}
else if (editclick == true)
{
    axios.put(
        `http://localhost:5000/voitures/${idtoedit}`,{
            
           'marque': values.marque,
            'modele' : values.modele,
           'matricule': values.matricule,
            'prochaineassurance': values.prochaineassurance,
            'prochainevisite': values.prochainevisite,
            'prochainevignette': values.prochainevignette,
            'miseenservice': values.miseenservice,
            

        

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
                        name="marque"
                        label="Marque"
                        value={values.marque}
                        onChange={handleInputChange}
                        error={errors.marque}
                    />
                    <Controls.Input
                        name="matricule"
                        label="Matricule"
                        value={values.matricule}
                        onChange={handleInputChange}
                        error={errors.matricule}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="modele"
                        label="Modele"
                        value={values.modele}
                        onChange={handleInputChange}
                        error={errors.modele}
                    />
                    <Controls.RadioGroup
                        name="miseenservice"
                        label="Mise en service"
                        value={values.miseenservice}
                        onChange={handleInputChange}
                        items={miseenserviceItems}
                    />
                                        








                </Grid>
            </Grid>

            <Divider />
            <Grid container style={{ marginTop: "3%" }}>

                <Grid item xs={6} >
                    <Controls.DatePicker
                        name="prochainevisite"
                        label="Prochaine visite"
                        value={values.prochainevisite}
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        name="prochaineassurance"
                        label="prochaine assurance"
                        value={values.prochaineassurance}
                        onChange={handleInputChange}
                    />
               

                </Grid>

                <Grid item xs={6}>
                <Controls.DatePicker
                        name="prochainevignette"
                        label="prochaine vignette"
                        value={values.prochainevignette}
                        onChange={handleInputChange}
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
