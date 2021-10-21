import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";


export default function DatePicker(props) {

    const { name, label, value, defaultValue ,onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider locale={frLocale} utils={DateFnsUtils}>
            <KeyboardDatePicker  variant="inline" inputVariant="outlined"
                label={label}
                format="d MMM yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}

            />
        </MuiPickersUtilsProvider>
    )
}
