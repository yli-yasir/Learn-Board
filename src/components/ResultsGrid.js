import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import ResultCard from './ResultCard'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';


function ResultsGrid(){
    return (
        <Grid container justify="center" spacing={2}>
         {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <ResultCard height={350} width={250} />
            </Grid>))} 
        <Grid item key={0}>
        </Grid>
      </Grid>
    )
}

export default ResultsGrid;