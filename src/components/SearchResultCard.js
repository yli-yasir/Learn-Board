import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { ThumbUpOutlined,TextFormatOutlined} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import test from '../assets/test.svg';
import {Link} from 'react-router-dom';
import {getEmail} from '../stitch'
import { Badge } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
  badge:{
    margin: theme.spacing(1),
    width: '100%',
  },
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

  
  return (
    <Badge className={classes.badge} badgeContent={props.postType} color="primary">
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
      <Box className={classes.controlsContainer} mb={1}>
        {props.by===getEmail() &&
        <Link to={`/posts/${props.id}/edit`}>
        <Button className={classes.control} variant="outlined"><TextFormatOutlined/>&nbsp;Edit</Button> 
        </Link>}
        <Button className={classes.control} variant="outlined"><ThumbUpOutlined></ThumbUpOutlined>&nbsp;{props.likes}</Button>
      </Box>
      </Box>
    </Paper>
    </Badge>
  );
}

export default SearchResultCard;
