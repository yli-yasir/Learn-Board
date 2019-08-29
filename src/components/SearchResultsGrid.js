import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import ResultCard from './SearchResultCard'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { LanguageRounded } from "@material-ui/icons";


function ResultsGrid(props){

  let dataset=[];

  if (props.dataset){
   dataset =  props.dataset.map(item => (
      <Grid key={item._id} item>
        <ResultCard 
        topic={item.topic}
        languages={item.languages}
        shortDescription={item.shortDescription} />
      </Grid>))
  }


    return (
        <Grid container spacing={2}>
          <Grid key="leftSide" sm item></Grid>
          <Grid key="middle" sm={6} item>{dataset}</Grid>
          <Grid key="rightSide" sm item></Grid>
        </Grid>
    );
}

export default ResultsGrid;