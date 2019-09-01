import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { ThumbUpOutlined,MoreOutlined, Person } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip"
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import test from '../assets/test.svg';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Badge } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
  badge:{
    margin: theme.spacing(1),
    width: '100%'
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

  const [moreDialogIsOpen,setMoreDialogIsOpen] = React.useState(false);
  const classes = useStyles();


  const toggleMoreDialog=()=>{
    setMoreDialogIsOpen(!moreDialogIsOpen);
}
  

  const moreDialog= (
    <Dialog
    open={moreDialogIsOpen}
    onClose={toggleMoreDialog}
    aria-labelledby="moreDialogTitle"
    aria-describedby="moreDialogDescription"
  >
    <DialogTitle id="moreDialogTitle">{props.topic}</DialogTitle>
    <DialogContent>
      <DialogContentText id="moreDialogDescription">
        Languages
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={toggleMoreDialog} color="primary">
        Disagree
      </Button>
    </DialogActions>
  </Dialog>

  );

  return (
    <Badge className={classes.badge} badgeContent={props.postType} color="primary">
    <Paper className={classes.card}>
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
        <Button className={classes.control} variant="outlined" onClick={toggleMoreDialog}><MoreOutlined></MoreOutlined></Button>
        {moreDialog}
        <Button className={classes.control} variant="outlined"><ThumbUpOutlined></ThumbUpOutlined>&nbsp;{props.likes}</Button>
      </Box>
      </Box>
    </Paper>
    </Badge>
  );
}

export default SearchResultCard;
