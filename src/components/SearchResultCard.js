import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {School, Edit, Chat, Person} from "@material-ui/icons";
import test from '../assets/test.svg';
import {Link} from 'react-router-dom';
import { Chip } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
  topic:{
    marginBottom: theme.spacing(1),
  },
  link:{
    textDecoration:'none'
  },
  media: {
    width:"100px",
    height:"100px",
    float:'left'
  },
  controlsContainer:{
overflow:'auto'
  },
  control:{
    margin:theme.spacing(0,0.5,0,0.5),
    float:'right'
  }
}));

function SearchResultCard(props) {

  const classes = useStyles();

  return (
    <Paper className={props.className}>

       <img
      className={classes.media}
      src={test}
      alt="a cat"
      />

      <Box p={1}>

        <Link className={classes.link} to={`/posts/${props.id}`}>
      <Typography className={classes.topic} variant="body1">{props.topic}</Typography>
      </Link>

      <Box display="flex" flexDirection="flexRow" mb={1}>
        {props.postType === 'offer' ?
        <Chip className={classes.control} color="primary" icon={<School/>} label="Offer"/>:
        <Chip className={classes.control} color="primary" icon={<Edit/>} label="Request"/>}
        <Chip className={classes.control} color="primary" icon={<Chat/>} label={props.languages.length + ' Languages'}/>
        <Chip className={classes.control} color="primary" icon={<Person/>} label={props.authorName}/>
        </Box>
      <Typography className={classes.body} variant="body2" paragraph>{props.shortDescription}</Typography>
      {props.postControls}
      </Box>

    </Paper>
  );
}

export default SearchResultCard;
