import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import ResultCard from './PostCard'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { LanguageRounded } from "@material-ui/icons";


function ResultsGrid(props){

  let dataset=[];

  if (props.dataset){
   dataset =  props.dataset.map(learn => (
      <Grid key={learn._id} item>
        <ResultCard 
        height={350} 
        width={250}
        subject={learn.courseName}
        languages={learn.languages}
        shortDescription={learn.shortDescription} />
      </Grid>))
  }


    return (
        <Grid container justify="center" spacing={2}>
         {dataset} 
      </Grid>
    )
}

export default ResultsGrid;