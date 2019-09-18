import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import ResultCard from './SearchResultCard'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme=>({
resultCard:{
  margin: theme.spacing(1,1,2,1),
  width: '90%'
}
}))

function ResultsGrid(props){

  const classes = useStyles();

  let dataset=[];

  if (props.dataset){
   dataset =  props.dataset.map(item => (
        <ResultCard 
        key={item._id}
        id={item._id}
        topic={item.topic}
        languages={item.languages}
        shortDescription={item.shortDescription}
        likes={item.likes}
        by={item.by}
        postType={item.postType}
        className={classes.resultCard} 
        />
      ))
  }

    const loadingIndicator = (
      <Box display="flex" mt={1} mb={3} width="100%" justifyContent="center">
      <CircularProgress color="primary" size={20}/>
      </Box>
    )

    const NoResultsIndicator = 
    (
      <Box display="flex" mt={1} mb={3} width="100%" justifyContent="center">
        <Typography variant="h6" gutterBottom>
        No results found &nbsp;(ﾉ °益°)ﾉ 彡 ┻━┻
      </Typography>
      </Box>
    );

    const noMoreResultsIndicator = (
      <Box display="flex" mt={1} mb={3} width="100%" justifyContent="center">
      <Typography variant="h6" gutterBottom>
      No more results found &nbsp;(ﾉ °益°)ﾉ 彡 ┻━┻
    </Typography>
    </Box>
  );
    

    return (
        <Grid container>
          <Grid key="leftSide" sm item></Grid>
          <Grid key="middle" justify="center" xs={12} sm={10} md={8} container item>
          {dataset}
          {props.isLoading && loadingIndicator}
          {!props.isLoading && dataset.length===0 && NoResultsIndicator}
          {!props.isLoading && props.noMoreResults &&  noMoreResultsIndicator}
          </Grid>
          <Grid key="rightSide" sm item></Grid>
        </Grid>
    );
}

export default ResultsGrid;