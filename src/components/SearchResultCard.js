import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {School, Edit} from "@material-ui/icons";
import test from '../assets/test.svg';
import {Link} from 'react-router-dom';
import { Badge } from "@material-ui/core";
import PostControls from './PostControls'
import { getUserEmail } from "../stitch";

const useStyles = makeStyles(theme=>({
  badge:{
    padding:theme.spacing(0.5),
    height:"initial",
    borderRadius: theme.spacing(2)
  }
  ,
  topic:{
    margin:theme.spacing(1,0,0,0),
    lineHeight:'1.2'
  },
  body:{
    padding: theme.spacing(1)
  },
  link:{
    textDecoration:'none'
  },
  card: {
  width: '100%',
  overflow: 'hidden'
  },
  media: {
    width:"100px",
    height:"100px",
    float:'left'
  },
  controlsContainer:{
overflow:'hidden'
  },
  control:{
    margin:theme.spacing(0,0.5,0,0.5),
    float:'right'
  }
}));

function SearchResultCard(props) {

  const classes = useStyles();

  const badgeIcon = props.postType === "offer" ? <School/> : <Edit/>
  return (
    <Badge classes={{badge:classes.badge}} className={props.className} badgeContent={badgeIcon} color="primary">
    <Paper className={classes.card}>
       <img
      className={classes.media}
      src={test}
      alt="a cat"
      />
      <Box>
        <Link className={classes.link} to={`/posts/${props.id}`}>
      <Typography className={classes.topic} variant="body1">{props.topic}</Typography>
      </Link>
      <Typography className={classes.body} variant="body2">{props.shortDescription}</Typography>
      <PostControls isOwner={props.authorEmail===getUserEmail()} postId={props.id}/>
      </Box>
    </Paper>
    </Badge>
  );
}

export default SearchResultCard;
