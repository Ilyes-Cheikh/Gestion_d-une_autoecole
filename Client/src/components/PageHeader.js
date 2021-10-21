import React from 'react'
import { Paper, Card, Typography, makeStyles, Button, responsiveFontSizes } from '@material-ui/core'
import Background from "../Assets/23.jpg"
import Logo from "../Assets/logo.png"
import { PostAdd } from '@material-ui/icons'
const useStyles = makeStyles(theme => ({
    root: {
        background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(41,42,44,1) 10%)",
        borderRadius: "00px 00px 30px 30px",
        height:"80px",
        marginBottom:"10px",
        width:"94%",
        marginLeft:"4%",
        borderBottom: "4px solid var(--white)",
        position:'sticky',
        top:"0",
        zIndex: "10"



    },
    pageHeader:{
        paddingLeft:theme.spacing(4),
        paddingTop:theme.spacing(2),
        display:'flex',
        marginBottom:theme.spacing(2),
        height:"130px",
        width:"100%",

        
        
    },
    pageIcon:{
        display:'inline-block',
        color:'#284D63',
        height:"35%"
    },
    pageTitle:{
        paddingLeft:theme.spacing(0),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper  className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon} style={{background:"#FFFFFF"}}>
                    {icon} 
                </Card>
                
                <div className={classes.pageTitle}>
                    <Typography style={{marginTop:"",marginLeft:'20%',width:'150px',color:"#FFFFFF"}}
                        variant="h6"
                        component="div">
                        {title}</Typography>

                </div>
                <img src={Logo} style={{marginLeft:"auto",marginRight:"auto",display:"block",width:'70px',height:"70px",position:'absolute',right:'3%',borderRadius:'10%',top:"0.5%"}} />
            </div>
            
        </Paper>
    )
}
