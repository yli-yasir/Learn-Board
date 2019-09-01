import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import db from '../stitch';

const useStyles = makeStyles((theme)=>({
    paper: {
        marginTop:theme.spacing(3),
        display:'flex',
        flexDirection:'column',
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]:{
            width: '60%'
        }
    }
})
)

function PostDetailsPage({match}){
    const classes = useStyles();

    React.useEffect(()=>{

        async function fetchData(){
            try{
            const doc = await db.collection('posts').findOne({_id:match.params.id})
            }
            catch(e){
                console.log(e)
            }
        }

    })

    return (<Box component={Paper} className={classes.paper} mx="auto">
        
        </Box>);
}

export default PostDetailsPage;