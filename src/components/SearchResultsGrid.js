import React from "react";
import Grid from '@material-ui/core/Grid';
import ResultCard from './SearchResultCard'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { Typography } from "@material-ui/core";
import PostControls from "./PostControls";

const useStyles = makeStyles(theme=>({
resultCard:{
  margin: theme.spacing(1),
  width:'100%'
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
        authorEmail={item.authorEmail}
        postType={item.postType}
        className={classes.resultCard} 
        postControls={
        <PostControls 
        post={item}
        afterDelete={props.removeFromResults}/>
      }
        />
      ))
  }

  let statusIndicator=false;
  if (props.isLoading){
    statusIndicator=<CircularProgress color="primary" size={20}/>;
  }
  else if (!props.isLoading && dataset.length===0 ){
  statusIndicator = (
  <Typography variant="caption" align='center' gutterBottom>
  <i>No results found</i>
  </Typography>);
}
  else if (!props.isLoading && props.noMoreResults){
  statusIndicator=(
    <Typography variant="caption" align='center' gutterBottom>
    <i>No more results found</i>
  </Typography>)
  }
  else{
    statusIndicator=(
      <Typography variant="caption" align='center' gutterBottom>
      <i>Something unexpected occured, please contact us if it persists.</i>
    </Typography>)
  }

  return (
    <Grid container>
      <Grid key="leftSide" sm item></Grid>
      <Grid key="middle" justify="center" xs={12} sm={10} md={8} container item>
      {dataset}
      <Box display="flex" mt={1} mb={3} width="100%" justifyContent="center">
        {statusIndicator}
      </Box>
      </Grid>
      <Grid key="rightSide" sm item></Grid>
    </Grid>
);

}




export default ResultsGrid;