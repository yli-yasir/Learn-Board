import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingPage(){
    return <Box pt={12} display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size={80}/>
    </Box>
}

export default LoadingPage;