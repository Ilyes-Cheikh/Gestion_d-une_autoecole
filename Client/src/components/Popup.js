import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { grey, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(0),
        bottom:theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}  >
            <div style={{background:grey[900],borderRadius:"30px"}}>
            <DialogTitle className={classes.dialogTitle} style={{color:"#FFFFFF"}} >
                <div style={{ display: 'flex' }}>
                    <FaceRoundedIcon fontSize="large" style={{marginRight:'5%',fontSize: 60}}/>
                    <Typography variant="h6" component="div" style={{ fontSize: 30,flexGrow: 1, marginTop:"0.8%" }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton 

                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon style={{ fontSize: 35,color:"var(--white)"}} />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            </div>
            <DialogContent dividers style={{background:grey[400]}}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
