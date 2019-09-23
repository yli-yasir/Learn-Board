import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ProgressButton(props){
    let {isWorking,label,...rest} = props
    return (
        <Button {...rest}>
            {props.label}
            {isWorking && <React.Fragment>
                &nbsp;&nbsp;
                <CircularProgress size={20} color="primary"/>
            </React.Fragment>}
            </Button>
    )
}