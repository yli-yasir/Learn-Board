import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Tooltip } from '@material-ui/core';

export default function ProgressButton(props){
    let {isWorking,label,tip,...rest} = props
    return (
        <Tooltip title={tip}>
        <Button {...rest}>
            {props.label}
            {isWorking && <React.Fragment>
                &nbsp;&nbsp;
                <CircularProgress size={20} color="primary"/>
            </React.Fragment>}
            </Button>
            </Tooltip>
    )
}