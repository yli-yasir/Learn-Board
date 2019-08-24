import React from 'react';
import {Person,NoteAdd} from '@material-ui/icons';
import Box from '@material-ui/core/Box'
import {Link} from 'react-router-dom';

export default function UserBar(props){
    return (
        <Box {...props}>

        <Box component={Link} m={1} to="/">
        <Person/>
            </Box>



            <Box component={Link} m={1} to="/newlearn">
            <NoteAdd/>
            </Box>
        </Box>
    )
}