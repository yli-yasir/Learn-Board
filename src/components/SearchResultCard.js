import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { ThumbUpOutlined,MoreOutlined, Person } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip"
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import test from '../assets/test.svg';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme=>({
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

  let languages = '';
  if (props.languages){
    languages =  props.languages.map(language=>(
      <Box m={1} clone>
    </Box>) )
  }

  return (
    <Paper Card className={classes.card}>
       <img
      className={classes.media}
      src={test}
      alt="a cat"
      />
      <Box>
        <Link className={classes.link} to="#">
      <Typography className={classes.topic} variant="body1">{props.topic}</Typography>
      </Link>
      <Typography className={classes.body} variant="body2">{props.shortDescription}</Typography>
      <Box className={classes.controlsContainer} mb={1}>
        <Button className={classes.control} variant="outlined"><MoreOutlined></MoreOutlined></Button>
        <Button className={classes.control} variant="outlined"><ThumbUpOutlined></ThumbUpOutlined>&nbsp;{props.likes}</Button>
      </Box>
      </Box>
    {/* <CardContent>
      
    <Typography component="div" variant="h6">
      <Box mb={1} lineHeight={1.2}>
    {props.topic}
    </Box>
    </Typography>
    
    <Typography  component="div" variant="body2">
    {props.shortDescription}
    </Typography>
    <Box display="flex" flexDirection="row-reverse">
          <Button variant="contained"><More></More></Button>
          <Chip className={classes.control} icon={<ThumbUp />} label={props.likes} />
          <Chip className={classes.control} icon={<Person />} label={props.by.name} />
          </Box>
    </CardContent> */}
    </Paper>
  );
}

export default SearchResultCard;
