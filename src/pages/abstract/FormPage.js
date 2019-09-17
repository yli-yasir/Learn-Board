import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import logo from '../../assets/logo.svg';

const useStyles = makeStyles((theme)=>({
    paper: {
        margin:theme.spacing(3,2,1,2),
        display:'flex',
        flexDirection:'column',
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]:{
            width: '40%'
        }
    }
})
)

function FormPage(props){

    const classes = useStyles();

    return (
    <Box component={Paper} className={classes.paper} mx="auto">
        <img src={logo} alt="logo" height="100"></img>
        {props.children}
        </Box>
        )


}

export default FormPage;
